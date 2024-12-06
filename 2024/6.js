const fs = require('fs');
const path = require('path');

const testInputString = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const inputString = fs.readFileSync(path.resolve(__dirname, './input/6.txt'), 'utf8');

const processInput = (inputString) => inputString
  .split('\n')
  .map((str) => str.split(''));

// Find the ^ at the beginning
const getStartingPosition = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '^') {
        return {y, x};
      }
    }
  }
}

const newLocation = (x, y, direction) => {
  let newX = x;
  let newY = y;
  switch (direction) {
    case 'up':
      newY--;
      break;
    case 'down':
      newY++;
      break;
    case 'right':
      newX++;
      break;
    case 'left':
      newX--;
      break;
    }
  return { newX, newY };
}

const newDirection = (direction) => {
  switch (direction) {
    case 'up':
      return 'right';
    case 'down':
      return 'left';
    case 'right':
      return 'down';
    case 'left':
      return 'up';
    }
}

// Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?
const partOne = (inputString) => {
  const grid = processInput(inputString);
  let {x, y} = getStartingPosition(grid);
  let direction = 'up';
  const maxY = grid.length - 1;
  const maxX = grid[0].length - 1;
  // while (0 <= y < maxY && 0 <= x < maxX) {
  while (0 <= y && y < maxY && 0 <= x && x < maxX) {
    // Mark current spot as visited
    grid[y][x] = 'X';
    // Do I move or rotate?
    const { newX, newY } = newLocation(x, y, direction);
    if (grid[newY] && grid[newY][newX] && grid[newY][newX] === '#') {
      // No, rotate
      direction = newDirection(direction);
    } else {
      // Yes, move
      x = newX;
      y = newY;
    }
  }
  // Mark final spot
  grid[y][x] = 'X';

  // Count Xs
  return grid.reduce((sum, oneRow) =>
    oneRow.reduce((lineSum, char) => char === 'X' ? lineSum + 1 : lineSum, sum)
  , 0);
}

const part1TestScore = partOne(testInputString);
if (part1TestScore != 41) {
  console.log('Part 1 test failed, got ', part1TestScore);
} else {
  console.log('Part 1:', partOne(inputString));
}