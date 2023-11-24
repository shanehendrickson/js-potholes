export class GameManager {
    constructor() {
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
}