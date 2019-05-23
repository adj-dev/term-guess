const chalk = require('chalk');
const inquirer = require('inquirer');
const Word = require('./constructors/word.js');

/**
 * Contains a list of all the words and phrases (referred to as terms) used by the game.
 */
const library = [
  'cruising for a bruising',
  'hit the road jack',
  'fair weather friend',
  'inclement weather',
  'jazz',
  'funk',
  'pedal to the metal',
  'shimmy',
  'yard',
  'tool',
  'crazy',
  'funny bone',
  'insidious',
  'challenge',
  'complete',
  'rare',
  'xylophone',
  'climb',
  'dance',
  'billboard',
  'ambiguous',
  'try',
  'ant',
  'win',
  'fin',
  'gin',
  'tin',
  'sin',
  'sentient being',
  'alien',
  'stupendous',
  'random',
  'colour',
  'funny',
  'impressive',
  'the bees knees',
  'new world order',
  'supercalifragilisticexpialidocious',
  'vehicle',
  'summer'
]


/**
 * Pushes to an array 5 randomly selected terms from library array
 */
function createWordList() {
  for (let i = 0; i < 5; i++) {
    wordList.push(getTerm(library));
  }
}



/**
 *  Removes an item from the library array and returns that item as a string.
 */
const getTerm = (arr) => arr.splice(Math.floor(Math.random() * arr.length), 1).toString();



// Define global variable
let round = 1;
let guesses = 10;
let correctGuesses = 0;
let incorrectGuesses = 0;
let hardMode = false;
let wordList = [];
let guessedLetters = [];



// Checks if a letter has already been guessed
function isRepeat(letter) {
  let isGuessed = false;
  guessedLetters.forEach(char => {
    if (char === letter) {
      isGuessed = true;
    }
  });
  return isGuessed;
}



// Initiates a new round
function newRound() {
  // If there are no words left end the game
  if (wordList.length === 0) {
    return endGame(true);
  }

  // Reset the guesses count if in normal mode
  if (!hardMode) {
    guesses = 10;
  }

  // Display the which round it is
  console.log(chalk`\n\n{bold.yellowBright Word ${round}}`);

  // Set up constructor per round
  let word = new Word();
  let term = getTerm(wordList);
  word.anonymize(term);
  word.display();
  promptUser(word);
}

// Prompts the user for a letter
function promptUser(word) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'letterRAW',
        message: 'Guess a letter: ',
        transformer: function (input) {
          if (input.length > 1) {
            return chalk`{bold.red please only enter ONE character at a time.}`;
          }
          if (parseInt(input)) {
            return chalk`{bold.red I highly doubt there's a number in there, use a letter.}`;
          }
          if (input === ' ') {
            return chalk`{bold.red Hitting the space bar definitely won't solve anything.}`;
          }
          if (input.length === 1 && input.search(/([a-z])/i) === -1) {
            return chalk`{bold.red No special characters allowed.}`
          }
          return input;
        }
      }
    ]).then(guess => {
      let { letterRAW } = guess;

      if (letterRAW.length !== 1 || !letterRAW || letterRAW.search(/([a-z])/i) === -1) {
        word.display();
        promptUser(word);
        return;
      }

      // make letter lower case
      let letter = letterRAW.toLowerCase();

      // Check if letter is already guessed
      if (isRepeat(letter)) {
        console.log(chalk`\n{bold.red "${letter}" has already been guessed}`)
        word.display();
        promptUser(word);
        return;
      } else {
        // If not a repeat add it to the list of guessed letters
        guessedLetters.push(letter);
      }


      // Send the guessed letter into guess function. A callback function returns a true or false depending on
      // whether or not the letter was guessed correctly.
      word.guess(letter, correct => {
        if (!correct) {
          guesses -= 1;
          incorrectGuesses++;
          return console.log(chalk`\n{bold.red Incorrect}\n{bold Guesses left: ${guesses}}\n`);
        }
        correctGuesses++;
        return console.log(chalk`\n{bold.green Correct!}`)
      });


      word.display();

      // If out of guesses, lose game
      if (guesses === 0) {
        endGame(false);
        return;
      }

      // start a new round if the word has been completely solved
      if (word.isSolved()) {
        round += 1;
        newRound();
        return;
      }

      promptUser(word);
    }).catch(err => {
      console.log(err);
    });
}

// Ends the game
function endGame(isWon) {
  if (isWon) {
    console.log(chalk`\n\n{bold.green YOU WIN}\n`);
  } else {
    console.log(chalk`\n\n{bold.red YOU LOSE}\n`);
  }
  let accuracy = Math.round((correctGuesses / (correctGuesses + incorrectGuesses)) * 100)
  console.log(chalk`{bold correct guesses: ${correctGuesses}\nincorrect guesses: ${incorrectGuesses}\naccuracy: ${accuracy}%}\n\n`);
}


// Generate the random list of words
createWordList();


// Prompt for hard mode OR normal mode
inquirer
  .prompt([
    {
      type: 'list',
      name: 'mode',
      choices: ['normal', 'difficult'],
      message: chalk`{bold.yellowBright Welcome to Term Guess}`
    }
  ]).then(answer => {
    let { mode } = answer;
    if (mode === 'difficult') {
      hardMode = true;
    }
    newRound()
  }).catch(err => {
    console.log(err)
  });