/**
 * Takes a letter of a word and stores it as its own class.
 * Can then be used to call methods on each "letter" in order
 * to streamline the applications purpose.
 * @param {*} char Represents the letter of a word to guess
 */
function Letter(char) {
  this.char = char;
  this.discovered = false;

  this.checkGuess = function (char) {
    if (char === this.char) {
      this.discovered = true;
      return;
    }
    return;
  }

  this.display = function () {
    // accomodate for spaces
    if (this.char === ' ') {
      this.discovered = true;
      return '  ';
    }
    if (this.discovered) {
      return `${char} `;
    }
    return '_ ';
  }
}



module.exports = Letter;