let road = [];
let rows = 12;
let cols = 8;

let holesCount = 10;
let holesLocation = [];

let tilesChecked = 0;

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
            let roadTile = document.createElement("div");
            roadTile.id = r.toString() + "-" + c.toString();
            roadTile.addEventListener("click", checkTile);
            roadTile.addEventListener("contextmenu", placeBarrier);
            document.getElementById("road").append(roadTile); // add the newly created tile
            row.push(roadTile);
        }
        road.push(row);
    }

    placePotholes();
}

// click a road tile
function checkTile() {
    if (gameOver || this.classList.contains("tile-checked")) {
        return;
    }

    let roadTile = this;

    if (holesLocation.includes(roadTile.id)) {
        gameOver = true;
        revealPotholes();
        return;
    }

    let coords = roadTile.id.split("-"); // turns '0-0' into ['0', '0']
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkPothole(r, c);
}

// place a barrier - right click
function placeBarrier(e) {
    e.preventDefault();
    let roadTile = this;

    if (roadTile.innerText == "") {
        roadTile.innerText = "🚧";
    } else if (roadTile.innerText == "🚧") {
        roadTile.innerText = "";
    }
    return;
}

// reveal potholes
function revealPotholes() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let roadTile = road[r][c];
            if (holesLocation.includes(roadTile.id)) {
                roadTile.innerText = "🕳️";
            }
        }
    }
}

// check for potholes
function checkPothole(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
        return;
    }
    if (road[r][c].classList.contains('tile-checked')){
        return;
    }

    road[r][c].classList.add('tile-checked');
    tilesChecked += 1;

    potholesDiscovered = 0;
    potholesDiscovered += checkRoadTile(r - 1, c - 1); // UP and LEFT one from clicked tile
    potholesDiscovered += checkRoadTile(r - 1, c); // UP one from clicked tile
    potholesDiscovered += checkRoadTile(r - 1, c + 1); // UP and RIGHT one from clicked tile
    potholesDiscovered += checkRoadTile(r, c - 1); // LEFT one from clicked tile
    potholesDiscovered += checkRoadTile(r, c + 1); // RIGHT one from clicked tile
    potholesDiscovered += checkRoadTile(r + 1, c - 1); // DOWN and LEFT one from clicked tile
    potholesDiscovered += checkRoadTile(r + 1, c); // DOWN one from clicked tile
    potholesDiscovered += checkRoadTile(r + 1, c + 1); // DOWN and RIGHT one from clicked tile

    if (potholesDiscovered > 0) {
        road[r][c].innerText = potholesDiscovered;
        road[r][c].classList.add("holes" + potholesDiscovered.toString());
    } else {
        checkPothole(r - 1, c - 1); // UP and LEFT one from clicked tile
        checkPothole(r - 1, c); // UP one from clicked tile
        checkPothole(r - 1, c + 1); // UP and RIGHT one from clicked tile
        checkPothole(r, c - 1); // LEFT one from clicked tile
        checkPothole(r, c + 1); // RIGHT one from clicked tile
        checkPothole(r + 1, c - 1); // DOWN and LEFT one from clicked tile
        checkPothole(r + 1, c); // DOWN one from clicked tile
        checkPothole(r + 1, c + 1); // DOWN and RIGHT one from clicked tile
    }
}

function checkRoadTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
        return 0;
    }
    if (holesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}

// testing only
console.log(holesLocation);
