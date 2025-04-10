// mbti 섹션
// 1. 질문이 표시, yes, no 버튼
// 2. yes -> 점수 +1, no -> 점수 +0
// 3. 버튼을 눌렀을 때 다음 질문이 표시
// 4. n개의 질문이 끝나면 "잠시만 기다려주세요.. 결과분석중" 안냇말이 3초간 뜸
// 5. 분석된 결과가 result에 표시됨

const mbtiQuestionDOM = document.getElementsByClassName('mbti-question')[0];
const [ yesButton, noButton ] = document.getElementsByClassName('mbti-select')[0].children;
const [ selectDOM, pendingDOM, resultDOM ] = document.getElementsByClassName('mbti-container');
const mbtiResultTitleDOM = document.getElementsByClassName('mbti-result')[0];
const mbtiResultDescriptionDOM = document.getElementsByClassName('mbti-description')[0];
const mbtiRetryButton = document.getElementsByClassName('mbti-retry-button')[0];

const mbtiQuestionList = [
    '짠 과자가 단 과자보다 좋다.',
    '봉지 과자가 박스 과자보다 좋다.',
    '과자를 뜯으면 한 번에 다 먹는다.'
];

const getMbtiResult = (resultValue) => {
    // 결과를 받아서 결과정보를 반환해주는 함수
    switch(resultValue) {
        case 0:
            return {
                title: '과자 어린이 (A 유형)',
                description: '과자 어린이 (A 유형) 설명',
            };
        case 1:
            return {
                title: '과자 초심자 (B 유형)',
                description: '과자 초심자 (B 유형) 설명',
            };
        case 2:
            return {
                title: '과자 중급자 (C 유형)',
                description: '과자 중급자 (C 유형) 설명',
            };
        case 3:
        default:
            return {
                title: '과자 고수 (D 유형)',
                description: '과자 고수 (D 유형) 설명',
            };
    }
}

let currentRound = 0;
let resultValue = 0;
const maxRound = mbtiQuestionList.length;

const setPendingSection = () => {
    // pendingDOM을 나타나게 -> 3초 후에 없어지게
    pendingDOM.style.display = 'block';
    selectDOM.style.display = 'none';

    setTimeout(() => {
        pendingDOM.style.display = 'none';
        resultDOM.style.display = 'block';
    }, 3000);
}

const initialize = () => {
    
    currentRound = 0;
    resultValue = 0;
    selectDOM.style.display = 'block';
    pendingDOM.style.display = 'none';
    resultDOM.style.display = 'none';
    
}

const setResultSection = () => {
    // 결과 정보들을 DOM에 주입
    const { title, description } = getMbtiResult(resultValue);
    mbtiResultTitleDOM.innerHTML = title;
    mbtiResultDescriptionDOM.innerHTML = description;

    mbtiRetryButton.onclick = initialize;
}

export const setMbtiSection = () => {
    // 질문 표시
    // 버튼이 눌렸을 때 다음 질문으로 넘어감
    if (currentRound === maxRound) {
        // 끝! -> pending을 3초간 표시 -> result 표시
        setPendingSection();
        setResultSection();
        return;
    }

    selectDOM.style.display = 'block';

    mbtiQuestionDOM.innerHTML = mbtiQuestionList[currentRound++]; // 줄이 실행된 후 증감연산자 실행
    yesButton.onclick = () => {
        resultValue++;
        setMbtiSection();
    };
    noButton.onclick = () => {
        setMbtiSection();
    }
}