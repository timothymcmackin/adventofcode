const calculateWeightTestGrid = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`
  .split('\n')
  .map((oneLine) => oneLine.split(''));

// The amount of load caused by a single rounded rock (O) is equal to the number of rows from the rock to the south edge of the platform, including the row the rock is on. (Cube-shaped rocks (#) don't contribute to load.)

const calculateWeight = (passedGrid) => {
  // Reverse to make calculating the index easier
  const grid = passedGrid.reverse();
  return grid.reduce((gridSum, oneLine, rowIndex) =>
    oneLine.reduce((lineSum, oneChar) =>
      oneChar === 'O' ? lineSum + rowIndex + 1 : lineSum
    , gridSum)
  , 0);
}
if (calculateWeight(calculateWeightTestGrid) !== 136) {
  console.log('calculateWeight test failed');
}

const testInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`
  .split('\n')
  .map((oneLine) => oneLine.split(''));

// Start at the top row and if there is an open spot, move down till you hit a # or if you find a O, put it up.
const rollUp = (passedGrid) => {
  let grid = JSON.parse(JSON.stringify(passedGrid));
  for (let currentRow = 0; currentRow < grid.length; currentRow++) {
    for (let currentCol = 0; currentCol < grid[0].length; currentCol++) {
      const targetChar = grid[currentRow][currentCol];
      if (targetChar === '.') {
        // Search down and see if you can find a O
        let checkRow = currentRow + 1;
        let hitBlock = false;
        while (checkRow < grid.length && !hitBlock) {
          let checkChar = grid[checkRow][currentCol];
          if (checkChar === '#') {
            hitBlock = true;
          } else if (checkChar === 'O') {
            // Move this O up
            grid[checkRow][currentCol] = '.';
            grid[currentRow][currentCol] = 'O';
            hitBlock = true;
          }
          checkRow++;
        }
      }
    }
  }
  return grid;
}
if (calculateWeight(rollUp(testInput)) !== 136) {
  console.log('rollUp test failed');
}

const { inputStr } = require('./input/14');

const input = inputStr.split('\n').map((oneLine) => oneLine.split(''));

console.log('Part 1: ', calculateWeight(rollUp(input)));
