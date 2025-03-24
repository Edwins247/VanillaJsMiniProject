// 기본적으로 필요한 상수 및 변수 선언
const TIME_LIMIT = 60;

// 타이핑 용 글
const quotesArray = [
  "he realized what was happening and told the others.",
  "And in the end it turned out that the creature was her grandfather",
  "when the old man saw his granddaughter",
];

const timerText = document.querySelector(".curr_time");
const accuracyText = document.querySelector(".curr_accuracy");
const errorText = document.querySelector(".curr_errors");
const cpmText = document.querySelector(".curr_cpm");
const wpmText = document.querySelector(".curr_wpm");
const quoteText = document.querySelector(".quote");
const inputArea = document.querySelector(".input_area");
const restartBtn = document.querySelector(".restart_btn");
const cpmGroup = document.querySelector(".cpm");
const wpmGroup = document.querySelector(".wpm");
const errorGroup = document.querySelector(".errors");
const accuracyGroup = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let totalErrors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let currentQuote = "";
let quoteNo = 0;
let timer = null;

// textArea 포커스 시, 게임을 시작하는 함수
function startGame() {
  // 원하는 변수 초기화
  resetValues();

  // quote 업데이트
  updateQuote();

  // 이전에 있는 것을 다시 초기화(다시 시작일 경우)
  clearInterval(timer);
  // 타이머 시작(1총에 한 번씩 함수 호출)
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  // 타이핑 시 필요한 변수들에 대해서 초기화를 진행함
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  totalErrors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  inputArea.disabled = false;

  inputArea.value = "";

  quoteText.textContent = "아래를 클릭해서 게임을 시작하세요";
  accuracyText.textContent = 100;
  timerText.textContent = timeLeft + "s";
  errorText.textContent = 0;
  restartBtn.style.display = "none";
  cpmGroup.style.display = "none";
  wpmGroup.style.display = "none";
}

function processCurrentText() {
  // 현재 입력 텍스트를 가져와서 분할
  let currInput = inputArea.value;
  let currInputArray = currInput.split("");

  // 입력된 총 문자 수 증가
  characterTyped++;

  errors = 0;

  let quoteSpanArray = quoteText.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = currInputArray[index];

    // 현재 입력되지 않은 문자
    if (!typedChar) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");
    }

    // 올바른 문자
    else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
    }

    // 잘못된 문자
    else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      errors++;
    }
  });

  // 오류 개수 표시
  errorText.textContent = totalErrors + errors;

  // 정확도 텍스트 업데이트
  let correctCharacters = characterTyped - (totalErrors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracyText.textContent = Math.round(accuracyVal); // 소수점 없앰

  // 현재 텍스트가 오류와 상관없이 타이핑 완료시
  if (currInput.length == currentQuote.length) {
    updateQuote();

    // 총 오류 업데이트
    totalErrors += errors;

    // 입력 영역 지우기
    inputArea.valuee = "";
  }
}

function updateQuote() {
  quoteText.textContent = null;
  currentQuote = quotesArray[quoteNo];

  // 각 문자를 분리하고 각 문자로 요소를 만들기(타이핑 정확도와 스피드를 위해)
  // 타이핑 마다 컨트롤 하기 위해서
  currentQuote.split("").forEach((char) => {
    // span 태그로 생성하고 문자를 넣어줌
    const charSpan = document.createElement("span");
    charSpan.innerText = char;

    // 만든 요소를 quote에 넣어주기
    quoteText.appendChild(charSpan);
  });

  // quote를 순서대로 다음 것으로 넘김(다 돌면 0으로 초기화)
  if (quoteNo < quotesArray.length - 1) {
    quoteNo++;
  } else {
    // 마지막 것이면 처음으로 다시 감
    quoteNo = 0;
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // 현재 남은 시간을 줄이기
    timeLeft--;

    // 경과 시간 늘리기
    timeElapsed++;

    // 타이머 텍스트 업데이트
    timerText.textContent = timeLeft + "s";
  } else {
    // 게임을 끝내기
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);

  // 입력 영역 비활성화
  inputArea.disabled = true;

  // 마무리 텍스트 표시
  quoteText.textContent = "새 게임을 시작하려면 다시 시작을 클릭하세요.";

  // 재시작 버튼을 보여주기
  restartBtn.style.display = "block";

  // WPM, CPM 계산하기
  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  cpmText.textContent = cpm;
  wpmText.textContent = wpm;

  cpmGroup.style.display = "block";
  wpmGroup.style.display = "block";
}
