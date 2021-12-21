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


// make a list of all dom tiles
let tileDom = [t1, t2, t3, t4, t5, t6, t7, t8, t9]
let tileObjArr = []
// Create a tile Object
// will let us mark tiles
const tileObj = (dom) => {
    let marked = false
    const setMark = (strMark) => {
        dom.innerHTML = strMark
    };

    return {dom, marked, setMark}
}

// Loop through and assign 
// each dom tile to a tile object
for (let i = 0; i < tileDom.length; i++) {
    let newObj = tileObj(tileDom[i])
    tileObjArr.push(newObj)
} 

// loop through and add an event listener to each
// tile

for (let i = 0; i < tileObjArr.length; i++) {
    tileObjArr[i].dom.addEventListener("click", function() {
        tileObjArr[i].setMark("x")
        tileObjArr[i].marked = true;
    });
}

let winningTable = [[true, true, true, false, false, false, false, false, false],
                    [false, false, false, true, true, true, false, false, false],
                    [false, false, false, false, false, false, true, true, true],
                ]
