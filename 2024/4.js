const fs = require('fs');
const path = require('path');

const testInputString = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const inputString = fs.readFileSync(path.resolve(__dirname, './input/4.txt'), 'utf8');

const processInput = (inputString) => inputString.split('\n').map((l) => l.split(''));

const countXMAS = (inputString) => {
  const grid = processInput(inputString);
  let count = 0;
  let yLength = grid.length;
  let xLength = grid[0].length;

  for (let y = 0; y < yLength; y++) {
    for (let x = 0; x < xLength; x++) {
      // Check going east
      if (grid[y][x] == 'X' && x + 3 < xLength) {
        if (grid[y][x + 1] == 'M' && grid[y][x + 2] == 'A' && grid[y][x + 3] == 'S') {
          count++;
        }
      }
      // Check going west
      if (grid[y][x] == 'X' && x - 3 >= 0) {
        if (grid[y][x - 1] == 'M' && grid[y][x - 2] == 'A' && grid[y][x - 3] == 'S') {
          count++;
        }
      }
      // Check going north
      if (grid[y][x] == 'X' && y - 3 >= 0) {
        if (grid[y - 1][x] == 'M' && grid[y - 2][x] == 'A' && grid[y - 3][x] == 'S') {
          count++;
        }
      }
      // Check going south
      if (grid[y][x] == 'X' && y + 3 < yLength) {
        if (grid[y + 1][x] == 'M' && grid[y + 2][x] == 'A' && grid[y + 3][x] == 'S') {
          count++;
        }
      }
      // Diagonals
      // Check going northeast
      if (grid[y][x] == 'X' && y - 3 >= 0 && x + 3 < xLength) {
        if (grid[y - 1][x + 1] == 'M' && grid[y - 2][x + 2] == 'A' && grid[y - 3][x + 3] == 'S') {
          count++;
        }
      }
      // Check going northwest
      if (grid[y][x] == 'X' && y - 3 >= 0 && x - 3 >= 0) {
        if (grid[y - 1][x - 1] == 'M' && grid[y - 2][x - 2] == 'A' && grid[y - 3][x - 3] == 'S') {
          count++;
        }
      }
      // Check going southeast
      if (grid[y][x] == 'X' && y + 3 < yLength > 0 && x + 3 < xLength) {
        if (grid[y + 1][x + 1] == 'M' && grid[y + 2][x + 2] == 'A' && grid[y + 3][x + 3] == 'S') {
          count++;
        }
      }
      // Check going southwest
      if (grid[y][x] == 'X' && y + 3 < yLength && x - 3 >= 0) {
        if (grid[y + 1][x - 1] == 'M' && grid[y + 2][x - 2] == 'A' && grid[y + 3][x - 3] == 'S') {
          count++;
        }
      }
    }
  }
  return count;
}

/*
M.S
.A.
M.S
*/
const countXedMas = (inputString) => {
  const grid = processInput(inputString);
  let count = 0;
  let yLength = grid.length;
  let xLength = grid[0].length;
  // Can't be the edge
  for (let y = 1; y < yLength - 1; y++) {
    for (let x = 1; x < xLength - 1; x++) {
      // It's a match if the character is an A and the diagonals are two Ms and two Ss
      if (grid[y][x] == 'A') {
        const letters = grid[y-1][x-1] + grid[y+1][x-1] + grid[y-1][x+1] + grid[y+1][x+1];
        const Ms = letters.match(/M/g)?.length || 0;
        const Ss = letters.match(/S/g)?.length || 0;
        // Eliminate MAM and SAS matches
        const eliminateDiagonal = grid[y-1][x-1] === grid[y+1][x+1];
        if (Ms == 2 && Ss == 2 && !eliminateDiagonal) {
          count++;
        }
      }
    }
  }
  return count;
}

if (countXMAS(testInputString) != 18) {
  console.log('Part 1 test failed, got ', countXMAS(testInputString));
} else {
  console.log('Part 1:', countXMAS(inputString));
}

if (countXedMas(testInputString) != 9) {
  console.log('Part 2 test failed, got ', countXedMas(testInputString));
} else {
  console.log('Part 2:', countXedMas(inputString));
}
// 2013 too high
