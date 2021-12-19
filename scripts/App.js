// Set up board and tiles
const boardElment = document.getElementById("board")

const tileObj = () => {
    let marked = false
    let mark

    return {marked, mark}
}

for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div")
    tile.id = "tile"
    boardElment.appendChild(tile)
}