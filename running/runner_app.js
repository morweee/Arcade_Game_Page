let spaceship = document.querySelector('.spaceship');
let obstacle = document.querySelector('.obstacle');
let obstacle_small = document.querySelector('.obstacle_small');
let obstacle_large = document.querySelector('.obstacle_large');
let gameContainer = document.getElementById('gameContainer');
let startButton = document.getElementById("startButton");
let backToMenuButton = document.querySelector('#back-to-menu');
let howToPlayButton = document.getElementById("howToPlayButton");
let howToPlayMessage = document.getElementById("howToPlayMessage");
let gameInterval;
let spaceshipJumping = false;
let gameStarted = false;
let curr_score = 0;

function startGame() {
    // Start all animations
    start_animation();
    gameStarted = true;
    gameContainer.addEventListener("click", jump_click);
    document.addEventListener("keydown", jump_space);
    gameInterval = setInterval(checkCollision, 20);
    startButton.style.display = 'none';
    howToPlayButton.style.display = 'none';
}

function showHowToPlayMessage() {
    howToPlayMessage.style.display = "block";
}

function jump_space(event) {
    if (event.code !== "Space" || spaceshipJumping) return;
    // console.log("enter jump")
    if (spaceship.classList != "jump") spaceship.classList.add("jump");
    setTimeout(function(){
        spaceship.classList.remove("jump");
        spaceshipJumping = false;
    }, 500);
}

function jump_click() {
    if (spaceshipJumping) return;
    // console.log("enter jump")
    if (spaceship.classList != "jump") spaceship.classList.add("jump");
    setTimeout(function(){
        spaceship.classList.remove("jump");
        spaceshipJumping = false;
    }, 500);
}

function stop_animation(){
    // function to stop/pause all animation
    obstacle.classList.remove("start_moving");
    obstacle_small.classList.remove("start_moving");
    obstacle_large.classList.remove("start_moving");

    obstacle.classList.add("stop_moving");
    obstacle_small.classList.add("stop_moving");
    obstacle_large.classList.add("stop_moving");
}

function start_animation(){
    // function to start all animation
    obstacle.classList.remove("stop_moving");
    obstacle_small.classList.remove("stop_moving");
    obstacle_large.classList.remove("stop_moving");
    
    obstacle.classList.add("start_moving");
    obstacle_small.classList.add("start_moving");
    obstacle_large.classList.add("start_moving");
}

function gameOver(){
    // after game over, provide option(s) for users
    function restartGame() {
        location.reload();
    }
    stop_animation();
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.classList.add('button');
    playAgainButton.addEventListener('click', restartGame);

    const restart = document.getElementById('restart');
    restart.appendChild(playAgainButton);
}

function checkCollision() {
    if (!gameStarted) return ;
    // get the positions of each object
    let spaceshipRect = spaceship.getBoundingClientRect();
    let small_obstacleRect = obstacle_small.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    let large_obstacleRect = obstacle_large.getBoundingClientRect();

    // add offsets to the spaceship rectangle for transparent edges
    const OFFSET = { top: 10, right: 10, bottom: 10, left: 10 };
    spaceshipRect = {
        top: spaceshipRect.top + OFFSET.top,
        right: spaceshipRect.right - OFFSET.right,
        bottom: spaceshipRect.bottom - OFFSET.bottom,
        left: spaceshipRect.left + OFFSET.left
    };

    // Check if the rectangles overlap
    if (
        (small_obstacleRect.left < spaceshipRect.right &&
        small_obstacleRect.right > spaceshipRect.left &&
        small_obstacleRect.top < spaceshipRect.bottom &&
        small_obstacleRect.bottom > spaceshipRect.top) ||
        (obstacleRect.left < spaceshipRect.right &&
        obstacleRect.right > spaceshipRect.left &&
        obstacleRect.top < spaceshipRect.bottom &&
        obstacleRect.bottom > spaceshipRect.top) ||
        (large_obstacleRect.left < spaceshipRect.right &&
        large_obstacleRect.right > spaceshipRect.left &&
        large_obstacleRect.top < spaceshipRect.bottom &&
        large_obstacleRect.bottom > spaceshipRect.top)) {
            // pop out game over message, clear timer, and everything stop moving
            document.getElementById("gameOverMessage").style.display = "block";
            clearInterval(gameInterval);
            gameOver();
            return;
    }
    // keep incrementing the score while not colliding with the obstacles
    curr_score = curr_score + 1;
    document.getElementById('score').textContent = `Score: ${curr_score}`;
} 

// game-executing section
stop_animation();
howToPlayButton.addEventListener("click", showHowToPlayMessage);
// Close the "how to play" message window when clicking outside of the box
document.addEventListener("click", function(event) {
    if (!howToPlayMessage.contains(event.target) &&!howToPlayButton.contains(event.target)) {
        howToPlayMessage.style.display = "none";
    }
});
startButton.addEventListener("click", startGame);
document.addEventListener('DOMContentLoaded', () => {
    backToMenuButton.addEventListener('click', () => {
        window.location.href = "../index.html";
    });
});