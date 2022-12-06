const fs = require('fs');
const path = require('path');

const inputStr = fs.readFileSync(path.resolve(__dirname, './inputs/18.txt'), 'utf8');

const testFieldStr = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`;

const parseInput = (str) =>
  str.split('\n').map((r) => r.split(''));

const printField = (field, time) => console.log('After', time, 'minutes:\n', field.map((substr) => substr.join('')).join('\n'), '\n\n');

// each acre can be either open ground (.), trees (|), or a lumberyard (#)
// An open acre will become filled with trees if three or more adjacent acres contained trees. Otherwise, nothing happens.
// An acre filled with trees will become a lumberyard if three or more adjacent acres were lumberyards. Otherwise, nothing happens.
// An acre containing a lumberyard will remain a lumberyard if it was adjacent to at least one other lumberyard and at least one acre containing trees. Otherwise, it becomes open.
// Here, "adjacent" means any of the eight acres surrounding that acre.
const getNewAcre = (field, x, y) => {
  const currentAcre = field[y][x];
  
  // Get the up to 8 surrounding acres
  // Filter out acres outside the grid limits
  const targetGridSpec = [
    [y-1, x-1],
    [y, x-1],
    [y+1, x-1],
    [y-1, x+1],
    [y, x+1],
    [y+1, x+1],
    [y-1, x],
    [y+1, x],
  ].filter((oneCell) => {
    if (oneCell[0] < 0 || oneCell[1] < 0) {
      return false;
    }
    if (oneCell[0] > field.length - 1 || oneCell[1] > field[0].length - 1) {
      return false;
    }
    return true;
  });

  const adjacentAcres = targetGridSpec.map((oneCell) => field[oneCell[0]][oneCell[1]]);

  if (currentAcre === '.' && adjacentAcres.filter((c) => c === '|').length >= 3) {
    return '|';
  }
  if (currentAcre === '|' && adjacentAcres.filter((c) => c === '#').length >= 3) {
    return '#';
  }
  if (currentAcre === '#') {
    if (adjacentAcres.filter((c) => c === '#').length >= 1 && adjacentAcres.filter((c) => c === '|').length >= 1) {
      return '#';
    } else {
      return '.';
    }
  }
  return currentAcre;
}

const runTime = (passedField, time) => {
  let field = JSON.parse(JSON.stringify(passedField));
  let newField = JSON.parse(JSON.stringify(passedField));
  for (let ticker = 1; ticker <= time; ticker++) {
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[0].length; x++) {
        newField[y][x] = getNewAcre(field, x, y);
      }
    }
    field = JSON.parse(JSON.stringify(newField));
    printField(field, ticker);
  }
  return field;
};

const getScoreCount = (field) => {
  // Multiplying the number of wooded acres by the number of lumberyards
  const treeCount = field.reduce((lineScore, oneLine) =>
    oneLine.reduce((cellScore, oneCell) => oneCell === '|' ? cellScore + 1 : cellScore, lineScore)
  , 0);
  const lumberyardCount = field.reduce((lineScore, oneLine) =>
    oneLine.reduce((cellScore, oneCell) => oneCell === '#' ? cellScore + 1 : cellScore, lineScore)
  , 0);
  return treeCount * lumberyardCount;
}

const testField = parseInput(testFieldStr);
printField(testField, 0);
const testFieldAfter10 = runTime(testField, 10);
if (getScoreCount(testFieldAfter10) !== 1147) {
  console.error('part 1 test failed. Should be 1147, but got ', getScoreCount(testFieldAfter10));
}

const inputField = parseInput(inputStr);
const inputFieldAfter10 = runTime(inputField, 10);
console.log('Part 1:', getScoreCount(inputFieldAfter10));