const path = require('path');
const fs = require('fs');
const _ = require('lodash');

// test input:
/*
10 players; last marble is worth 1618 points: high score is 8317
13 players; last marble is worth 7999 points: high score is 146373
17 players; last marble is worth 1104 points: high score is 2764
21 players; last marble is worth 6111 points: high score is 54718
30 players; last marble is worth 5807 points: high score is 37305
*/
// Input: 468 players; last marble is worth 71843 points

const getHighScore = (players, numMarbles) => {
  let marbles = [];
  let scores = [];
  for (let i = 0; i < players; i++) {
    scores[i] = 0;
  }

  // while (marbleScore < numMarbles) {
  //   // if it's a multiple of 23
  //   if (marbleCounter % 23 === 0) {
  //     // Player keeps marble and adds to score
  //     scores[currentPlayer] += marbleCounter;
  //     // Player removes marble 7 counter clockwise and adds to score

  //   }


  //   marbleCounter++;
  //   currentPlayer++;
  // }



  // just for testing
  let currentMarble = 0;
  let currentPlayer = 0;
  for (let i = 0; i <= numMarbles; i++) {

    // Simplify the first few inserts
    if (marbles.length === 0) {
      marbles = [i];
      currentMarble = 0;
    } else if (marbles.length === 1) {
      marbles.push(i);
      currentMarble = 1;
    } else if (marbles.length === 2) {
      marbles.splice(1, 0, i);
      currentMarble = 1;
    } else {
      // However, if the marble that is about to be placed has a number which is a multiple of 23, something entirely different happens.
      if (i % 23 === 0) {
        // Add marble to score instead of adding to the array
        scores[currentPlayer] += i;
        let indexOfMarbleToRemove = currentMarble - 7;
        if (indexOfMarbleToRemove < 0) {
          indexOfMarbleToRemove = marbles.length + indexOfMarbleToRemove;
        }
        // Also add the marble 7 to the left
        scores[currentPlayer] += marbles[indexOfMarbleToRemove];
        marbles.splice(indexOfMarbleToRemove, 1);
        // The marble located immediately clockwise of the marble that was removed becomes the new current marble.
        currentMarble = indexOfMarbleToRemove;
      } else {
        // Add marble
        let newIndex = currentMarble + 2;
        if (newIndex === marbles.length) {
          marbles.push(i);
          currentMarble = marbles.length - 1;
        } else if (newIndex > marbles.length) {
          newIndex = newIndex - marbles.length;
          marbles.splice(newIndex, 0, i);
          currentMarble = newIndex;
        } else if (newIndex < 0) {
          newIndex = marbles.length - newIndex;
          marbles.splice(newIndex, 0, i);
          currentMarble = newIndex;
        } else {
          marbles.splice(newIndex, 0, i);
          currentMarble = newIndex;
        }
      }
    }

    // const printString = marbles.reduce((str, num, idx) => {
    //   if (idx === currentMarble) {
    //     str += ' (' + num + ') ';
    //   } else {
    //     str += ' ' + num + ' ';
    //   }
    //   return str;
    // }, '');
    // console.log(printString);

    currentPlayer++;
    if (currentPlayer === players) {
      currentPlayer = 0;
    }
  }

  return Math.max(...scores);
}

// This should pass by reference and update marbles but it's not for some reason
// const insertMarble = (marbles, currentMarble, offset, value) => {

// };

// console.log(getHighScore(9, 25), 'should be 32');
// console.log(getHighScore(10, 1618), 'should be 8317');
// console.log(getHighScore(13, 7999), 'should be 146373');
// console.log(getHighScore(17, 1104), 'should be 2764');
// console.log(getHighScore(21, 6111), 'should be 54718');
// console.log(getHighScore(30, 5807), 'should be 37305');
console.log(getHighScore(468, 71843));

