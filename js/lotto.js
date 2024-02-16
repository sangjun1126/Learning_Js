const candidate = Array(45).fill().map((v,i) => i + 1);
const shuffle = [];

while (candidate.length > 0) {
    const random = ~~(Math.random() * candidate.length); // 무작위 인덱스 만들기
    const spliceArray = candidate.splice(random, 1);
    const value = spliceArray[0];
    shuffle.push(value);
}

const winballs = shuffle.slice(0,6).sort((a,b) => a-b);
const bonus = shuffle[6];
const $result = document.querySelector('#result');

function drawBall(number, $parent) {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    $parent.appendChild($ball);
}

for (let i = 0; i < winballs.length; i++) {
    setTimeout(() => {
        drawBall(winballs[i], $result);
    }, 1000 * (i + 1));
}

const $bonus = document.querySelector('#bonus');
setTimeout(() => {
    drawBall(bonus, $bonus)
}, 7000)