var height = 6; // number of guesses
var width = 5;  // length of the word

var row = 0; // current guess (attempt #)
var col = 0; // current letter for that attempt
var gameOver = false;

// Word list (you can expand this)
var words = ["SQUID", "CRANE", "APPLE", "WATER", "MOUSE", "TRAIN", "PLANT", "BRAIN", "CLOUD", "SHINE"];

// Pick a random word
var word = words[Math.floor(Math.random() * words.length)];

window.onload = function () {
    initialize();
};

function initialize() {
    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3]; // take last letter (A-Z)
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (col > 0) {
                col -= 1;
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                currTile.innerText = "";
            }
        }
        else if (e.code == "Enter") {
            if (col == width) {  // only allow if row is full
                update();
                row += 1; // Start new row
                col = 0;
            }
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = "Answer: " + word;
        }
    });
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        }
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        }
        else {
            currTile.classList.add("absent");
        }
    }

    if (correct == width) {
        gameOver = true;
        document.getElementById("answer").innerText = "You got it! 🎉 The word was " + word;
    }
}

