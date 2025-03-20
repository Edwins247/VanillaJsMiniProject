import displayUser from "./utils/displayUser.js";
import getUser from "./utils/fetchUser.js";
import getElement from "./utils/getElement.js";

const btn = getElement('.btn');

const showUser = async () => {
    const person = await getUser();

    displayUser(person);
}

window.addEventListener('DOMContentLoaded', showUser);
// 랜덤 유저 버튼 누를 때 유저가 바뀌기 위해서
btn.addEventListener('click', showUser);