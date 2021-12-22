// Set up board and tiles
const boardElment = document.getElementById("board")

const t1 = document.getElementById("t1")
const t2 = document.getElementById("t2")
const t3 = document.getElementById("t3")
const t4 = document.getElementById("t4")
const t5 = document.getElementById("t5")
const t6 = document.getElementById("t6")
const t7 = document.getElementById("t7")
const t8 = document.getElementById("t8")
const t9 = document.getElementById("t9")

let unbeatable = false
let play = true

const winningTable = [
                    [   true, true, true, 
                        false, false, false, 
                        false, false, false
                    ],
                    [   false, false, false, 
                        true, true, true, 
                        false, false, false
                    ],
                    [   false, false, false, 
                        false, false, false, 
                        true, true, true
                    ],
                    [   true, false, false, 
                        true, false, false, 
                        true, false, false
                    ],
                    [   false, true, false, 
                        false, true, false, 
                        false, true, false
                    ],
                    [   false, false, true, 
                        false, false, true, 
                        false, false, true
                    ],
                    [   true, false, false, 
                        false, true, false, 
                        false, false, true
                    ],
                    [   false, false, true, 
                        false, true, false, 
                        true, false, false
                    ],
                ]

// make a list of all dom tiles and object tiles
let tileDom = [t1, t2, t3, t4, t5, t6, t7, t8, t9]
let tileObjArr = []

// Create a tile Object which
// will let us mark tiles
const tileObj = (dom) => {
    let marked = false
    const setMark = (strMark) => {
        if (!marked)
            dom.innerHTML = strMark
    };
    const checkMarked = () => {
        return marked
    }
    return {dom, marked, setMark, checkMarked}
}

// Loop through and make 
// each dom tile into a tile object
for (let i = 0; i < tileDom.length; i++) {
    let newObj = tileObj(tileDom[i])
    tileObjArr.push(newObj)
} 

// Gameboard module
const gameBoard = (() => {
    // loop through all tiles and compare
    // marks to winning lookup table
    const check = (str) => {
        for (let i = 0; i < winningTable.length; i++) {
            let won = true
            let winningTiles = []
            for (let j = 0; j < winningTable[i].length; ++j) {
                if (winningTable[i][j]) {
                    if (j >= winningTable[i].length) {break}

                    let correctMark = false;
                    if (tileObjArr[j].marked && tileObjArr[j].dom.innerHTML == str) {
                        correctMark = true;
                        winningTiles.push(tileObjArr[j])
                    }
                    if (winningTable[i][j] == true && !correctMark) {
                        won = false;
                        winningTiles.length = 0
                        break
                    }
                }
            }   
            if (won) {
                console.log(str + "WON")
                play = false
                winningTiles.forEach((elem) => {elem.dom.style.color = "red"})
                break;
            }

            winningTiles.length = 0

        };
    };

    // check if there are empty spaces left on the board
    const emptySpace = () => {
        for (let i = 0; i < tileObjArr.length; i++) {
            if (!tileObjArr[i].marked) {
                return true;
            }
        }
        return false;
    }

    // computer turn
    const cpuTurn = () => {
        // random logic
        if (!unbeatable) { 
            let random = Math.floor(Math.random() * 9)
            while(tileObjArr[random].marked) {
                random = Math.floor(Math.random() * 9)
            }
            tileObjArr[random].setMark("o")
            tileObjArr[random].marked = true;
        }
    }; 

    return {play, check, cpuTurn, emptySpace}  
})();

// loop through and add a
// click event listener to each tile
for (let i = 0; i < tileObjArr.length; i++) {
    tileObjArr[i].dom.addEventListener("click", function() {
        if (tileObjArr[i].marked == false && play) {
            tileObjArr[i].setMark("x")
            tileObjArr[i].marked = true;
            gameBoard.check.apply(null, ["x", "o"])

            if (gameBoard.emptySpace() && play) {
                gameBoard.cpuTurn();
                gameBoard.check.apply(null, ["o", "x"])
                
            }

            if (!gameBoard.emptySpace()) {
                gameBoard.check.apply(null, ["o", "x"])
                
                if (play) {
                    play = false
                    console.log("TIE")
                }
            }
            
        }
    });
}

// TODO
// ADD UNBEATABLE PLAYER
