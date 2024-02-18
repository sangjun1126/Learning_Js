const {body} = document;
const $table = document.createElement('table');
const $result = document.createElement('div'); // 결과창
const rows = [];
let turn = '0';

const checkWinner = (target) => {
    let rowIndex;
    let cellIndex;

    rows.forEach((row, ri) => {
        row.forEach((cell, ci) => {
            if (cell === target) {
                rowIndex = ri;
                cellIndex = ci;
            }
        })
    })

    let haswinner = false;

    if (
        rows[rowIndex][0].textContent === turn &&
        rows[rowIndex][1].textContent === turn &&
        rows[rowIndex][2].textContent === turn
    ) {
        haswinner = true;
    }

    if (
        rows[0][cellIndex].textContent === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn
    ) {
        haswinner = true
    }

    if (
        rows[0][0].textContent === turn && 
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
    ) {
        haswinner = true;
    }

    if (
        rows[0][2].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][0].textContent === turn
    ) {
        haswinner = true;
    }
    return haswinner;
}

const callback = (event) => {
    if (event.target.textContent !== '') {
        console.log("빈칸이 아닙니다.")
        return
    } else {
        console.log("빈칸입니다.")
        event.target.textContent = turn;
        const haswinner = checkWinner(event.target);

        if (haswinner) {
            $result.textContent = `${turn}님이 승리!`
            $table.removeEventListener('click', callback);
            return;
        }
        turn = turn === 'X' ? 'O' : 'X';
    };
}

for (let i = 1; i <= 3; i++) {
    const $tr = document.createElement('tr');
    const cells = [];

    for (let j = 1; j <= 3; j++) {
        const $td = document.createElement('td');
        $td.addEventListener('click', callback)
        cells.push($td);
        $tr.appendChild($td);
    }

    rows.push(cells);
    $table.appendChild($tr);
    $table.addEventListener('click', callback)
}

body.appendChild($table);
body.appendChild($result);