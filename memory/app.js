document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];
    let lockBoard = false;
    let gameStarted = false;
    let gameOver = false;
    let timer = 120;
    let timerInterval;
  
    const cardArray = [
      { name: 'Earth', img: 'memory_img/earth.jpg' },
      { name: 'venus', img: 'memory_img/venus.jpg' },
      { name: 'Moon', img: 'memory_img/moon.jpg' },
      { name: 'Liargon', img: 'memory_img/liargon.jpg' },
      { name: 'Saturn', img: 'memory_img/saturn.jpg' },
      { name: 'Sun', img: 'memory_img/sun.jpg' },
      { name: 'Death Star', img: 'memory_img/death_star.jpg' },
      { name: 'Jupyter', img: 'memory_img/jupyter.jpg' },
    ];
  
    // shuffle the order of the images in each grid for every game
    let entire_shuffled_card = cardArray.concat(cardArray);
    for (let i = entire_shuffled_card.length - 1; i > 0; i--) {
        const j = Math.random() * (i + 1);
        const rand_num = Math.floor(j);
        exchanged_pos = [entire_shuffled_card[rand_num], entire_shuffled_card[i]];
        [entire_shuffled_card[i], entire_shuffled_card[rand_num]] = exchanged_pos;
    }

    // Create the game
    function createBoard() {
        for (let i = 0; i < entire_shuffled_card.length; i++) {
          const card = document.createElement('div');
          card.setAttribute('data-id', i);
          card.style.backgroundImage = 'url(memory_img/unfound.jpg)';
          card.addEventListener('click', flipCard);
          grid.appendChild(card);
        }
    }

    // start game button: set gameStarted to true and start the countdown
    document.getElementById('start-game').addEventListener('click', () => {
        gameStarted = true;
        showMessage("The game has started! Find all matching pairs before the time is up!");
        document.getElementById('start-game').style.display = 'none';
        startTimer();
    });

    function startTimer() {
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (gameOver) clearInterval(timerInterval);
        timer--;
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timer === 0) {
            gameOver = true;
            clearInterval(timerInterval);
            showMessage('Time\'s up! Game over.');
            showEndButtons();
        }
      }, 1000);
    }

    // "Back to Menu" button
    const backToMenuButton = document.querySelector('#back-to-menu');
    backToMenuButton.addEventListener('click', () => {
      window.location.href = "../index.html";
    });

    // after game over, provide option(s) for users
    function restartGame() {
        location.reload();
    }
    function showEndButtons() {
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.classList.add('button');
        playAgainButton.addEventListener('click', restartGame);

        const buttonContainer = document.getElementById('button-container');
        buttonContainer.appendChild(playAgainButton);
    }

    // show message to inform users, then hide after shown
    function showMessage(text) {
        const messageOverlay = document.getElementById('message-overlay');
        const messageText = document.getElementById('message-text');
        messageText.textContent = text;
        messageOverlay.style.display = 'block';
        setTimeout(hideMessage, 2000); 
    }
    function hideMessage() {
        const messageOverlay = document.getElementById('message-overlay');
        messageOverlay.style.display = 'none';
    }
  
    // Check for matching pairs
    function checkForMatch() {
        const cards = document.querySelectorAll('.grid div');
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];
        let same = true;

        // Prevent the same card from being flipped again
        if (optionOneId === optionTwoId) {
            showMessage('Same location was observed! Try clicking on another one');
            cards[optionOneId].style.backgroundImage = 'url(memory_img/unfound.jpg)';
        }
        
        // if user get a matched pair
        else if (cardsChosen[0] === cardsChosen[1]) {
            showMessage(`Discovered: ${cardsChosen[0]}!`);
            lockBoard = true;
            cards[optionOneId].style.visibility = 'hidden';
            cards[optionTwoId].style.visibility = 'hidden';
            cardsWon.push(cardsChosen);

            // Update the score display and the discovered planets on the right
            let curr_score = cardsWon.length;
            document.getElementById('score').textContent = `Discovered: ${curr_score}`;

            const matchedPairsContainer = document.getElementById('matched-pairs');
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', entire_shuffled_card[cardsChosenIds[0]].img);
            matchedPairsContainer.appendChild(imgElement);
        } 
        // if user get an unmatched pair
        else {
            lockBoard = true; // lock the board to block user's next attempt until this attept is done
            // transition animation to hide cards
            cards[optionOneId].style.transition = 'background-image 3s';
            cards[optionOneId].style.backgroundImage = 'url(memory_img/unfound.jpg)';
            cards[optionTwoId].style.transition = 'background-image 3s';
            cards[optionTwoId].style.backgroundImage = 'url(memory_img/unfound.jpg)';
            same = false;
            setTimeout(() => {
                cards[optionOneId].style.transition = '';
                cards[optionTwoId].style.transition = '';
            }, 3000);
        }

        // clear the current attempt
        cardsChosen = [];
        cardsChosenIds = [];
        
        // check if game over
        if (cardsWon.length === (cardArray.length)) {
            gameOver = true;
            showMessage('All planets are found! Finished Observation...');
            showEndButtons();
        }

        // only a 3-second transition effect is applied when get an unmatched pair
        // need to wait until the effect is done to unlock the board
        if (same === false){
            setTimeout(() => {
                lockBoard = false;
            }, 3000);
        }
        // other situations: user can proceed to the next attempt instantly
        else {
            lockBoard = false;
        }
    }

    // Flip card function
    function flipCard() {
        if (!gameStarted) {
            showMessage("Click the \"Start the countdown\" button on the left to start!")
        }
        if (!gameStarted || lockBoard || gameOver) return; 
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(entire_shuffled_card[cardId].name);
        cardsChosenIds.push(cardId);
        if (cardsChosenIds.length === 2) lockBoard = true;
        this.style.backgroundImage = `url(${entire_shuffled_card[cardId].img})`;
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // execute the game
    createBoard();
    
});