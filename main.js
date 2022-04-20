const FIELD_SIZE = 3;
const CELL_STATE = { EMPTY: "cell-empty", PLAYER1: "cell-player1", PLAYER2: "cell-player2" };
let stepNumber = 0
let gameOver = false

function render() {
    let table = document.getElementById("gameField");

    for (let i = 0; i < FIELD_SIZE; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < FIELD_SIZE; j++) {
            let cell = document.createElement("td");
            cell.className = CELL_STATE.EMPTY;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

render()

function win(table, playerClassName) {
    for (let i = 0; i < FIELD_SIZE; i += 1) {
        let winCombinationRow = true;
        let winCombinationColumn = true;
        for (let j = 0; j < FIELD_SIZE; j += 1) {
            winCombinationRow = winCombinationRow && table.rows[i].cells[j].className === playerClassName;
            winCombinationColumn = winCombinationColumn && table.rows[j].cells[i].className === playerClassName;
        }
        if (winCombinationColumn || winCombinationRow) {
            return true;
        }
    }

    let winCombinationDiagonal1 = true;
    let winCombinationDiagonal2 = true;
    for (let i = 0; i < FIELD_SIZE; i += 1) {
        winCombinationDiagonal1 = winCombinationDiagonal1 && table.rows[i].cells[i].className === playerClassName;
        winCombinationDiagonal2 = winCombinationDiagonal2 && table.rows[i].cells[FIELD_SIZE - 1 - i].className === playerClassName;
    }
    return winCombinationDiagonal1 || winCombinationDiagonal2;
}

window.addEventListener("DOMContentLoaded", () => {
    let table = document.getElementById("gameField");
    table.addEventListener("click", event=> {
        if (event.target.className !== CELL_STATE.EMPTY) {
            alert("Other player already take this position")
            return;
        }
        if (gameOver) {
            alert("Game over. Update page");
            return;
        }
        event.target.className = (stepNumber % 2 === 0) ? CELL_STATE.PLAYER1: CELL_STATE.PLAYER2;
        stepNumber += 1;
        if (win(table, CELL_STATE.PLAYER1)) {
            alert("Player1 is Win!");
            gameOver = true;
        } else if (win(table, CELL_STATE.PLAYER2)) {
            alert("Player2 is Win!");
            gameOver = true;
        } else if (stepNumber >= FIELD_SIZE * FIELD_SIZE) {
            alert("Nighia :)");
            gameOver = true;
        }
    }, false)
})
