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

const handleSelectCard = (cardId) => {
    // 선택된 카드를 표시하는 함수
    // 1. 이미 선택되어 있던 카드는 선택 해지
    // 2, 현재 선택한 카드를 선택

    const originalSelectedCard = document.getElementsByClassName('select')[0];
    originalSelectedCard?.classList.remove('select');

    const newSelectedCard = document.getElementById(`select-${cardId}`);
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
    cardInfoList.forEach((cardInfo) => {
        const selectCardDOM = getSelectCardDOM(cardInfo);
        snackCardList.appendChild(selectCardDOM);
    })
}