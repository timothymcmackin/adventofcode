const testInputString = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const { inputString } = require('./input/2');

const processInput = (inputString) => inputString.split('\n').map(processLine);

const processLine = (line) => {
  // Get game number
  const gameInfoResult = /^Game (\d*):/.exec(line);
  const game = Number(gameInfoResult[1]);

  // Get game results
  const allGamesString = line.split(':')[1];
  const colorRegex = /(\d+)\s*(\w+)/g;
  let colorMax = {};
  let results;
  while ((results = colorRegex.exec(allGamesString)) !== null) {
    const numCubes = Number(results[1]);
    const color = results[2];
    if (!colorMax[color]) {
      colorMax[color] = 0;
    }
    if (numCubes > colorMax[color]) {
      colorMax[color] = numCubes;
    }
  }

  return {
    game,
    colorMax,
  };
}
/*
[
  {
    "game": 1,
    "colorMax": {
      "blue": 9,
      "red": 5,
      "green": 4
    }
  },
  ...
]
*/

const isGamePossible = ({ colorMax }, redMax, greenMax, blueMax) =>
  colorMax.red <= redMax && colorMax.green <= greenMax && colorMax.blue <= blueMax

const getPossibleGamesSum = (gameData, redMax, greenMax, blueMax) =>
  gameData.reduce((sum, game) => {
    // console.log('\n');
    // console.log(`The limit is ${redMax}, ${greenMax}, ${blueMax}`);
    // console.log(`Game ${game.game} showed ${game.colorMax.red}, ${game.colorMax.green}, ${game.colorMax.blue}`);
    if (isGamePossible(game, redMax, greenMax, blueMax)) {
      // console.log('So this game is possible.');
      return sum + game.game;
    } else {
      // console.log('NOT POSSIBLE.');
    }
    return sum;
  }, 0);

// The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
const testInput = processInput(testInputString);
testInputAnswer = getPossibleGamesSum(testInput, 12, 13, 14);
console.log("Test input answer should be 8:", testInputAnswer);

const input = processInput(inputString);
console.log('Part 1: ', getPossibleGamesSum(input, 12, 13, 14));
