const { puzzleAlgorithmSource, puzzleData } = require('./inputs/input20'); 

const testcaseEnhancementAlgorithmSource = '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#';

const testCaseData = `#..#.
#....
##..#
..#..
..###`;

const moveToBinary = (str) => str.replace(/\./mg, '0').replace(/#/gm, '1');

const testCaseAlgorithm = moveToBinary(testcaseEnhancementAlgorithmSource).split('');
const puzzleAlgorithm = moveToBinary(puzzleAlgorithmSource).split('');

const bin = (digit) => parseInt(digit, 2);

const processMap = (input) => {
  const rows = input.split('\n');
  return rows.map((oneRowString) => moveToBinary(oneRowString).split(''));
}

const testCaseMap = processMap(testCaseData);
const puzzleMap = processMap(puzzleData);

const getPixel = (map, row, col, outOfBoundsChar) => {
  var binaryDigits = [];
  if (row === 0) {
    binaryDigits.push(outOfBoundsChar,outOfBoundsChar,outOfBoundsChar);
  } else {
    const rowAbove = map[row - 1];
    binaryDigits.push(col > 0 ? rowAbove[col - 1] : outOfBoundsChar);
    binaryDigits.push(rowAbove[col]);
    binaryDigits.push(col < rowAbove.length - 1 ? rowAbove[col + 1] : outOfBoundsChar);
  }
  const currentRow = map[row];
  binaryDigits.push(col > 0 ? currentRow[col - 1] : outOfBoundsChar);
  binaryDigits.push(currentRow[col]);
  binaryDigits.push(col < currentRow.length - 1 ? currentRow[col + 1] : outOfBoundsChar);
  if (row === map.length - 1) {
    binaryDigits.push(outOfBoundsChar,outOfBoundsChar,outOfBoundsChar);
  } else {
    const rowBelow = map[row + 1];
    binaryDigits.push(col > 0 ? rowBelow[col - 1] : outOfBoundsChar);
    binaryDigits.push(rowBelow[col]);
    binaryDigits.push(col < rowBelow.length - 1 ? rowBelow[col + 1] : outOfBoundsChar);
  }
  return binaryDigits.join('');
}

const runAlgorithmOnMap = (passedMap, algorithm, outOfBoundsChar) => {
  var newMap = [];
  var map = [...passedMap];


  for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
    newMap[rowCounter] = [];
    for (let colCounter = 0; colCounter < map[0].length; colCounter++) {
      // Get nine pixels to analyze
      const pixels = getPixel(map, rowCounter, colCounter, outOfBoundsChar);
      // Convert to binary
      // Get matching item from algorithm
      // Update map
      newMap[rowCounter][colCounter] = algorithm[bin(pixels)];
      
    }
  }
  return newMap;
}

const printMap = (map) => {
  map.forEach((oneRow) => {
    console.log(oneRow
      .map((char) => char === '1' ? '#' : '.')
      .join(''));
  });
  console.log();
}

const prepMapForBruteForce = (map, numberOfTimes) => {
  // Add a row and column for each iteration to account for map creep
  const numberOfRows = map.length;
  const numberOfColumns = map[0].length;
  const blankRow = Array.apply(null, Array(numberOfColumns + numberOfTimes + numberOfTimes)).map(() => 0);
  var newMap = [];
  for (let i = 0; i < numberOfTimes; i++) {
    newMap.push(blankRow);
  }
  map.forEach((oneRow) => {
    var newRow = Array.apply(null, Array(numberOfTimes)).map(() => 0);
    newRow = newRow.concat(oneRow);
    newRow = newRow.concat(Array.apply(null, Array(numberOfTimes)).map(() => 0));
    newMap.push(newRow);
  });
  for (let i = 0; i < numberOfTimes; i++) {
    newMap.push(blankRow);
  }
  return newMap;
}

const runAlgorithmOnMapMultiple = (map, algorithm, numberOfTimes) => {
  var newMap = [...map];
  newMap = prepMapForBruteForce(newMap, numberOfTimes);
  var outOfBoundsChar = newMap[0][0];
  printMap(newMap);
  for (let i = 0; i < numberOfTimes; i++) {
    newMap = runAlgorithmOnMap(newMap, algorithm, outOfBoundsChar);
    printMap(newMap);
    outOfBoundsChar = outOfBoundsChar === 0 ? 1: 0;
  }
  return newMap;
}

const countLitPixels = (map) =>
  map.reduce((rowTotal, oneRow) =>
    rowTotal + oneRow.reduce((colTotal, pixel) => colTotal + Number(pixel), 0)
  , 0);

// runAlgorithmOnMapMultiple(testCaseMap, testCaseAlgorithm, 2);
// console.assert(countLitPixels(runAlgorithmOnMapMultiple(testCaseMap, testCaseAlgorithm, 2)) === 35, 'test case failed');
// printMap(runAlgorithmOnMapMultiple(testCaseMap, testCaseAlgorithm, 2));
console.log(countLitPixels(runAlgorithmOnMapMultiple(testCaseMap, testCaseAlgorithm, 50)));

// printMap(runAlgorithmOnMapMultiple(puzzleMap, puzzleAlgorithm, 1));
// console.log(countLitPixels(runAlgorithmOnMapMultiple(puzzleMap, puzzleAlgorithm, 2)));
