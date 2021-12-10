const { puzzleInput } = require('./inputs/input10');
const _ = require('lodash');

const testCase1 = `.#..#
.....
#####
....#
...##`;

const testCase1ByNumbers = `.7..7
.....
67775
....7
...87`;

const testCase2 = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

const testCase3 = `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;

const testCase4 = `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`;

const testCase5 = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;

const parseInput = (input) => {
  const inputByLines = input.split('\n');
  return inputByLines.map((oneLine) => {
    return oneLine.split('');
  });
}

// Convert map into a table of angles
const getAnglesRelativeToAsteroid = (map, x, y) => {
  var angleMap = [];
  for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
    const currentRow = map[rowCounter];
    angleMap[rowCounter] = [];
    for (let colCounter = 0; colCounter < currentRow.length; colCounter++) {

      if (x === colCounter && y === rowCounter) {
        angleMap[rowCounter][colCounter] = 'ME!';
      } else {
        if (map[rowCounter][colCounter] == '#') {
          angleMap[rowCounter][colCounter] = getAngleBetween(x, y, colCounter, rowCounter);
        } else {
          angleMap[rowCounter][colCounter] = '.';
        }
      }
    }
  }
  return angleMap;
}

const getAngleBetween = (sourceX, sourceY, targetX, targetY) => {
  const relativeX = sourceX - targetX;
  const relativeY = sourceY - targetY;
  // https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
  const radians = Math.atan2(relativeY, relativeX);
  const degrees = radians * 180 / Math.PI;
  const degreesRounded = Math.round((degrees + Number.EPSILON) * 100) / 100
  return degreesRounded;
}

const countUniqueAnglesInAngleMap = (angleMap) => {
  const flatArray = _.flattenDeep(angleMap);
  // https://stackabuse.com/javascript-check-if-variable-is-a-number/
  const numbers = flatArray.filter((item) => Number.isFinite(item));
  const uniqueNumbers = _.uniq(numbers);
  return uniqueNumbers.length;
}

const getMostAngles = (input) => {
  const map = parseInput(input);

  var resultMap = [];
  for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
    const currentRow = map[rowCounter];
    resultMap[rowCounter] = [];
    for (let colCounter = 0; colCounter < currentRow.length; colCounter++) {
      if (map[rowCounter][colCounter] === '#') {
        const angleMap = getAnglesRelativeToAsteroid(map, colCounter, rowCounter);
        resultMap[rowCounter][colCounter] = countUniqueAnglesInAngleMap(angleMap);
      } else {
        resultMap[rowCounter][colCounter] = '.';
      }
    }
  }
  // console.log(resultMap);
  return getMaxOfMap(resultMap);
}

const getMaxOfMap = (map) => {
  const flat = _.flattenDeep(map);
  const numbers = flat.filter((item) => Number.isFinite(item));
  return Math.max(...numbers);
}

const map1 = parseInput(testCase1);
const map1angles = getAnglesRelativeToAsteroid(map1, 3, 4);
console.assert(countUniqueAnglesInAngleMap(map1angles) === 8, 'count unique angles failed');
console.assert(getMostAngles(testCase1) === 8, 'getMostAngles failed, test case 1');

console.assert(getMostAngles(testCase2) === 33, 'getMostAngles failed, test case 2');
console.assert(getMostAngles(testCase3) === 35, 'getMostAngles failed, test case 3');
console.assert(getMostAngles(testCase4) === 41, 'getMostAngles failed, test case 4');
console.assert(getMostAngles(testCase5) === 210, 'getMostAngles failed, test case 5');

console.log(getMostAngles(puzzleInput))