// 비밀번호 생성 위한 문자들 하드 코딩
const characters = ["@", "#", "!", "$", "%", "&"];

const capLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const smallLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

// 각 필요한 요소 불러오기
const formEl = document.querySelector("form");
const limitEl = document.querySelector("#length");
const numberRadioEl = document.querySelector("#numbers");
const slettersRadioEl = document.querySelector("#sletters");
const cletterRadioEl = document.querySelector("#cletters");
const symbolsRadioEl = document.querySelector("#symbols");
const showEl = document.querySelector(".show");
let choices = [];

// 제출할 경우
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // 앞서 선언한 배열에 각각 체크박스 조건에 필요한 값을 배열에 push함
  choices = [];
  if (numberRadioEl.checked === true) {
    choices.push(numbers);
  }
  if (cletterRadioEl.checked === true) {
    choices.push(capLetters);
  }
  if (slettersRadioEl.checked === true) {
    choices.push(smallLetters);
  }
  if (symbolsRadioEl.checked === true) {
    choices.push(characters);
  }

  // 패스워드 생성하기
  const password = passwordGenerator(limitEl.value);

  // 패스워드 보여주기
  showEl.innerText = password;
});

// 비밀번호를 랜덤 생성을 하기 위한 메소드
const randomNumber = (limit) => {
  return Math.floor(Math.random() * limit);
};

const passwordGenerator = (limit) => {
  let password = "";
  let choiceLength = choices.length;
  for (let i = 0; i < limit; i++) {
    // choices 배열 중 랜덤으로 배열을 골라서 그 값으로 패스워드를 만듬
    const randomArray = choices[randomNumber(choiceLength)];
    // 순회하면서 입력받은 길이만큼 비밀번호 랜덤으로 생성
    let length = randomArray.length;
    password += randomArray[randomNumber(length)];
  }
  return password;
};

// 클립보드 복사 & 붙여넣기 기능
const copyEl = document.querySelector(".copy");
const clickCopyEl = document.querySelector(".clickCopy");

clickCopyEl.addEventListener("click", (e) => {
  const password = showEl.innerText;
  // window 객체를 활용해서 클립보드 복사
  navigator.clipboard.writeText(password);

  // attributes 속성에서 이미지 변경 후 3초후 다시 svg가 바뀌게 처리함
  copyEl.attributes[0].value = "assets/clipboard-check.svg";

  setTimeout(() => {
    copyEl.attributes[0].value = "assets/clipboard.svg";
  }, 3000);
});
