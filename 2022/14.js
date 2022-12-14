const fs = require('fs');
const path = require('path');

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/14.txt'), 'utf8');

const testInputString = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const unadjustedSandSource = { x: 500, y: 0 };

const processInput = (str) => {
  const strByLines = str.split('\n');
  let lines = [];
  for (const oneStr of strByLines) {
    const coordinates = oneStr
      .split(' -> ')
      .map((l) => {
        const lSplit = l.split(',');
        return { x: lSplit[0], y: lSplit[1] };
      });
    let prevCoord;
    for (const coord of coordinates) {
      if (prevCoord) {
        lines.push([prevCoord, coord]);
      }
      prevCoord = coord;
    }
  }
  // console.log(lines);
  /*
  [
    [ { x: '498', y: '4' }, { x: '498', y: '6' } ],
    [ { x: '498', y: '6' }, { x: '496', y: '6' } ],
    [ { x: '503', y: '4' }, { x: '502', y: '4' } ],
    [ { x: '502', y: '4' }, { x: '502', y: '9' } ],
    [ { x: '502', y: '9' }, { x: '494', y: '9' } ]
  ]
  */

  return lines;
};

// Do I need to draw the grid or is there some other way?
// Debugging will be hard without a drawn grid
const simulateSand = (passedUnadjustedLines) => {
  const unadjustedLines = JSON.parse(JSON.stringify(passedUnadjustedLines));
  const maxX = unadjustedLines.reduce((largestSoFar, coord) => Math.max(largestSoFar, coord[0].x, coord[1].x), 0);
  const maxY = unadjustedLines.reduce((largestSoFar, coord) => Math.max(largestSoFar, coord[0].y, coord[1].y), 0);
  const minX = unadjustedLines.reduce((smallestSoFar, coord) => Math.min(smallestSoFar, coord[0].x, coord[1].x), Infinity);
  const minY = unadjustedLines.reduce((smallestSoFar, coord) => Math.min(smallestSoFar, coord[0].y, coord[1].y), Infinity);
  // console.log(maxX, maxY); // 503, 9
  // console.log(minX, minY); // 494, 4

  // remove all the empty columns to the right by adjusting everybody back
  let lines = unadjustedLines.map((coords) => coords.map(({ x, y }) => ({
    x: x - minX,
    y,
  })));

  const sandSource = {
    x: unadjustedSandSource.x - minX,
    y: unadjustedSandSource.y,
  };

  const newMaxX = lines.reduce((largestSoFar, coord) => Math.max(largestSoFar, coord[0].x, coord[1].x), 0);
  const newMaxY = lines.reduce((largestSoFar, coord) => Math.max(largestSoFar, coord[0].y, coord[1].y), 0);

  let grid = []
  for (let y = 0; y <= newMaxY; y++) {
    let newRow = [];
    for (let x = 0; x <= newMaxX; x++) {
      newRow.push('.');
    }
    grid.push(newRow);
  }

  // Mark lines in the grid
  // [ { x: '498', y: '4' }, { x: '498', y: '6' } ]
  for (const coord of lines) {
    if (coord[0].x === coord[1].x) {
      // vertical line
      const startY = Math.min(coord[0].y, coord[1].y);
      const endY = Math.max(coord[0].y, coord[1].y);
      for (let i = startY; i <= endY; i++) {
        grid[i][coord[0].x] = '#';
      }
    } else {
      // horizontal line
      const startX = Math.min(coord[0].x, coord[1].x);
      const endX = Math.max(coord[0].x, coord[1].x);
      for (let i = startX; i <= endX; i++) {
        grid[coord[0].y][i] = '#';
      }
    }
  }

  // Mark sand source
  grid[sandSource.y][sandSource.x] = '+';

  let sandTotal = 0;
  let stop = false;
  while (!stop) {
    grid = simulateOneSand(grid, sandSource.x, sandSource.y);
    if (grid) {
      sandTotal++;
    } else {
      stop = true;
    }
  }

  // printGrid(grid);
  return sandTotal;
};

