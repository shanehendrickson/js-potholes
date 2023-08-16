let road = [];
let rows = 8;
let cols = 12;

let holesCount = 10;
let holesLocation = [];

let roadCleared = 0;

let gameOver = false;

// load the game
window.onload = function(){
    startGame();
}

// set potholes
function placePotholes(){
    let holesLeft = holesCount;
    while(holesLeft > 0) {
        // randomly generate a row and column to place a new pothole
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        let id = r.toString() + '-' + c.toString();
    
        // check to make sure the above generated location hasn't already been selected
        if(!holesLocation.includes(id)){ 
            holesLocation.push(id);
            holesLeft -= 1;
        }
    }
}

function startGame(){
    placePotholes();
}

console.log(holesLocation)


// start the game


// click a road tile


// place a barrier - right click


// reveal potholes


// check for potholes