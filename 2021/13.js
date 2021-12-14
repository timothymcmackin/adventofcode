const { puzzleInput } = require('./inputs/input13');

const testCaseInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

function reverseArray(arr) {
  var newArray = [];
  while (arr.length > 0) {
    newArray.push(arr.pop());
  }
  return newArray;
}

function initializeArray(string) {
  var map = [];
  var allLines = string.split('\n');
  const lines = allLines.filter((oneLine) => oneLine.split(',').length === 2);
  var numberLines = lines.map((oneLine) => {
    const split = oneLine.split(',');
    return [Number(split[0]), Number(split[1])];
  });


  // This shouldn't be necessary but I'm getting confused later down
  const longestRow = numberLines.reduce((max, oneLine) => {
    return Math.max(max, oneLine[0]);
  }, 0);
  const lastRow = numberLines.reduce((max, oneLine) => {
    return Math.max(max, oneLine[1]);
  }, 0);

  for (let rowCounter = 0; rowCounter <= lastRow; rowCounter++) {
    map[rowCounter] = [];
    for (let colCounter = 0; colCounter <= longestRow; colCounter++) {
      map[rowCounter][colCounter] = '.';
    }
  }

  while (numberLines.length > 0) {
    const splitLine = numberLines.shift();
    const col = splitLine[0];
    const row = splitLine[1];
    map[row][col] = '#';
  }
  return map;
}

function printMap(map) {
  const lines = map.map((oneLine) => oneLine.join(''));
  const string = lines.join('\n');
  console.log(string);
}

function fold(passedMap, direction, location) {
  var map = [...passedMap];
  var map1 = [];
  var map2 = [];
  if (direction === 'y') {
    // folding vertically
    // Get the portion that's not folded
    map1 = map.slice(0, location);
    // Take out the line that's on the fold
    // Reverse the part to fold
    map2 = reverseArray(map.slice(location));
  } else if (direction === 'x') {
    // Folding horizontally
    // Get the portion that's not folded
    for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
      map1[rowCounter] = map[rowCounter].slice(0, location);
      map2[rowCounter] = reverseArray(map[rowCounter].slice(location));
    }
  }

  // Superimpose the maps
  for (let rowCounter = 0; rowCounter < map2.length; rowCounter++) {
    for (let colCounter = 0; colCounter < map1[0].length; colCounter++) {
      if (map2[rowCounter][colCounter] === '#') {
        map1[rowCounter][colCounter] = '#';
      }
    }
  }
  return map1;
}

function foldAll(map, string) {
  const folds = string.split('\n')
    .filter((oneLine) => oneLine.startsWith('fold along '))
    .map((line) => line.replace('fold along ', ''))
    .map((line) => {
      const direction = line.split('=')[0];
      const location = Number(line.split('=')[1]);
      return { direction, location };
    });
  
  folds.forEach(({ direction, location }) => {
    map = fold(map, direction, location);
    // printMap(map);
    // console.log()
  });
  return map;
}

const countHashes = (map) => map.reduce(
  (rowSum, oneLine) =>
    rowSum + oneLine.reduce((colSum, char) => 
      colSum + (char === '#' ? 1 : 0)
    , 0)
  , 0);

const testCaseMap = initializeArray(testCaseInput);
// printMap(testCaseMap);
// const testCaseAfterOneFold = fold(testCaseMap, 'y', 7);
// printMap(testCaseAfterOneFold);
// console.log();
// console.log()
// const testCaseAfterTwoFolds = fold(testCaseAfterOneFold, 'x', 5)
// const testCaseAfterallFolds = foldAll(testCaseMap, testCaseInput);
// printMap(testCaseAfterallFolds)
// console.log(countHashes(testCaseAfterallFolds))
// console.assert(countHashes(testCaseAfterallFolds) === 17, 'test case failed');

const puzzleMap = initializeArray(puzzleInput);
const puzzleAfterOneFold = fold(puzzleMap, 'x', 655);
console.assert(countHashes(puzzleAfterOneFold) === 712, 'count after first step failed');

printMap(foldAll(puzzleMap, puzzleInput))