// Recurse till the grain of sand comes to rest
const simulateOneSand = (grid, x, y) => {
  if (!grid) {
    // Found the end
    return grid;
  }
  if (grid.length < y) {
    console.error('oops');
  }
  // Sand falling into the abyss
  if (grid.length === y + 1) {
    return false;
  }
  // A unit of sand always falls down one step if possible.
  // Can we go down one step?
  if (grid[y + 1][x] === '.') {
    return simulateOneSand(grid, x, y + 1);
  }
  // If the tile immediately below is blocked (by rock or sand), the unit of sand attempts to instead move diagonally one step down and to the left.
  if (x === 0) {
    // sand is falling off into space
    return false;
  }
  if (grid[y + 1][x - 1] === '.') {
    // Move down and left
    return simulateOneSand(grid, x - 1, y + 1);
  }
  // If that tile is blocked, the unit of sand attempts to instead move diagonally one step down and to the right.
  if (x + 1 >= grid[0].length) {
    // falling off into space
    return false;
  }
  if (grid[y + 1][x + 1] === '.') {
    return simulateOneSand(grid, x + 1, y + 1);
  }
  // Sand comes to rest
  // This simple assignment didn't change the grid
  // grid[y][x] === 'o';
  // This didn't work, either
  // let newGrid = JSON.parse(JSON.stringify(grid));
  // newGrid[y][x] === 'o';
  let newGrid = [];
  for (let yCounter = 0; yCounter < grid.length; yCounter++) {
    let newRow = [];
    for (let xCounter = 0; xCounter < grid[0].length; xCounter++) {
      if (xCounter === x && yCounter === y) {
        newRow.push('o');
      } else {
        newRow.push(grid[yCounter][xCounter]);
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
}


const printGrid = (grid) => {
  const lineStrings = grid.map((oneLine) => oneLine.join(''));
  const oneString = lineStrings.join('\n');
  console.log(oneString);
};

const testInput = processInput(testInputString);
const testInputSandTotal = simulateSand(testInput);
console.log(testInputSandTotal, 'should be 24');

const input = processInput(inputString);
const inputSandTotal = simulateSand(input);
console.log('Part 1:', inputSandTotal);

// Part 2
// the floor is an infinite horizontal line with a y coordinate equal to two plus the highest y coordinate of any point in your scan.
const simulateSandPart2 = (passedUnadjustedLines) => {
  const unadjustedLines = JSON.parse(JSON.stringify(passedUnadjustedLines));
  // const maxX = unadjustedLines.reduce((largestSoFar, coord) => Math.max(largestSoFar, coord[0].x, coord[1].x), 0);
  const maxY = unadjustedLines.reduce((largestSoFar, coord) => Math.max(largestSoFar, coord[0].y, coord[1].y), 0) + 2; // Part 2: bottom is 2 below max Y
  // Sand could expand at maximum in a pyramid, spreading one to the side for each step in height
  // So add Y to the beginning of each row
  // So the sand could spreat from t as far as the larger of maxY or minX
  // So the distance from minX to sandstart.x must be at least maxY
  const minX = Math.min(
    unadjustedLines.reduce((smallestSoFar, coord) => Math.min(smallestSoFar, coord[0].x, coord[1].x), Infinity),
    unadjustedSandSource.x - maxY,
  );

  // const minY = unadjustedLines.reduce((smallestSoFar, coord) => Math.min(smallestSoFar, coord[0].y, coord[1].y), Infinity);
  // console.log(maxX, maxY); // 503, 9
  // console.log(minX, minY); // 494, 4

  // remove all the empty columns to the right by adjusting everybody back
  let lines = unadjustedLines.map((coords) => coords.map(({ x, y }) => ({
    x: x - minX,
    y,
  })));

  // distance from sand start x to maxX must be at least maxY
  const newMaxX = Math.max(
    lines.reduce((largestSoFar, coord) => Math.max(largestSoFar, coord[0].x, coord[1].x), 0),
    unadjustedSandSource.x + maxY - minX,
  );


  let grid = []
  for (let y = 0; y <= maxY; y++) {
    let newRow = [];
    for (let x = 0; x <= newMaxX; x++) {
      newRow.push('.');
    }
    grid.push(newRow);
  }

  // Mark lines in the grid
  // [ { x: '498', y: '4' }, { x: '498', y: '6' } ]
  for (const coord of lines) {
    if (coord[0].x === coord[1].x) {
      // vertical line
      const startY = Math.min(coord[0].y, coord[1].y);
      const endY = Math.max(coord[0].y, coord[1].y);
      for (let i = startY; i <= endY; i++) {
        grid[i][coord[0].x] = '#';
      }
    } else {
      // horizontal line
      const startX = Math.min(coord[0].x, coord[1].x);
      const endX = Math.max(coord[0].x, coord[1].x);
      for (let i = startX; i <= endX; i++) {
        grid[coord[0].y][i] = '#';
      }
    }
  }


  const sandSource = {
    x: unadjustedSandSource.x - minX,
    y: unadjustedSandSource.y,
  };

  // Mark the bottom line
  grid[maxY] = grid[maxY].map(() => '#');

  // Mark sand source
  grid[sandSource.y][sandSource.x] = '+';
  // printGrid(grid);

  let sandTotal = 0;
  let stop = false;
  while (!stop) {
    grid = simulateOneSandPart2(grid, sandSource.x, sandSource.y);
    if (grid) {
      sandTotal++;
    } else {
      stop = true;
    }
  }

  // printGrid(grid);
  return sandTotal + 1; // Add one for the original spot
};

// Recurse till the grain of sand comes to rest
const simulateOneSandPart2 = (grid, x, y) => {
  if (!grid) {
    // Found the end
    return grid;
  }
  if (grid.length < y) {
    console.error('oops');
  }
  // Sand falling into the abyss
  if (grid.length === y + 1) {
    return false;
  }
  // A unit of sand always falls down one step if possible.
  // Can we go down one step?
  if (grid[y + 1][x] === '.') {
    return simulateOneSandPart2(grid, x, y + 1);
  }
  // If the tile immediately below is blocked (by rock or sand), the unit of sand attempts to instead move diagonally one step down and to the left.
  if (x === 0) {
    // sand is falling off into space
    return false;
  }
  if (grid[y + 1][x - 1] === '.') {
    // Move down and left
    return simulateOneSandPart2(grid, x - 1, y + 1);
  }
  // If that tile is blocked, the unit of sand attempts to instead move diagonally one step down and to the right.
  if (x + 1 >= grid[0].length) {
    // falling off into space
    return false;
  }
  if (grid[y + 1][x + 1] === '.') {
    return simulateOneSandPart2(grid, x + 1, y + 1);
  }
  // Sand comes to rest
  if (grid[y][x] === '+') {
    // printGrid(grid);
    return false;
  }

  // This simple assignment didn't change the grid
  // grid[y][x] === 'o';
  // This didn't work, either
  // let newGrid = JSON.parse(JSON.stringify(grid));
  // newGrid[y][x] === 'o';
  let newGrid = [];
  for (let yCounter = 0; yCounter < grid.length; yCounter++) {
    let newRow = [];
    for (let xCounter = 0; xCounter < grid[0].length; xCounter++) {
      if (xCounter === x && yCounter === y) {
        newRow.push('o');
      } else {
        newRow.push(grid[yCounter][xCounter]);
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
}

// const testSandTotalPart2 = simulateSandPart2(testInput);
// console.log('Test tart 2 shoult be 93:', testSandTotalPart2);

const inputSandTotalPart2 = simulateSandPart2(input);
console.log('Part 2:', inputSandTotalPart2);
