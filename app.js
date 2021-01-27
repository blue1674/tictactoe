
const game = (function () {
    const _board = document.getElementById('board');
    'use strict';
    let gameBoard = ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'];
    function displayBoard() {
        for (let i = 0; i < 9; i++) {
            const block = document.createElement('div');
            block.textContent = gameBoard[i];
            board.appendChild(block);
            block.addEventListener('click', _clickBlockHandler );
        }
    }

    function _clickBlockHandler(e){
        _placeXorO(e);
    }

    function _placeXorO(e) {
        if (currentPlayer === 'X'){
            e.target.textContent = 'X';
            e.target.removeEventListener('click', _clickBlockHandler); 
            currentPlayer = 'O';
        }
        else{
            e.target.textContent = 'O';
            e.target.removeEventListener('click', _clickBlockHandler); 
            currentPlayer = 'X'; 
        }
    }

    return { displayBoard };
})();

const Player = function (name, option) {
    return { name, option };
}
let currentPlayer = 'X';  
const button = document.getElementById('playGame')
game.displayBoard();




