// 각각 플레이어, 컴퓨터 점수, 선택횟수 선언
let playerScore = 0;
let computerScore = 0;
let moves = 0;
const totalCount = 10;

const playGame = () => {
    const rockBtn = document.querySelector('.rock');
    const paperBtn = document.querySelector('.paper');
    const scissorBtn = document.querySelector('.scissor');

    // 게임을 위해 플레이어와 컴퓨터의 가위바위보 배열에 선언
    const playerOptions = [rockBtn, paperBtn, scissorBtn];
    const computerOptions = ['가위', '바위', '보'];

    // 플레이어가 버튼 누를 때마다 선택 횟수를 증가시키고 전체는 차감하게끔 이벤트 리스너 등록
    playerOptions.forEach(option => {
        option.addEventListener('click', () => {

            const movesLeft = document.querySelector('.movesleft');
            moves++;
            movesLeft.innerText = `남은 횟수: ${totalCount - moves}`;

            // 가위, 바위, 보 3개이기 때문에 그에 해당하는 랜덤값을 리턴하게 하기 위한 로직
            const choiceNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[choiceNumber];

            // 누가 이겼는지 확인  
            winner(option.innerText, computerChoice);
            
            // 10번을 다 선택했으면 Game Over!
            if (moves === 10) {
                gameOver(playerOptions, movesLeft);
            }
        })
    })
}

const gameOver = (playerOptions, movesLeft) => {

    const chooseMove = document.querySelector('.move');
    const result = document.querySelector('.result');
    const reloadBtn = document.querySelector('.reload');

    playerOptions.forEach(option => {
        option.style.display = 'none';
    })

    chooseMove.innerText = '게임 종료!';
    movesLeft.style.display = 'none';

    if (playerScore > computerScore) {
        result.style.fontSize = '2rem';
        result.innerText = '게임에서 이겼습니다.';
        result.style.color = '#308D46';
    }
    else if (playerScore < computerScore) {
        result.style.fontSize = '2rem';
        result.innerText = '게임에서 졌습니다.';
        result.style.color = 'red';
    }
    else {
        result.style.fontSize = '2rem';
        result.innerText = '무승부';
        result.style.color = 'grey';
    }

    // 다시 시작했을 때 클릭시 리로드해서 다시 게임을 시작하게 함
    reloadBtn.innerText = '다시 시작';
    reloadBtn.style.display = 'flex';
    reloadBtn.addEventListener('click', () => {
        window.location.reload();
    })
}


const winner = (player, computer) => {

    const result = document.querySelector('.result');
    const playerScoreBoard = document.querySelector('.p-count');
    const computerScoreBoard = document.querySelector('.c-count');

    if (player === computer) {
        result.textContent = '무승부';
    } 
    else if (player === '바위') {
        if (computer === '보') {
            result.textContent = '컴퓨터 승리';
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        } else {
            result.textContent = '플레이어 승리';
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        }
    }
    else if (player === '가위') {
        if (computer === '바위') {
            result.textContent = '컴퓨터 승리';
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        } else {
            result.textContent = '플레이어 승리';
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        }
    }
    else if (player === '보') {
        if (computer === '가위') {
            result.textContent = '컴퓨터 승리';
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        } else {
            result.textContent = '플레이어 승리';
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        }
    }
}

// 한번만 호출
playGame();