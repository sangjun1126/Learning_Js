const $table = document.getElementById('table');
const $score = document.getElementById('score');
let data = [];

function startGame() {
    const $fragment = document.createDocumentFragment();
    [1,2,3,4].forEach(function() {
        const rowData = [];
        data.push(rowData);
        const $tr = document.createElement('tr');
        [1,2,3,4].forEach(() => {
            rowData.push(0);
            const $td = document.createElement('td');
            $tr.appendChild($td);
        });
        $fragment.appendChild($tr);
    });
    $table.appendChild($fragment);
    put2ToRandomCell();
    draw();
}

function put2ToRandomCell() {
    const emptyCells = [];
    data.forEach(function (rowData, i) {
        rowData.forEach(function (cellData, j) {
            if (!cellData) {
                emptyCells.push([i,j]);
            }
        });
    });

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
    data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
            const $target = $table.children[i].children[j];
            if (cellData > 0) {
                $target.textContent = cellData;
                $target.className = 'color-' + cellData;
            } else {
                $target.textContent = '';
                $target.className = '';
            }
        })
    })
}

startGame();

data = [
    [0,2,4,2],
    [0,0,8,0],
    [2,2,2,2],
    [0,16,0,4],
];
draw();

function moveCells(direction) {
    switch(direction) {
        case 'left' :
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
                rowData.forEach((cellData, j) => {
                    if (cellData) {
                        const currentRow = newData[i];
                        const prevData = currentRow[currentRow.length -1];
                        if (prevData === cellData) {
                            currentRow[currentRow.length -1] *= 2;
                        } else {
                            newData[i].push(cellData);
                        }
                    }
                });
            });
            console.log(newData);
            [1,2,3,4].forEach((rowData, i) => {
                [1,2,3,4].forEach((cellData,j) => {
                    data[i][j] = newData[i][j] || 0;
                });
            });
            break;
        case 'right' : 
            // 오른쪽 함수 구현해야함
            break;
        case 'up' :
            // 위쪽 함수도 구현해야합
            break;
        case 'down' :
            // 아래쪽 함수도 구현해야함
            break;
    }
    draw();
}

window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        moveCells('up');
    } else if (event.key === 'ArrowDown') {
        moveCells('down');
    } else if (event.key === 'ArrowLeft') {
        moveCells('left');
    } else if (event.key === 'ArrowRight') {
        moveCells('right');
    }
});

let startCoord;

window.addEventListener('mousedown', (event) => {
    startCoord = [event.clientX, event.clientY];
});

window.addEventListener('mouseup', (event) => {
    const endCoord = [event.clientX, event.clientY];
    const diffX = endCoord[0] - startCoord[0];
    const diffY = endCoord[1] - startCoord[1];
    if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
        moveCells('left');
    } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
        moveCells('right')
    } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
        moveCells('down');
    } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
        moveCells('up')
    }
})
