const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $$cells = document.querySelectorAll('.cell');

const holes = [0,0,0,0,0,0,0,0,0];
let started = false;
let score = 0;
let time = 60;

$start.addEventListener('click', () => {
    if (started) return; // 이미 시작했다면 무시합니다.
    started = true;
    console.log('시작')
    const timerId = setInterval(() => {
        time = (time * 10 -1) / 10; // 소수 점 계산 시 문제가 있음
        $timer.textContent = time;
        if (time === 0) {
            clearInterval(timerId);
            clearInterval(tickId);
            setTimeout(() => {
                alert(`게임 오버! 점수는 ${score}점`);
            }, 50);
        }
    }, 100)
    const tickId = setInterval(tick, 1000);
})

function tick() {
    holes.forEach((hole, index) => {
        const $gopher = $$cells[index].querySelector('.gopher')
        holes[index] = setTimeout(() => {
            $gopher.classList.add('hidden');
            holes[index] = 0;
        }, 1000);
        $gopher.classList.remove('hidden');
    });
}

$$cells.forEach(($cell, index) => {
    $cell.querySelector('.gopher').addEventListener('click', (event) => {
        if (!event.target.classList.remove('dead')) {
            score += 1;
            $score.textContent = score;
        }

        event.target.classList.add('dead');
        event.target.classList.add('hidden');
        clearTimeout(holes[index]); // 기존 내려가는 타이머를 제거합니다.
        setTimeout(() => {
            holes[index] = 0;
            event.target.classList.remove('dead');
        }, 1000);
        $cell.querySelector('.bomb').addEventListener('click', (event) => {
            event.target.classList.add('boom');
            event.target.classList.add('hidden');
            clearTimeout(holes[index]);
            setTimeout(() => {
                holes[index] = 0;
                event.target.classList.remove('boom');
            }, 2000);
        });
    })
})