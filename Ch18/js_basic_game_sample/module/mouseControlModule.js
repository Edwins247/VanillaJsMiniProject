import { makeDOMwithProperties } from "../../../Ch17/js_basic_event_sample/utils/dom";

let boxDOMList = [];
let wallBoxDOMList = [];
let startBoxDOM = null;
let endBoxDOM = null;

const gameFieldDOM = document.getElementById('game-field');

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
    })

    controlBoxContainer.style.display = 'grid';
    controlBoxContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    controlBoxContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const { type, className, innerHTML = '' } = (function () {
                if (i === start[0] && j === start[1]) {
                    // 시작 위치
                    return {
                        type: 'start',
                        className: 'control-box start',
                        innerHTML: '시작',
                    };
                }
                if (i === end[0] && j === end[1]) {
                    // 종료 위치
                    return {
                        type: 'end',
                        className: 'control-box end',
                        innerHTML: '끝',
                    };
                }
                for (let wall of walls) {
                    if (i === wall[0] && j === wall[1]) {
                        // 벽의 위치
                        return {
                            type: 'wall',
                            className: 'control-box wall',
                        };
                    }
                }
                return {
                    type: 'normal',
                    className: 'control-box',
                };
            }());
            const boxDOM = makeDOMwithProperties('div', {
                className: 'control-box',
                innerHTML: '끝',
                id: `box-${i}-${j}`
            });

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