const Letter = require('./letter.js');


function Word() {
  this.word = '';
  this.letters = [];

  this.anonymize = function (word) {
    [...word].forEach(char => this.letters.push(new Letter(char)));
  }

  this.display = function () {
    if (this.letters.length !== 0) {
      this.word = '';
      this.letters.forEach(char => this.word += char.display());
      console.log(`\n${this.word}`);
    }
  }

  this.guess = function (letter, callback) {
    let correct = false;
    this.letters.forEach(char => {
      let isCorrect = char.checkGuess(letter)
      if (isCorrect) {
        correct = true;
      }
    });
    callback(correct);
  }

  // Iterates through each Letter and returns true if all are guessed
  this.isSolved = function () {
    let solved = true;
    this.letters.forEach(char => {
      if (!char.discovered) {
        solved = false;
      }
    });
    return solved;
  }
}



module.exports = Word;