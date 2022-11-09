let slider = document.getElementById('range');
let output = document.getElementById('value-display');
const container = document.getElementById('sketch-container');
const classicBtn = document.getElementById('classic');
const rainbowBtn = document.getElementById('rainbow');
const eraseBtn = document.getElementById('erase');
const clearBtn = document.getElementById('clear');
let colorWell;
const defaultColor = "#a6a5a4";

output.textContent += ' ' + slider.value;

//Change value of the Slider:
slider.addEventListener('mouseup', function(){
    output.textContent = "Size: " + this.value;
    restartGrid(); //resize and update the grid
});

//Create grid:
function makeGrid(gridNumber) {
    let columns = gridNumber;
    let rows = gridNumber;
    for (let i = 0; i < columns; i++) {
    let column = document.createElement('div');
    column.classList.add('column');
        for (let j = 0; j < rows; j++) {
            let row = document.createElement('div');
            row.classList.add('row');
            column.appendChild(row);
        }
    container.appendChild(column);
    } 
}

//Restart grid size every time it changes its value:
function restartGrid() {
    let pixels = container.querySelectorAll('div');
    pixels.forEach(pixel => pixel.remove()); //first remove all pixels
    makeGrid(slider.value); //restart grid
    addGray(); //Default color;
}

//Classic Button:
classicBtn.addEventListener('click', addGray);

function addGray() {
    let squares = container.querySelectorAll('.row');
    squares.forEach(square => square.addEventListener('mouseenter', function(){
        square.style.backgroundColor = '#a6a5a4';
}))
}

//Rainbow Button:
rainbowBtn.addEventListener('click', addRainbow);

function addRainbow() {
    let squares = container.querySelectorAll('.row');
    squares.forEach(square => square.addEventListener('mouseenter', function(){
        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        square.style.backgroundColor = `rgb(${r},${g},${b})`;
}))
}

//Erase Button:
eraseBtn.addEventListener('click', erase);

function erase() {
    let squares = container.querySelectorAll('.row');
    squares.forEach(square => square.addEventListener('mouseenter', function(){
        square.style.backgroundColor = 'white';
}))
}

//Clear Button:
clearBtn.addEventListener('click', restartGrid);

//Choose a color (color well):
window.addEventListener('load', startup);

function startup() {
    colorWell = document.getElementById('colorWell');
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", updateAll);
    colorWell.addEventListener('change', updateAll);
    colorWell.select();
}

function updateAll(event) {
    let squares = container.querySelectorAll('.row');
    squares.forEach(square => square.addEventListener('mouseenter', function() {
        square.style.backgroundColor = event.target.value;

    }))
}

//Defaults:
makeGrid(20); //Default grid size
addGray(); //Default color