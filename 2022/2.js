const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, './inputs/2.txt'), 'utf8');

const testInputString = `A Y
B X
C Z`;

/*
Rock: A X: 1
Paper: B Y: 2
Scissors: C Z: 3
*/
const convertSimplicity = (char) => {
  if (['A', 'X'].includes(char)) {
    return 1;
  }
  if (['B', 'Y'].includes(char)) {
    return 2;
  }
  if (['C', 'Z'].includes(char)) {
    return 3;
  }
};

const processInputString = (str) => str.split('\n')
  .map((line) => ({
    call: convertSimplicity(line.split(' ')[0]),
    resp: convertSimplicity(line.split(' ')[1]),
  }));

const getScore = (str) => {
  const moves = processInputString(str);
  return moves.reduce((sum, { call, resp }) => 
    sum + resp + getGameScore(call, resp)
  , 0);
}

const getGameScore = (call, resp) => {
  const lose = 0;
  const tie = 3;
  const win = 6;
  if (call === resp) {
    return tie;
  }
  if (call + 1 === resp || (call === 3 && resp === 1)) {
    return win;
  }
  if (call - 1 === resp || (call === 1 && resp === 3)) {
    return lose;
  }
  console.error('No match found in getGameScore');
};

const testGameScoring = () => {
  // call, response, expected score
  const testCases = [
    [1, 1, 3], // tie
    [1, 2, 6], // them: rock, me: paper
    [2, 3, 6], // them: paper, me: scissors
    [3, 1, 6], // them: scissors, me: rock
    [1, 3, 0], // them: rock, me: scissors
    [2, 1, 0], // them: paper, me: rock
    [3, 2, 0], // them: scissors, me: paper
  ];
  for (let i = 0; i < testCases.length; i++) {
    const game = testCases[i];
    if (getGameScore(game[0], game[1]) !== game[2]) {
      console.error('Game test case', game, 'failed');
    }
  }
};
testGameScoring();

// console.log(getScore(testInputString));
console.log('Part 1:', getScore(input));

// X/1 means you need to lose, Y/2 means you need to end the round in a draw, and Z/3 means you need to win
// Add the scores of the expected results and the score of the throw

const inputPart2 = processInputString(input);

const getThrowScorePart2 = (call, result) => {

  if (result === 2) {
    // Tie, throw the same
    return call;
  }
  if (result === 1) {
    // Need to lose
    return call - 1 === 0 ? 3 : call - 1;
  }
  if (result === 3) {
    // Need to win
    return call + 1 === 4 ? 1 : call + 1;
  }
};

console.log('part 2:', inputPart2.reduce((sum, { call, resp }) => {
  if (resp === 1) {
    return sum + 0 + getThrowScorePart2(call, resp);
  }
  if (resp === 2) {
    return sum + 3 + getThrowScorePart2(call, resp);
  }
  if (resp === 3) {
    return sum + 6 + getThrowScorePart2(call, resp);
  }
}, 0));
