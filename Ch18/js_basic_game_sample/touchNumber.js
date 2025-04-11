import { TOUCH_NUMBER_SCORE_KEY } from "./constants/localStorage.js";
import { handleModalClose, handleModalOpen } from "./utils/modal.js";
import { getNowTime, getResultTimeString, setTimer, startTimer, stopTimer } from "./utils/timer.js";

const numberButtonList = document.getElementsByClassName('number-button');
const maxId = numberButtonList.length;
let currentNumber = 1;

const handleSuccessGame = () => {
    // 타이머 멈춤 -> 성공 모달
    stopTimer();
    handleModalOpen({
        isSuccess: true,
        timeString: getResultTimeString(),
    });

    const nowSpendTime = getNowTime();
    const currentSpendTime = localStorage.getItem(TOUCH_NUMBER_SCORE_KEY);
    if (!currentSpendTime || currentSpendTime > nowSpendTime) {
        localStorage.setItem(TOUCH_NUMBER_SCORE_KEY, nowSpendTime)
    }

    setTimer(0);
}

const handleFailedGame = () => {
    stopTimer();
    handleModalOpen({
        isSuccess: false,
    });
    setTimer(0);
}

const setButtonDOM = () => {
    // 1. HTML 상에서 domList를 받아옴
    // 2. 순회하면서 dom의 위치를 조정(랜덤으로)
    // 3. dom 클릭 시 핸들러 등록
    
    for (let numberButton of numberButtonList) {
        numberButton.style.display = 'block';
        numberButton.style.top = `${Math.floor(Math.random() * 100 * 0.9)}%`;
        numberButton.style.left = `${Math.floor(Math.random() * 100 * 0.9)}%`;
        numberButton.onclick = (event) => {
            // 1. 클릭한 수를 찾아오기
            // 2. 수가 현재 클릭되어야 하는 순서가 맞는지 판단 -> 아니라면 무시, 맞다면 해당 numberButton을 없앰
            // 3. 1을 클릭했을 때는 타이머 시작
            // 4. 10을 클릭했을 때는 타이머 멈춤 -> 성공 모달
            const numId = Number(event.target.innerHTML);
            if (isNaN(numId)) return;
            if (numId !== currentNumber) return;
            event.target.style.display = 'none';
            if (numId === maxId) {
                handleSuccessGame();
                return; 
            }
            if (numId === 1) {
                startTimer(handleFailedGame);
            }
            currentNumber++;
        }
    }
};  

const initializeTouchNumberGame = () => {
    // 타이머를 다시 세팅
    // 숫자의 위치를 다시 세팅
    // currentNumber = 1
    setTimer(0);
    stopTimer();
    setButtonDOM();
    currentNumber = 1;
}

const initialize = () => {
    // modal - retry, header - retry 세티
    // 클릭 시 모달 닫기, 상태를 원복
    const [headerRetryButton, modalRetryButton] = document.getElementsByClassName('retry-button');
    headerRetryButton.onclick = () => {
        handleModalClose(initializeTouchNumberGame);
    }
    modalRetryButton.onclick = () => {
        handleModalClose(initializeTouchNumberGame);
    }
}

setButtonDOM();
initialize();