import getElement from "./getElement.js";
import removeActive from "./removeActive.js";

// fetch를 통해서 받아온 데이터를 필요한 요소에 보여주는 함수

// 먼저 fetch를 할 요소들을 다 불러옴
const userImage = getElement('.user-img');
const title = getElement('.user-title');
const value = getElement('.user-value');
// 버튼들을 다 담음(아이콘 버튼들)
const btns = [...document.querySelectorAll('.icon')];

// 넘겨받을 객체 데이터에 대해서 그 값을 요소에 적용해서 보여줌
const displayUser = (person) => {
    userImage.src = person.image;
    value.textContent = person.name;
    title.textContent = 'My name is';
    // 새로운 유저를 보여줄 때 초기화를 해야하므로 active 초기화
    removeActive(btns);
    // 버튼을 누를 때 active하게 하고, 그에 맞는 데이터를 보여줌
    btns.forEach((btn) => {
        const label = btn.dataset.label;
        btn.addEventListener('click', () => {
            title.textContent = `My ${label} is`;
            value.textContent = person[label];
            // active를 먼저 삭제하고 클릭한 아이템을 active를 함
            removeActive(btns);
            btn.classList.add('active');
        })
    })
}

export default displayUser;