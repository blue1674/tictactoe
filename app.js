
const game = (function () {
    const board = document.getElementById('board');
    'use strict';
    let gameBoard = ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'];
    function displayBoard() {
        for (let i = 0; i < 9; i++) {
            const block = document.createElement('div');
            block.textContent = gameBoard[i];
            board.appendChild(block);
            block.addEventListener('click', e => placeXorO(e));
        }
    }

    function placeXorO(e) {
        if (currentPlayer === 'X'){
            e.target.textContent = 'X';
            e.target.removeEventListener('click', e => placeXorO(e)); 
            currentPlayer = 'O';
        }
        else{
            e.target.textContent = 'O';
            currentPlayer = 'X'; 
        }
    }

    return { displayBoard };
})();

const Player = function (name, option) {
    return { name, option };
}
let currentPlayer = 'X';  
game.displayBoard();




