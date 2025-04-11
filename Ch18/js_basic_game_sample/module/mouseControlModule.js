import { makeDOMwithProperties } from "../../../Ch17/js_basic_event_sample/utils/dom.js";
import { MOUSE_CONTROL_SCORE_KEY } from "../constants/localStorage.js";
import { handleModalOpen } from "../utils/modal.js";
import { getNowTime, getResultTimeString, isGameStart, setTimer, startTimer, stopTimer } from "../utils/timer.js";

let boxDOMList = [];
let wallBoxDOMList = [];
let startBoxDOM = null;
let endBoxDOM = null;

const gameFieldDOM = document.getElementById('game-field');

export const initMouseControlGame = () => {
    startBoxDOM.innerHTML = '시작';
    endBoxDOM.innerHTML = '끝';
    boxDOMList.forEach((boxDOM) => {
        boxDOM.style.backgroundColor = 'transparent';
    })
    stopTimer();
    setTimer(0);
}

const handleSuccessGame = () => {
    stopTimer();

    handleModalOpen({
        isSuccess: true,
        timeString: getResultTimeString(),
    })

    // 게임 성공 시 localStorage에 갱신된 최고 점수 (최소 소요 시간) 저장
    const nowSpendTime = getNowTime();
    const currentSpendTime = localStorage.getItem(MOUSE_CONTROL_SCORE_KEY);
    if (!currentSpendTime || currentSpendTime > nowSpendTime) {
        localStorage.setItem(MOUSE_CONTROL_SCORE_KEY, nowSpendTime);
    }

    setTimer(0);
}

const handleFailedGame = () => {
    // 게임 실패 -> 타이머를 멈추고, 모달을 뜨워줘야함
    stopTimer();
    handleModalOpen({
        isSuccess: false,
    });


    setTimer(0);
}

export const setBoxDOM = ({
    row, // 행이 몇 갠지
    col, // 열이 몇 갠지
    start, // 시작 위치 [행, 열]
    end, // 종료 위치 [행, 열]
    walls, // 벽의 위치들 [행, 열][]
}) => {
    // control-box-container를 만들고,
    // box들을 채우기

    const controlBoxContainer = makeDOMwithProperties('div', {
        id: 'control-box-container',
        onmouseleave: () => {
            // 게임시작 변수가 세팅되었을 떄
            // 게임 끝 -> 타이머가 종료, 실패 모달이 뜸
            if (!isGameStart) return;
            handleFailedGame();
        }
    })

    controlBoxContainer.style.display = 'grid';
    controlBoxContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    controlBoxContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const { type, className, innerHTML = '', onmouseover } = (function () {
                if (i === start[0] && j === start[1]) {
                    // 시작 위치
                    return {
                        type: 'start',
                        className: 'control-box start',
                        innerHTML: '시작',
                        onmouseover: (event) => {
                            // 게임 시작 -> 타이머가 시작
                            // 게임 시작 변수 변경
                            // innerHTML을 없애기
                            startTimer(handleFailedGame);
                            event.target.innerHTML = '';

                        }
                    };
                }
                if (i === end[0] && j === end[1]) {
                    // 종료 위치
                    return {
                        type: 'end',
                        className: 'control-box end',
                        innerHTML: '끝',
                        onmouseover: (event) => {
                            // 게임시작 변수가 세팅되었을 때
                            // 게임 끝 -> 타이머가 종료
                            // innerHTML을 없애기                            
                            if (!isGameStart) return;
                            event.target.innerHTML = ''
                            handleSuccessGame();
                        }
                    };
                }
                for (let wall of walls) {
                    if (i === wall[0] && j === wall[1]) {
                        // 벽의 위치
                        return {
                            type: 'wall',
                            className: 'control-box wall',
                            onmouseover: () => {
                                // 게임시작 변수가 세팅되었을 떄
                                // 게임 끝 -> 타이머가 종료, 실패 모달이 뜸
                                if (!isGameStart) return;
                                handleFailedGame();
                            }
                        };
                    }
                }
                return {
                    type: 'normal',
                    className: 'control-box',
                    onmouseover: (event) => {
                        // 게임시작 변수가 세팅되었을 떄
                        // 길의 색상이 바뀜
                        if (!isGameStart) return;
                        event.target.style.backgroundColor = 'linen';
                    }
                };
            }());
            const boxDOM = makeDOMwithProperties('div', {
                className,
                innerHTML,
                id: `box-${i}-${j}`,
                onmouseover,
            });

            controlBoxContainer.appendChild(boxDOM);

            switch(type) {
                case 'start':
                    startBoxDOM = boxDOM;
                    break;
                case 'end':
                    endBoxDOM = boxDOM;
                    break;
                case 'wall':
                    wallBoxDOMList.push(boxDOM);
                    break;
                default:
                    boxDOMList.push(boxDOM);
            }
        }
    }
    gameFieldDOM.appendChild(controlBoxContainer);
};