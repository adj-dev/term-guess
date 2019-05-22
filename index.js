const inquirer = require('inquirer');
const Word = require('./constructors/word.js');

/**
 * Contains a list of all the words and phrases (referred to as terms) used by the game.
 */
const library = [
  'cruising for a bruising',
  'hit the road jack',
  'fairweather friend',
  'inclement weather',
  'jazz',
  'funk',
  'pedal to the metal'
]


/**
 *  Removes an item from the library array and returns that item as a string.
 */
const getTerm = () => library.splice(Math.floor(Math.random() * library.length), 1).toString();



let round = 1;
let guesses;

/**
 * Initiates a new round
 * 
 * @param {*} term Random word from `library` array
 */
function newRound() {
  // If there are no words left end the game
  if (library.length === 0) {
    return endGame();
  }

  guesses = 10;

  console.log(`\n\nRound ${round}`);

  let word = new Word();
  let term = getTerm();
  word.anonymize(term);
  word.display();
  promptUser(word);
}


function promptUser(word) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'letter',
        message: 'Guess a letter: '
      }
    ]).then(guess => {
      let { letter } = guess;

      word.guess(letter);
      word.display();

      if (word.isSolved()) {
        console.log('Nice Work!');
        round += 1;
        newRound();
        return;
      }

      promptUser(word);
    }).catch(err => {
      console.log(err);
    });
}


function endGame() {
  console.log("\n\nCongratulations... you've won!\n\n")
}


newRound();