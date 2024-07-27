document.addEventListener('DOMContentLoaded', () => {
    const words = ["UNITEDKINGDOM", "FRANCE", "GERMANY", "ITALY", "SPAIN", "INDIA", "AUSTRALIA"];
    const maxLives = 5;
    let lives = maxLives;
    let selectedWord = '';
    let guessedLetters = [];
    const lifeBar = document.getElementById('life-bar');
    const wordContainer = document.getElementById('word-container');
    const keyboard = document.getElementById('keyboard');
    const resetButton = document.getElementById('reset-button');

    function initGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = [];
        lives = maxLives;
        displayWord();
        setupKeyboard();
        updateLives();
    }

    function displayWord() {
        wordContainer.innerHTML = '';
        for (const char of selectedWord) {
            const letterElement = document.createElement('div');
            letterElement.classList.add('letter');
            if (guessedLetters.includes(char)) {
                letterElement.textContent = char;
                letterElement.classList.add('filled');
            } else {
                letterElement.textContent = '_';
            }
            wordContainer.appendChild(letterElement);
        }
    }

    function setupKeyboard() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        keyboard.innerHTML = '';
        for (const char of alphabet) {
            const keyElement = document.createElement('div');
            keyElement.classList.add('key');
            keyElement.textContent = char;
            keyElement.addEventListener('click', () => handleGuess(char));
            keyboard.appendChild(keyElement);
        }
    }

    function handleGuess(char) {
        if (guessedLetters.includes(char) || lives === 0) {
            return;
        }
        guessedLetters.push(char);
        if (!selectedWord.includes(char)) {
            lives--;
            updateLives();
        }
        displayWord();
        checkGameOver();
    }

    function updateLives() {
        const lifeBarInner = document.createElement('div');
        lifeBarInner.classList.add('life-bar-inner');
        lifeBarInner.style.width = `${(lives / maxLives) * 100}%`;
        lifeBar.innerHTML = '';
        lifeBar.appendChild(lifeBarInner);
    }

    function checkGameOver() {
        if (lives === 0) {
            alert('Game Over! The word was: ' + selectedWord);
            disableKeyboard();
        } else if (selectedWord.split('').every(char => guessedLetters.includes(char))) {
            alert('Congratulations! You guessed the word!');
            disableKeyboard();
        }
    }

    function disableKeyboard() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => key.removeEventListener('click', handleGuess));
    }

    resetButton.addEventListener('click', initGame);

    initGame();
});
