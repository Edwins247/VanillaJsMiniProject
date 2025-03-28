import { SELECT_RESULT_KEY } from "../constants/result.js";
import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";

// JSON -> fetch : 서버에서 내려준다고 가정하거나, 데이터 양이 너무 많아서 코드에 작성하기 부담스러운 경우
// 클라이언트에서 정의하는 변수도 있음 -> 위의 상황이 아닌 경우

const cardInfoList = [
    {
        id: 1,
        imgSrc: '/js_basic_event/public/assets/초코꼬북칩.jpeg',
        name: '초코꼬북칩',
        description: '맛있는 초코꼬북칩',
    },
    {
        id: 2,
        imgSrc: '/js_basic_event/public/assets/나쵸.jpeg',
        name: '나쵸',
        description: '맛있는 나쵸',
    },
    {
        id: 3,
        imgSrc: '/js_basic_event/public/assets/허니버터칩.jpeg',
        name: '허니버터칩',
        description: '맛있는 허니버터칩',
    },
    {
        id: 4,
        imgSrc: '/js_basic_event/public/assets/홈런볼.jpeg',
        name: '홈런볼',
        description: '맛있는 홈런볼',
    }
]

const snackCardList = document.getElementsByClassName('snack-card-list')[0];
const selectButtonDOM = document.getElementsByClassName('participate-button')[0];
const [ notyetContainerDOM, resultContainerDOM ] = document.getElementsByClassName('result-container');
const [ , resultImageDOM, resultNameDOM, resultDescriptionDOM, selectRetryButtonDOM ] = resultContainerDOM.children;

const getSelectedCard = () => {
    return document.getElementsByClassName('select')[0];
}

const getCardById = (id) => {
    return document.getElementById(`select-${id}`);
}

const handleSelectCard = (cardId) => {
    // 선택된 카드를 표시하는 함수
    // 1. 이미 선택되어 있던 카드는 선택 해지
    // 2, 현재 선택한 카드를 선택

    const originalSelectedCard = getSelectedCard();
    originalSelectedCard?.classList.remove('select');

    const newSelectedCard = getCardById(cardId);
    newSelectedCard?.classList.add('select');
};

const getSelectCardDOM = ({
    id,
    imgSrc,
    name,
    description,
}) => {
    const snackCardDOM = makeDOMwithProperties('button', {
        id: `select-${id}`,
        className: 'snack-card',
        onclick: () => handleSelectCard(id)
    });

    const imageDOM = makeDOMwithProperties('img', {
        src: imgSrc,
        alt: name,
    });

    const descriptionContainerDOM = makeDOMwithProperties('div', {
        className: 'snack-description',
    });

    const nameDOM = makeDOMwithProperties('div', {
        innerHTML: name,
    });

    const descriptionDOM = makeDOMwithProperties('div', {
        innerHTML: description,
    });

    appendChildrenList(descriptionContainerDOM, [nameDOM, descriptionDOM]);
    appendChildrenList(snackCardDOM, [imageDOM, descriptionContainerDOM]);

    return snackCardDOM;
};

export const setSelectCards = () => {
    // 기존의 snackCardList의 자식 요소들을 받아와서 -> 순회하면서 없애주기
    const originalSnackCards = Object.assign([], snackCardList.children);
    originalSnackCards.forEach((snackCard) => snackCard.remove());

    cardInfoList.forEach((cardInfo) => {
        const selectCardDOM = getSelectCardDOM(cardInfo);
        snackCardList.appendChild(selectCardDOM);
    });

    // localStorage에서 이미 선택되어져 있는 과자 id 가져와서 표시
    const cardId = Number(localStorage.getItem(SELECT_RESULT_KEY));
    if (!cardId || isNaN(cardId)) return;

    handleSelectCard(cardId);

}

export const setSelectButton = () => {
    // 1.버튼 DOM을 받아오기
    // 2.DOM의 onclick 핸들러 등록
        // 1) 선택된 카드의 id 찾기
        // 2) localStorage에 해당 id를 저장
        // 1번에서 선택된 카드의 id가 없을 때는 선택된 카드가 없다는 경고창을 띄우기
    selectButtonDOM.onclick = () => {
        const selectedCard = getSelectedCard();
        if (!selectedCard) {
            alert('선택된 카드가 없습니다.');
            return;
        }
        const cardId = selectedCard.id?.split('-')[1];
        localStorage.setItem(SELECT_RESULT_KEY, cardId);
        setResultContainer();
    }
}

const initialize = () => {
    // 과자가 선택되기 전의 상태를 되돌려주는 함수
    // 1. localStorage의 선택된 cardId를 삭제
    // 2. selectCard의 DOM을 다시 구성
    // 3. resultContainer의 DOM을 다시 구성

    localStorage.removeItem(SELECT_RESULT_KEY);
    setSelectCards();
    setResultContainer();

    const selectSectionDOM = document.getElementById('participate-section');
    const scrollTargetY = selectButtonDOM.offsetTop;

    window.scroll({
        top: scrollTargetY,
        left: 0,
        behavior: 'smooth',
    });

}

export const setResultContainer = () => {
    // result 구역에 선택된 과자를 노출시키는 함수
    // 과자 선택 버튼 클릭 시, 페이지 랜딩 시 동작

    // 1. 선택된 아이디를 localStorage로부터 받아오기
    // 2. 선택된 아이디가 저장되어 있다면, notyetContainer를 없애고, resultContainer를 보여주기
    // 3. cardInfoList에서 선택된 카드의 정보를 찾아서 그 정보를 resultContainer에 연결시키기

    const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));

    const isSelected = !!selectedId;
    if (!isSelected) {
        // notyetContainer를 드러내고, resultContainer를 숨기기
        notyetContainerDOM.style.display = 'block';
        resultContainerDOM.style.display = 'none';
        return;
    }

    // notyetContainer를 숨기고 resultContainer를 드러내기
    // resultContainer에 선택된 과자의 정보를 주입하기  
    notyetContainerDOM.style.display = 'none';
    resultContainerDOM.style.display = 'flex';

    const cardInfo = cardInfoList.find((info) => info.id === selectedId);
    
    resultImageDOM.src = cardInfo.imgSrc;
    resultImageDOM.alt = cardInfo.name;
    resultNameDOM.innerHTML = cardInfo.name;
    resultDescriptionDOM.innerHTML = cardInfo.description;

    // 다시하기 버튼 구현
    selectRetryButtonDOM.onclick = initialize;

}