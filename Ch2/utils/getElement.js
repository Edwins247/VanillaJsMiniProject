// 오류를 내기 위해서 element를 받아서 리턴하는 함수를 만듬, 또한 요소를 받아서 리턴하는 함수
const getElement = (selection) => {
    const element = document.querySelector(selection);
    if (element) return element;
    throw new Error('없는 요소 입니다.');
}

// 모듈로 쓰기에 내보내기 처리
export default getElement;