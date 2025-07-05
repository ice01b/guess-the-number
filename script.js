let targetNumber;
let attemptsLeft = 10;
let timer = 30;
let gameInterval;
let countdownInterval;

const range = document.getElementById('range');
const attemptsDisplay = document.getElementById('attempts');
const timerDisplay = document.getElementById('timer');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-guess');
const feedback = document.getElementById('feedback');
const restartButton = document.getElementById('restart-button');

function startGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    attemptsLeft = 10;
    timer = 30;
    range.textContent = `1 and 100`;

    attemptsDisplay.textContent = attemptsLeft;
    timerDisplay.textContent = timer;
    feedback.textContent = '';

    // Start countdown timer
    countdownInterval = setInterval(updateTimer, 1000);

    // Reset game state
    restartButton.classList.add('hidden');
    guessInput.disabled = false;
    submitButton.disabled = false;
}

function updateTimer() {
    if (timer <= 0) {
        clearInterval(countdownInterval);
        endGame(false);
    } else {
        timer--;
        timerDisplay.textContent = timer;
    }
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess)) {
        feedback.textContent = 'Please enter a valid number!';
        return;
    }

    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;

    if (userGuess === targetNumber) {
        clearInterval(countdownInterval);
        endGame(true);
    } else if (userGuess > targetNumber) {
        feedback.textContent = 'Too high! Try again.';
    } else {
        feedback.textContent = 'Too low! Try again.';
    }

    if (attemptsLeft === 0) {
        clearInterval(countdownInterval);
        endGame(false);
    }

    guessInput.value = '';
}

function endGame(isWinner) {
    guessInput.disabled = true;
    submitButton.disabled = true;

    if (isWinner) {
        feedback.textContent = 'Congratulations, You guessed the number! 🎉';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Game Over! You ran out of attempts or time. 😢';
        feedback.style.color = 'red';
    }

    restartButton.classList.remove('hidden');
}

submitButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', startGame);

// Start the game when the page loads
startGame();
