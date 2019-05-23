# Term Guess
A word and phrase guessing game that runs in Terminal. Fun for folks of all ages. 

## Installation

In order to play __Term Guess__ it must first be cloned onto your local machine. Open the Terminal or GitBash and navigate to wherever you'd like __Term Guess__ to live. Run `git clone git@github.com:adj-dev/term-guess.git` and then `cd term-guess`. Now that you're in a position to play, let's go over how to play.

## Gameplay

To initiate, run `node index.js` and select a game mode: __normal__ or __difficult__. In the normal mode you will be allowed 10 incorrect guesses per _word_. In the difficult mode you will be allowed 10 incorrect guesses per _round_. A round consists of 5 words/phrases. If you run out of allowable incorrect guesses before the round is over, you will lose the game. After a round is either won or lost the following stats will be displayed for the user: total correct guesses, total incorrect guesses, and accuracy percentage. 


## Input Validation

__Term Guess__ will not take in more than 1 character at a time. It will notify you of incorrect input in the following circumstances:
  1. More than 1 character
  2. A number is typed
  3. A special character is typed
  4. A space is typed

If you submit an input under any of these circumstances __Term Guess__ will ignore your input and you're score will not change. 


