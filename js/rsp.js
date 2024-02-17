const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const IMG_URL = '../img/rsp.png'
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = 'auto 200px';

const rspX  = {
    scissors : '0',
    rock : '-220px',
    paper : '-440px'
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
    if (computerChoice === 'rock') {
        computerChoice = 'scissors';
    } else if (computerChoice === 'scissors') {
        computerChoice = 'paper';
    } else if (computerChoice === 'paper') {
        computerChoice = 'rock';
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
    $computer.style.backgroundSize = 'auto 200px';
}

let intervaild = setInterval(changeComputerHand, 50);

const scoreTable = {
    rock : 0,
    scissors : 1,
    paper : -1,
};

let clickable = true;
let score = 0;
const clickButton = () => {
    if (clickable) {
        clearInterval(intervaild);
        clickable = false;
        const myChoice = event.target.textContent === '바위'
        ? 'rock'
        : event.target.textContent === '가위'
        ? 'scissors'
        : 'paper';

        const myScore = scoreTable[myChoice];
        const computerScore = scoreTable[computerChoice];
        const diff = myScore - computerScore;

        let message;
        if ([2, -1].includes(diff)) {
            score += 1;
            message = '승리' 
        } else if ([-2, 1].includes(diff)) {
            score -= 1;
            message = '패배'
        } else {
            message = '무승부'
        }
        $score.textContent = `${message} 총 : ${score} 점`;

        setTimeout(() => {
            clickable = true;
            intervaild = setInterval(changeComputerHand, 50);
        }, 1000);
    }
};

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$rock.addEventListener('click', clickButton);