
const game = (function () {
    'use strict';
    const _board = document.getElementById('board');
   
    let _markedBlocks = 0;
    let gameBoard = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let blocks = [];
    let player1, player2;
    const setPlayers = (p1, p2) => {
        [player1, player2] = [p1, p2];
    };
    function displayBoard() {
        form.style.display = 'none'; 
        document.getElementById('container').style.display = 'grid';
        document.getElementById('playerDetails').innerHTML = `<p>Player 1: ${player1.name}</p><p>Player 2: ${player2.name} <p></p>`
        for (let i = 0; i < 9; i++) {
            const block = document.createElement('div');
            block.textContent = gameBoard[i];
            blocks.push(block);
            _board.appendChild(block);
            block.addEventListener('click', _placeXorO);
        }
    }

    function _placeXorO(e) {
        if (currentPlayer === 'X') {
            e.target.textContent = 'X';
            e.target.removeEventListener('click', _placeXorO);
            currentPlayer = 'O';
        }
        else {
            e.target.textContent = 'O';
            e.target.removeEventListener('click', _placeXorO);
            currentPlayer = 'X';
        }
        _markedBlocks++;
        _checkForCompletion()
    }

    function _checkForCompletion() {
        function checkRows(startIndex) {
            let status = true;
            for (let i = startIndex + 1; i < startIndex + 3; i++) {
                if (!areBlockTextsEqual(i, i - 1)) {
                    status = false;
                    break;
                }
                if (i == startIndex + 2) {
                }
            }
            return status;
        }
        function checkColumns(startIndex) {
            let status = true;
            for (let i = startIndex + 3; i < startIndex + 7; i += 3) {
                if (!areBlockTextsEqual(i, i - 3)) {
                    status = false;
                    break;
                }
            }
            return status;
        }

        function checkDiagonal(i) {
            if ((i === 0 && areBlockTextsEqual(0, 4) && areBlockTextsEqual(4, 8)) || (i === 2 && areBlockTextsEqual(2, 4) && areBlockTextsEqual(4, 6)))
                return true;
            return false;
        }

        function areBlockTextsEqual(i, j) {
            return blocks[i].textContent === blocks[j].textContent;
        }

        function getBlockText(i) {
            return blocks[i].textContent;
        }
        function alertWinner(i) {
            const winnerDiv = document.getElementById('winner'); 
            if (i === -1)
            winnerDiv.textContent = `It's a TIE :( !`
            else {
                let winner = player1.option === getBlockText(i) ? player1.name : player2.name;
                winnerDiv.innerHTML = `Aaand the WINNER is <strong>${winner}</strong>!!!`
            }
            const playAgain = document.getElementById('playAgain');
            playAgain.style.display = 'inline-flex';
            playAgain.addEventListener('click', function() {
                window.location.reload();
            })
        }
        label1:
        {
            for (let i = 0; i <= 6; i += 3) {
                if (checkRows(i)) {
                    alertWinner(i);
                    break label1;
                }

            }
            for (let i = 0; i <= 2; i += 1) {
                if (checkColumns(i)) {
                    alertWinner(i);
                    break label1;
                }
            }
            for (let i = 0; i <= 2; i += 2) {
                if (checkDiagonal(i)) {
                    alertWinner(i);
                    break label1;
                }
                if (i == 2 && _markedBlocks === 9) {
                    alertWinner(-1);
                }
            }
        }


        return checkRows(0) || checkRows(3) || checkRows(6) || checkColumns(0) || checkColumns(1) || checkColumns(2) || checkDiagonal(0) || checkDiagonal(2);
    }

    return { displayBoard, setPlayers };
})();

const Player = function (name, option) {
    return { name, option };
}
let currentPlayer;
const form = document.querySelector('form');
const container = document.getElementById('container'); 
const option2X = document.getElementById('option2X');
const option2O = document.getElementById('option2O');
const option1X = document.getElementById('option1X');
const option1O = document.getElementById('option1O');

check = () => document.querySelector('input[name="option1"]:checked') && document.querySelector('input[name="option2"]:checked');

option1X.addEventListener("change", function () { if (check()) option2O.checked = true });
option2X.addEventListener("change", function () { if (check()) option1O.checked = true });

option1O.addEventListener("change", function () { if (check()) option2X.checked = true });
option2O.addEventListener("change", function () { if (check()) option1X.checked = true });


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    currentPlayer = formData.option1;
    form.setAttribute('hidden', 'true');
    game.setPlayers(Player(formData.player1Name, formData.option1), Player(formData.player2Name, formData.option2));
    game.displayBoard();

});








