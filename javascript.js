let slider = document.getElementById('range');
let output = document.getElementById('value-display');
const container = document.getElementById('sketch-container');
const classicBtn = document.getElementById('classic');
const rainbowBtn = document.getElementById('rainbow');
const lightenBtn = document.getElementById('lighten');
const darkenBtn = document.getElementById('darken');
const eraseBtn = document.getElementById('erase');
const clearBtn = document.getElementById('clear');
let colorWell = document.getElementById('colorWell');
const defaultColor = "#a6a5a4";
colorWell.value = defaultColor;
let mode = 'classic'; //default mode

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
            row.addEventListener('mouseenter', (e) => addColor(e)); //add color to pixels
            row.style.backgroundColor = '#fff' //default color
        }
    container.appendChild(column);
    } 
}

//Restart grid size every time it changes its value:
function restartGrid() {
    let pixels = container.querySelectorAll('div');
    pixels.forEach(pixel => pixel.remove()); //first remove all pixels
    makeGrid(slider.value); //restart grid
}

//Buttons Listeners:
colorWell.addEventListener('change', () => {
    mode = "chosenColor";
});
colorWell.addEventListener('input', () => {
    mode = "chosenColor";
});
colorWell.select();
classicBtn.addEventListener('click', () => {
    mode = "classic";
});
rainbowBtn.addEventListener('click', () => {
    mode = "rainbow";
});
lightenBtn.addEventListener('click', () => {
    mode = "lighten";
});
darkenBtn.addEventListener('click', () => {
    mode = "darken";
});
eraseBtn.addEventListener('click', () => {
    mode = "eraser";
});

clearBtn.addEventListener('click', restartGrid);

//Change color function:

function addColor(e) {
    let colorArray;
    let getArray = (string) => string.slice(4, -1).split(', ');
    let getString = (array) => 'rgb(' + array.join(', ') + ')';

    switch (mode) {
        case 'chosenColor':
            e.target.style.backgroundColor = colorWell.value;
            // console.log(e.target);
            // console.log(e.target.style.backgroundColor);
            break;

        case 'classic':
            e.target.style.backgroundColor = '#a6a5a4';
            // console.log(e.target);
            // console.log(e.target.style.backgroundColor);
            break;

        case 'rainbow':
            const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
            const r = randomBetween(0, 255);
            const g = randomBetween(0, 255);
            const b = randomBetween(0, 255);
            e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
            // console.log(e.target);
            // console.log(e.target.style.backgroundColor);
            break;
        
        case 'lighten':
            colorArray = getArray(e.target.style.backgroundColor);

            if(colorArray[0] >= 235) colorArray[0] = 255; else colorArray[0] = Number(colorArray[0]) + 20;

            if(colorArray[1] >= 235) colorArray[1] = 255; else colorArray[1] = Number(colorArray[1]) + 20;

            if(colorArray[2] >= 235) colorArray[2] = 255; else colorArray[2] = Number(colorArray[2]) + 20;

            e.target.style.backgroundColor = getString(colorArray);

            break;
        
        case 'darken':
            colorArray = getArray(e.target.style.backgroundColor);

            if(colorArray[0] <= 20) colorArray[0] = 0;
            else colorArray[0] = Number(colorArray[0]) - 20;

            if(colorArray[1] <= 20) colorArray[1] = 0;
            else colorArray[1] = Number(colorArray[1]) - 20;

            if(colorArray[2] <= 20) colorArray[2] = 0;
            else colorArray[2] = Number(colorArray[2]) - 20;

            e.target.style.backgroundColor = getString(colorArray);

            break;
        
        case 'eraser':
            e.target.style.backgroundColor = '#fff';
            // console.log(e.target);
            // console.log(e.target.style.backgroundColor);
            break;        
    }
}



makeGrid(20); //default grid
