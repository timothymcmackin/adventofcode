const testCaseInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const { puzzleInput } = require('./inputs/input11');

/*
First, the energy level of each octopus increases by 1.
Then, any octopus with an energy level greater than 9 flashes. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than 9, it also flashes. This process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)
Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
*/

// How many total flashes are there after 100 steps?
var flashCounter = 0;

const runDay = (map, stepNumber) => {
  // Increase by 1
  for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
    for (let colCounter = 0; colCounter < map[0].length; colCounter++) {
      map[rowCounter][colCounter]++;
    }
  }

  // Flash everybody who exceeds 9
  var didANewFlashHappen;
  do {
    didANewFlashHappen = false;
    for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
      for (let colCounter = 0; colCounter < map[0].length; colCounter++) {
        if (map[rowCounter][colCounter] > 9) {
          flashCounter++;
          didANewFlashHappen = true;
          map[rowCounter][colCounter] = 0;
          map = flashNearby(map, rowCounter, colCounter);
        }
      }
    }
  } while (didANewFlashHappen);

  // Check if everyone flashed today
  if (map.every((line) => line.every((num) => num === 0))) {
    console.log('Everybody flashed at day ', stepNumber);
  }

  return map;
}

const flashNearby = (map, row, col) => {
  map = tryToFlashIncrement(map, row - 1, col);
  map = tryToFlashIncrement(map, row + 1, col);
  map = tryToFlashIncrement(map, row, col - 1);
  map = tryToFlashIncrement(map, row, col + 1);

  // diagonals
  map = tryToFlashIncrement(map, row - 1, col - 1);
  map = tryToFlashIncrement(map, row + 1, col - 1);
  map = tryToFlashIncrement(map, row - 1, col + 1);
  map = tryToFlashIncrement(map, row + 1, col + 1);

  return map;
}

const tryToFlashIncrement = (map, row, col) => {
  if (row < map.length && row >= 0 && col < map[row].length && col >= 0 && map[row][col] > 0) {
    map[row][col]++;
  }
  return map;
}

const printMap = (map) => {
  const lines = map.map((arr) => arr.join(''));
  const string = lines.join('\n');
  console.log(string);
}

const setUpMap = (string) => {
  const lines = string.split('\n');
  return lines.map((oneLine) => oneLine.split(''));
}

// const testCaseAfterDay1 = runDay(runDay(setUpMap(testCaseInput)));

var testCase = setUpMap(testCaseInput);
for (let index = 0; index < 100; index++) {
  testCase = runDay(testCase);
}
console.assert(flashCounter === 1656);

flashCounter = 0;
var puzzle = setUpMap(puzzleInput);
for (let stepNumber = 1; stepNumber <= 300; stepNumber++) {
  puzzle = runDay(puzzle, stepNumber);
  // printMap(puzzle);
}
console.log(flashCounter);
