
/************************************************************
 DATA PART
*************************************************************/

let data = 
[ "PLAIN", "CRANE",
  "DRAIN", "TRAIN"
]; // words database


let alphabets = 
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
 'U', 'V', 'W', 'X', 'Y', 'Z'
]; // all the alphabets (will be used for keyboard layout)

let total_chances   = 7;
let word_length     = 7; 

let word; // representing current word to guess
let current_chance; // representing row
let current_index;  // represnting column

let current_word = ""; // representing current word being typed
/************************************************************
 LOGIC PART
*************************************************************/


let board = Array.from({ length: total_chances }, () => Array(word_length).fill(''));
let word_grid = document.getElementById("word-grid");
let word_grid_items;

function restart() {
    word_grid.innerHTML = "";


    current_chance = 0;
    current_index  = 0;

    word_grid.style.gridTemplateColumns  = `repeat(${word_length}, 1fr)`;
    word_grid.style.gridTemplateRows     = `repeat(${total_chances}, 1fr)`;

    board.forEach( (row, rowIndex) =>{
        row.forEach ( (column, colIndex) =>{
            const word_grid_item = document.createElement('div');
            word_grid_item.textContent = '';
            word_grid_item.className = 'word-grid-item-untyped';
            word_grid.appendChild(word_grid_item);
        });
    });
    word_grid_items = word_grid.querySelectorAll("div")

    word = data[Math.floor(Math.random() * data.length)];
}


document.addEventListener("DOMContentLoaded", () => {
    restart();
});

document.addEventListener("keydown", (event) => {
    console.log(current_index + '\n');
    
    if (/^Key[A-Z]$/.test(event.code)) {
        if (word_grid_items[getIndex()].className == "word-grid-item-untyped"){
            word_grid_items[getIndex()].className = "word-grid-item-typed";
            word_grid_items[getIndex()].textContent = event.key.toUpperCase();
        }
        
        if (current_index < word_length-1) {
            current_index++;
        }
    }

    if (event.key === "Backspace"){
        let valid = false;

        if (current_index > 0 || current_index == 0) {
            valid = true;
        }

        if (valid) {
            word_grid_items[getIndex()].className = "word-grid-item-untyped";
            word_grid_items[getIndex()].textContent = '';
        }

        if (current_index > 0) {
            current_index--;
        }
    }

    if (event.key === "Enter"){
        let valid = false;

        if (word_grid_items[getIndex()].className == "word-grid-item-untyped"){
            window.alert("incomplete word"); 
        }
        else if (current_index == word_length-1 && word_grid_items[getIndex()].className == "word-grid-item-typed"){
            for (let i = 0; i < word_length; i++){
                word_grid_items[getIndexParam(i, current_chance)].className = "word-grid-item-wrong";
            }
            
            valid = true;
        }

        if (valid && current_chance < total_chances){
            current_chance++;
            current_index = 0;
        }
    }
});

document.getElementById('restart-button').addEventListener("mousedown", (e)=>{
    restart();
});


function getIndex(){
    return ((current_index+1)+((current_chance*word_length)+1)) - 2;
}

function getIndexParam(row, col){
     return ((row+1)+((col*word_length)+1)) - 2;
}