// Set up board and tiles
const boardElment = document.getElementById("board")
const restart = document.getElementById("restart")

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
                    let correctMark = false;
                    if (tileObjArr[j].marked && tileObjArr[j].dom.innerHTML == str) {
                        correctMark = true;
                        winningTiles.push(tileObjArr[j])
                    }
                    if (!correctMark) {
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
                restartIcon()
                break
            }

            winningTiles.length = 0

        };
    };
    
    // have the restart button appear
    const restartIcon = () => {
        restart.style.display = "inline"
        restart.classList.add("fade-in-text")
        restart.addEventListener("click", function() {
            clear()
        })
    }

    // clear the gameboard
    const clear = () => {
        play = true
        restart.style.display = "none"
        restart.classList.remove("fade-in-text")

        tileObjArr.forEach((elem) => {
            elem.marked = false
            elem.dom.innerHTML = ""
            elem.dom.style.color = "black"
        })
    }

    // check if there are empty spaces left on the board
    const emptySpace = () => {
        let spaces = 0
        let avalaible = []
        for (let i = 0; i < tileObjArr.length; i++) {
            if (!tileObjArr[i].marked) {
                spaces++;
                avalaible.push(tileObjArr[i])
            }
        }
        return {spaces, avalaible};
    }

    // computer turn
    const cpuTurn = () => {
        // random logic
        const random = () => { 
            let random = Math.floor(Math.random() * 9)
            while(tileObjArr[random].marked) {
                random = Math.floor(Math.random() * 9)
            }
            tileObjArr[random].setMark("o")
            tileObjArr[random].marked = true;
        }

        const better = () =>  {
            for (let i = 0; i < winningTable.length; i++) {
                let winningTiles = []
                for (let j = 0; j < winningTable[i].length; ++j) {
                    if (winningTable[i][j]) {
                        let correctMark = false;
                        if (tileObjArr[j].marked && tileObjArr[j].dom.innerHTML == "o") {
                            correctMark = true;
                            winningTiles.push(tileObjArr[j])
                        }
                    }
                } 
                console.log(winningTiles.length)
                if (winningTiles.length == 2) {
                    for (let n = 0; n < winningTable[i].length; ++n) {
                        if (winningTable[i][n]) {
                            if (!tileObjArr[n].marked) {
                                console.log("Found winning move")
                                tileObjArr[n].setMark("o")
                                tileObjArr[n].marked = true;
                                return
                            }
                        }
                    }
                }
                else {
                    winningTiles.length = 0
                }  
            };
            random()
        }

        return {random, better}
    }; 

    return {play, check, cpuTurn, emptySpace, restartIcon}  
})();


// loop through and add a
// click event listener to each tile
for (let i = 0; i < tileObjArr.length; i++) {
    tileObjArr[i].dom.addEventListener("click", function() {
        if (tileObjArr[i].marked == false && play) {
            tileObjArr[i].setMark("x")
            tileObjArr[i].marked = true;
            gameBoard.check.apply(null, ["x", "o"])

            if (gameBoard.emptySpace().spaces > 0 && play) {
                gameBoard.cpuTurn().better();
                gameBoard.check.apply(null, ["o", "x"])
                
            }

            if (gameBoard.emptySpace().spaces == 0) {
                gameBoard.check.apply(null, ["o", "x"])
                
                if (play) {
                    play = false
                    gameBoard.restartIcon()
                    console.log("Tie")
                }
            }
            
        }
    });
}

// TODO
// ADD UNBEATABLE PLAYER
