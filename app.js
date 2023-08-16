let road = [];
let rows = 12;
let cols = 8;

let holesCount = 10;
let holesLocation = [];

let roadCleared = 0;

let gameOver = false;

// load the game
window.onload = function () {
    startGame();
};

// set potholes
function placePotholes() {
    let holesLeft = holesCount;
    while (holesLeft > 0) {
        // randomly generate a row and column to place a new pothole
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        let id = r.toString() + "-" + c.toString();

        // check to make sure the above generated location hasn't already been selected
        if (!holesLocation.includes(id)) {
            holesLocation.push(id);
            holesLeft -= 1;
        }
    }
}

// start the game
function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            //create a new div element inside the road div
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener('click', clickTile);
            tile.addEventListener('contextmenu', placeBarrier);
            document.getElementById("road").append(tile); // add the newly created tile
            row.push(tile);
        }
        road.push(row);
    }
    console.log(road);
    placePotholes();
}

// click a road tile
function clickTile(){
    if (gameOver || this.classList.contains('tile-clicked')){
        return;
    }

    let tile = this;

    if (holesLocation.includes(tile.id)){
        alert('GAME OVER');
        gameOver = true;
        revealPotholes();
        return;
    }
    
}

// place a barrier - right click
function placeBarrier(e){
    e.preventDefault()
    let tile = this;

    if(tile.innerText == ''){
        tile.innerText = '🚧'
    } else if (tile.innerText == '🚧'){
        tile.innerText = '';
    }
    return;
}

// reveal potholes
function revealPotholes(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            let tile = road[r][c];
            if(holesLocation.includes(tile.id)){
                tile.innerText = '🕳️';
            }
        }
    }
}

// check for potholes

// testing only
console.log(holesLocation);
