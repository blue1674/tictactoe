
const game = (function () {
    'use strict';
    const _board = document.getElementById('board');
    let _markedBlocks = 0;
    let gameBoard = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let blocks = [];
    let _setWinner;
    function displayBoard() {
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
        if (_checkForCompletion()) {
            alert("Someone Won");
        }
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
            alert(`winner = ${getBlockText(i)}`);
            document.location.reload();
        }
        if (checkRows(0))
            alertWinner(0);
        else if (checkRows(3))
            alertWinner(3);
        else if (checkRows(6))
            alertWinner(6);
        else if (checkColumns(0))
            alertWinner(0);
        else if (checkColumns(1))
            alertWinner(1);
        else if (checkColumns(2))
            alertWinner(2);
        else if (checkDiagonal(0))
            alertWinner(0);
        else if (checkDiagonal(2))
            alertWinner(2);

        return checkRows(0) || checkRows(3) || checkRows(6) || checkColumns(0) || checkColumns(1) || checkColumns(2) || checkDiagonal(0) || checkDiagonal(2);
    }

    return { displayBoard };
})();

const Player = function (name, option) {
    return { name, option };
}
let currentPlayer;
let player1;
let player2;
const form = document.querySelector('form');
// const option2X = document.getElementById('option2X');
// const option2O = document.getElementById('option2O');
// const option1X = document.getElementById('option1X');
// const option1O = document.getElementById('option1O');

// function checkRadios(option1, option2, option3) {
//     option1.addEventListener('click', function () {
//         if(option1.checked && option2.checked)
//         option3.setAttribute('checked', 'true'); 
//     });
// }

// checkRadios(option1X, option2X, option2O); 
// checkRadios(option1O, option2O, option2X); 
// checkRadios(option2X, option1X, option1O); 
// checkRadios(option2O, option1O, option1X); 
const option2X = document.getElementById('option2X');
const option2O = document.getElementById('option2O');
const option1X = document.getElementById('option1X');
const option1O = document.getElementById('option1O');

check = () => document.querySelector('input[name="option1"]:checked') && document.querySelector('input[name="option2"]:checked');

option1X.addEventListener("change", function() {if (check()) option2O.checked = true});
option2X.addEventListener("change", function() {if (check()) option1O.checked = true});

option1O.addEventListener("change", function() {if (check()) option2X.checked = true});
option2O.addEventListener("change", function() {if (check()) option1X.checked = true});


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    currentPlayer = formData.option1;
    form.setAttribute('hidden', 'true');
    game.displayBoard();
});








