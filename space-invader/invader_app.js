const grid = document.querySelector(".grid")
const resultDisplay = document.querySelector(".results")
const startButton = document.querySelector(".start-button")
const howToPlayButton = document.querySelector(".how-to-play-button")
const howToPlayWindow = document.querySelector(".how-to-play-window")
const closeButton = document.querySelector(".close-button")
const gameOverMessage = document.querySelector(".game-over-message")

let backToMenuButton = document.querySelector('#back-to-menu');
let currentShooterIndex = 202
const width = 15
const aliensRemoved = []
let invadersId
let isGoingRight = true
let direction = 1
let results = 0

for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div")
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".grid div"))

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader")
        }
    }
}

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader")
    }
}

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter")
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width!== 0) currentShooterIndex -= 1
            break
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            break
    }
    squares[currentShooterIndex].classList.add("shooter")
}

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            isGoingRight = false
        }
    }

    if (leftEdge &&!isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            isGoingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    draw()

    if (squares[currentShooterIndex].classList.contains("invader")) {
        gameOverMessage.innerHTML = "<p>YOU LOSE!</p>";
        gameOverMessage.style.display = "block";
        clearInterval(invadersId)
    }

    if (aliensRemoved.length === alienInvaders.length) {
        gameOverMessage.innerHTML = "<p>YOU WIN!</p>";
        gameOverMessage.style.display = "block";
        clearInterval(invadersId)
    }
}

function startGame() {
    startButton.style.display = "none"
    howToPlayButton.style.display = "none"
    invadersId = setInterval(moveInvaders, 600)
    document.addEventListener("keydown", moveShooter)
    squares[currentShooterIndex].classList.add("shooter")
}

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser")
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add("laser")

        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser")
            squares[currentLaserIndex].classList.remove("invader")
            squares[currentLaserIndex].classList.add("boom")

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultDisplay.innerHTML = results
        }
    }

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100)
    }
    // Update the following lines in the moveInvaders function
    if (squares[currentShooterIndex].classList.contains("invader")) {
        gameOverMessage.innerHTML = "YOU LOSE!"
        gameOverMessage.style.display = "block"
        clearInterval(invadersId)
        showRestartButton()
    }
    // Update the following lines in the moveInvaders function
    if (aliensRemoved.length === alienInvaders.length) {
        gameOverMessage.innerHTML = "YOU WIN!"
        gameOverMessage.style.display = "block"
        clearInterval(invadersId)
        showRestartButton()
    }
}

function restartGame() {
    location.reload();
}

function showRestartButton() {
    const restartButton = document.querySelector(".restart-button")
    restartButton.style.display = "block"
}

// start executing the game
howToPlayButton.addEventListener("click", () => {
    howToPlayWindow.style.display = "block"
})
// Close the "how to play" message window when clicking outside of the box
document.addEventListener("click", function(event) {
    if (!howToPlayWindow.contains(event.target) &&!howToPlayButton.contains(event.target)) {
        howToPlayWindow.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    backToMenuButton.addEventListener('click', () => {
        window.location.href = "../index.html";
    });
    const startButton = document.querySelector('.start-button');
    const restartButton = document.querySelector('.restart-button');

    startButton.addEventListener('click', startGame);
    document.addEventListener('keydown', shoot);
    restartButton.addEventListener('click', restartGame);
});