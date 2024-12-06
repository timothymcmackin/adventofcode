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

const testInputStringInfiniteLoop = `....#.....
.........#
..........
..#.......
.......#..
..........
.#.#^.....
........#.
#.........
......#...`;
const testInputStringNotInfiniteLoop = `....#.....
#........#
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

const getPathGrid = (passedGrid) => {
  const grid = JSON.parse(JSON.stringify(passedGrid));
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
  return grid;
}

// This is probably wrong because it uses up/down as the same and left/right as the same
// And both might not be an infinite loop
const isInfiniteLoop = (passedGrid) => {
  const grid = JSON.parse(JSON.stringify(passedGrid));
  let {x, y} = getStartingPosition(grid);
  let direction = 'up';
  grid[y][x] = '|';
  let firstRun = true;
  const maxY = grid.length - 1;
  const maxX = grid[0].length - 1;
  // while (0 <= y < maxY && 0 <= x < maxX) {
  while (0 <= y && y < maxY && 0 <= x && x < maxX) {
    const previousValue = grid[y][x];
    // If I've visited this spot in the same direction, I'm in a loop
    if (previousValue === '+' && !firstRun) {
      return true;
    }
    if (previousValue === '|' && (direction === 'up' || direction === 'down') && !firstRun) {
      return true;
    } else if (previousValue === '-' && (direction === 'left' || direction === 'right') && !firstRun) {
      return true;
    }
    // Mark current spot as visited
    if (direction === 'up' || direction === 'down') {
      if (previousValue === '+' || previousValue === '-') {
        grid[y][x] = '+';
      } else {
        grid[y][x] = '|';
      }
    } else {
      if (previousValue === '+' || previousValue === '|') {
        grid[y][x] = '+';
      } else {
        grid[y][x] = '-';
      }
    }
    // Do I move or rotate?
    const { newX, newY } = newLocation(x, y, direction);
    if (grid[newY] && grid[newY][newX] && grid[newY][newX] === '#') {
      // No, rotate
      direction = newDirection(direction);
      firstRun = true;
    } else {
      firstRun = false;
      // Yes, move
      x = newX;
      y = newY;
    }
  }
  // Guard wandered off the grid
  return false;
}

// Get all '.' positions
const getBlockerCoordinates = (passedGrid) => {
  const grid = JSON.parse(JSON.stringify(passedGrid));
  let blockerCoordinates = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '.') {
        blockerCoordinates.push({x, y});
      }
    }
  }
  return blockerCoordinates;
}

// How many places could you put a blocker to put the path into an infinite loop?
const partTwo = (inputString) => {
  const grid = processInput(inputString);
  const blockerCoordinates = getBlockerCoordinates(grid);
  return blockerCoordinates.reduce((sum, {x, y}) => {
    let editedGrid = JSON.parse(JSON.stringify(grid));
    editedGrid[y][x] = '#';
    return isInfiniteLoop(editedGrid) ? sum + 1 : sum;
  }, 0);
}


const part1TestScore = partOne(testInputString);
if (part1TestScore != 41) {
  console.log('Part 1 test failed, got ', part1TestScore);
} else {
  console.log('Part 1:', partOne(inputString));
}

if (!isInfiniteLoop(processInput(testInputStringInfiniteLoop))) {
  console.log('Infinite loop test failed');
}
if (isInfiniteLoop(processInput(testInputStringNotInfiniteLoop))) {
  console.log('Infinite loop test failed on a false positive');
}

const part2TestScore = partTwo(testInputString);
if (part2TestScore != 6) {
  console.log('Part 2 test failed, got ', part2TestScore);
} else {
  console.log('Part 2:', partTwo(inputString));
}
