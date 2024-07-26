const words = ["UNITEDKINGDOM", "FRANCE", "GERMANY", "ITALY", "SPAIN", "INDIA", "AUSTRALIA"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const wordContainer = document.getElementById('word-container');
const keyboard = document.getElementById('keyboard');

function displayWord() {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = ''; // Clear previous content

    selectedWord.split('').forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.classList.add('letter-box');
        
        if (guessedLetters.includes(letter)) {
            letterElement.innerHTML = letter;
            letterElement.classList.add('guessed'); 
        } else {
            letterElement.innerHTML = '&nbsp;'; 
        }
        
        wordContainer.appendChild(letterElement);
    });
}

function generateKeyboard() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.classList.add('key');
        button.innerText = letter;
        button.setAttribute('key', letter);
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter) {
    guessedLetters.push(letter);
    const button = document.querySelector(`button[key="${letter}"]`);
    if (button) {
        button.disabled = true;
    }
    if (selectedWord.indexOf(letter) >= 0) {
        displayWord();
        checkWin();
    } else {
        mistakes++;
        checkLoss();
    }
}

function checkWin() {
    if (selectedWord.split('').every(letter => guessedLetters.indexOf(letter) >= 0)) {
        setTimeout(() => alert('Congratulations! You won!'), 100);
        resetGame();
    }
}

function checkLoss() {
    if (mistakes >= maxMistakes) {
        setTimeout(() => alert(`Sorry, you lost! The word was ${selectedWord}`), 100);
        resetGame();
    }
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    displayWord();
    keyboard.innerHTML = ''; 
    generateKeyboard();
}

displayWord();
generateKeyboard();
