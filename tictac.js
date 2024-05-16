let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.Reset');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let message = document.querySelector('#mwg');
let winnerBtn = document.querySelector('#new-btn'); // Select the winner button
let turnO = true;

const patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Disable all boxes initially
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// Enable all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.textContent = "";
    }
}

// Reset the game
const reset = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
    winnerBtn.disabled = true; // Disable the winner button
}

// Start a new game
const newGame = () => {
    reset();
    // Additional logic for starting a new game
}

// Check for a winner or draw
const checkWinner = () => {
    for (let pattern of patterns) {
        let pos1 = boxes[pattern[0]].textContent;
        let pos2 = boxes[pattern[1]].textContent;
        let pos3 = boxes[pattern[2]].textContent;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    // Check for draw game
    let isDraw = true;
    for (let box of boxes) {
        if (box.textContent === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        showDraw();
    }
}

// Show the winner message
const showWinner = (winnerValue) => {
    message.textContent = `Congratulations! The winner is ${winnerValue}`;
    msgContainer.classList.remove('hide');
    winnerBtn.disabled = false; // Enable the winner button
};

// Show the draw message
const showDraw = () => {
    message.textContent = "It's a draw!";
    msgContainer.classList.remove('hide');
    winnerBtn.disabled = false; // Enable the winner button
};

// Event listeners for reset and new game buttons
resetBtn.addEventListener('click', reset);
newGameBtn.addEventListener('click', newGame);

// Event listeners for box clicks
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("BOX CLICKED");
        if (turnO) {
            box.textContent = 'O';
            turnO = false;
        } else {
            box.textContent = 'X';
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});
