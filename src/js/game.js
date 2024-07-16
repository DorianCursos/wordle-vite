import { gameBoardElement } from './dom';

const ALL_WORDS = ['cosa'];
const NUMBER_OF_TRIES = 5;

let secretWord;
let currentRow = 0;

const chooseSecretWord = () => {
  const randomNumber = Math.floor(Math.random() * ALL_WORDS.length);
  secretWord = ALL_WORDS[randomNumber];
  console.log(secretWord);
};

const createGameBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('game-board__row');

    for (let j = 0; j < secretWord.length; j++) {
      const newLetterContainer = document.createElement('span');
      newLetterContainer.classList.add('letter');
      newRow.append(newLetterContainer);
    }

    fragment.append(newRow);
  }

  gameBoardElement.append(fragment);
};

const printLetter = (letter, position, className) => {
  const letterContainer = gameBoardElement.children[currentRow].children[position];
  letterContainer.textContent = letter;
  if (!letterContainer.classList.contains('letter--correct')) {
    letterContainer.classList.add(className);
  }
};

const checkWord = userWord => {
  let className;
  let wordToCheck = secretWord;

  for (let i = 0; i < userWord.length; i++) {
    const letter = userWord[i];
    if (letter === secretWord[i]) {
      className = 'letter--correct';
      wordToCheck = wordToCheck.replace(letter, '-');
      printLetter(letter, i, className);
    }
  }

  for (let i = 0; i < userWord.length; i++) {
    const letter = userWord[i];
    if (wordToCheck.includes(letter)) {
      className = 'letter--present';
      wordToCheck = wordToCheck.replace(letter, '-');
    } else {
      className = 'letter--incorrect';
    }
    printLetter(letter, i, className);
  }

  currentRow++;
};

const startGame = () => {
  chooseSecretWord();
  createGameBoard();
};

export { startGame };
