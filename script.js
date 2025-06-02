

let alphabets = 
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
 'U', 'V', 'W', 'X', 'Y', 'Z'
];

let board = Array.from({ length: 6 }, () => Array(5).fill(''));

let key_grid = document.getElementById('word-grid');

function initWordGrid(){
    for (let row = 0; row < 6; row++){
        for (let column = 0; column < 5; column++){
            let div = document.createElement('div');
            div.className = 'alphabet';
            div.textContent = alphabets[row][column];
            key_grid.appendChild(div);
        }
    }
}