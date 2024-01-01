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

const printGrid = (grid) => grid.forEach((oneRow) => console.log(oneRow.join('')));

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

// Part 2: roll from all directions
// Each cycle tilts the platform four times so that the rounded rocks roll north, then west, then south, then east.
// Maybe look for a pattern

const rollWest = (passedGrid) => {
  let grid = JSON.parse(JSON.stringify(passedGrid));
  grid = grid.map((oneRow) => {
    for (let currentCol = 0; currentCol < oneRow.length; currentCol++) {
      const targetChar = oneRow[currentCol];
      if (targetChar === '.') {
        // Now check right until we find a # or O
        let checkCol = currentCol + 1;
        let hitBlock = false;
        while (!hitBlock && checkCol < oneRow.length) {
          let checkChar = oneRow[checkCol];
          if (checkChar === '#') {
            hitBlock = true;
          } else if (checkChar === 'O') {
            // move to the left
            oneRow[currentCol] = 'O';
            oneRow[checkCol] = '.';
            hitBlock = true;
          }
          checkCol++;
        }
      }
    }
    return oneRow;
  });
  return grid;
}

const rollEast = (passedGrid) => {
  let grid = JSON.parse(JSON.stringify(passedGrid));
  grid = grid.map((oneRow) => {
    for (let currentCol = oneRow.length; currentCol >= 0; currentCol--) {
      const targetChar = oneRow[currentCol];
      if (targetChar === '.') {
        // Now check right until we find a # or O
        let checkCol = currentCol - 1;
        let hitBlock = false;
        while (!hitBlock && checkCol > 0) {
          let checkChar = oneRow[checkCol];
          if (checkChar === '#') {
            hitBlock = true;
          } else if (checkChar === 'O') {
            // move to the left
            oneRow[currentCol] = 'O';
            oneRow[checkCol] = '.';
            hitBlock = true;
          }
          checkCol--;
        }
      }
    }
    return oneRow;
  });
  return grid;
}

const rollDown = (passedGrid) => {
  let grid = JSON.parse(JSON.stringify(passedGrid));
  for (let currentRow = grid.length - 1; currentRow >= 0; currentRow--) {
    for (let currentCol = 0; currentCol < grid[0].length; currentCol++) {
      const targetChar = grid[currentRow][currentCol];
      if (targetChar === '.') {
        // Search down and see if you can find a O
        let checkRow = currentRow - 1;
        let hitBlock = false;
        while (checkRow >= 0 && !hitBlock) {
          let checkChar = grid[checkRow][currentCol];
          if (checkChar === '#') {
            hitBlock = true;
          } else if (checkChar === 'O') {
            // Move this O up
            grid[checkRow][currentCol] = '.';
            grid[currentRow][currentCol] = 'O';
            hitBlock = true;
          }
          checkRow--;
        }
      }
    }
  }
  return grid;
}

const roll4Directions = (passedGrid) => {
  let grid = JSON.parse(JSON.stringify(passedGrid));
  // console.log('start');
  // printGrid(grid);
  grid = rollUp(grid);
  // console.log('up');
  // printGrid(grid);
  grid = rollWest(grid);
  // console.log('west');
  // printGrid(grid);
  grid = rollDown(grid);
  // console.log('down');
  // printGrid(grid);
  grid = rollEast(grid);
  // console.log('east');
  // printGrid(grid);
  return grid;
}

// After 1 cycle:
const afterOneCycle = `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`
  .split('\n')
  .map((oneLine) => oneLine.split(''));

const testInputAfterOneCycle = roll4Directions(testInput);

const scoreAfterOneCycle = calculateWeight(testInputAfterOneCycle);
if (calculateWeight(afterOneCycle) !== scoreAfterOneCycle) {
  console.log('Part 2 test doesn\'t match');
}

let grid = JSON.parse(JSON.stringify(input));
let oldWeight = calculateWeight(input);
for (let i = 0; i < 100; i++) {
  grid = roll4Directions(grid);
  const newWeight = calculateWeight(grid);
  console.log(Math.abs(newWeight - oldWeight));
  oldWeight = newWeight;
}