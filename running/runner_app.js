let spaceship = document.getElementById('spaceship');
let obstacle = document.getElementById('obstacle');
let gameContainer = document.getElementById('gameContainer');
let spaceshipJumping = false;

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

document.body.addEventListener("click", jump_click);
document.body.addEventListener("keydown", jump_space);


function checkCollision() {
    let spaceshipRect = spaceship.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    const OFFSET = { top: 10, right: 10, bottom: 10, left: 10 };

    // Adjust the spaceship rectangle for transparent edges
    spaceshipRect = {
        top: spaceshipRect.top + OFFSET.top,
        right: spaceshipRect.right - OFFSET.right,
        bottom: spaceshipRect.bottom - OFFSET.bottom,
        left: spaceshipRect.left + OFFSET.left
    };

    // Check if the rectangles overlap
    if (
        obstacleRect.left < spaceshipRect.right &&
        obstacleRect.right > spaceshipRect.left &&
        obstacleRect.top < spaceshipRect.bottom &&
        obstacleRect.bottom > spaceshipRect.top
    ) {
        alert("Collide!");
    }
}

let gameInterval = setInterval(checkCollision, 30);


