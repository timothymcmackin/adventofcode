const path = require('path');
const fs = require('fs');

/*
The power level in a given fuel cell can be found through the following process:

- Find the fuel cell's rack ID, which is its X coordinate plus 10.
- Begin with a power level of the rack ID times the Y coordinate.
- Increase the power level by the value of the grid serial number (your puzzle input).
- Set the power level to itself multiplied by the rack ID.
- Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
- Subtract 5 from the power level.
*/
const getPowerLevel = (x, y, serial) => {
  const rackId = x + 10;
  let result = rackId * y;
  result += serial;
  result *= rackId;
  if (result < 100) {
    result = 0;
  } else {
    const str = new String(result).split('');
    // const hundreds = Number(str.at(-3)); // not a function?
    const hundreds = Number(str[str.length - 3]);
    result = hundreds;
  }
  return result - 5;
};
const powerLevelTestCases = [
  [3, 5, 8, 4],
  [122,79,57, -5],
  [217,196,39, 0],
  [101,153,71, 4],
];
powerLevelTestCases.forEach((arr) => {
  const result = getPowerLevel(...arr.slice(0, 3));
  if (result !== arr[3]) {
    console.log('Test case ', arr, 'failed'); 
  }
});

const assembleCells = (serial) => {
  let grid = [];
  for (let i = 1; i <= 300; i++) {
    grid[i] = [];
    for (let j = 1; j <= 300; j++) {
      grid[i][j] = getPowerLevel(i, j, serial);
    }
  }
  return grid;
};

// Your goal is to find the 3x3 square which has the largest total power. The square must be entirely within the 300x300 grid. Identify this square using the X,Y coordinate of its top-left fuel cell.
const get3x3Values = (grid) => {
  let threex3Vals = [];
  for (let i = 1; i <= 300; i++) {
    threex3Vals[i] = [];
    for (let j = 1; j <= 300; j++) {
      let sum = 0;
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (grid[k] && grid[k][l]) {
            sum += grid[k][l];
          }
        }
      }
      threex3Vals[i][j] = sum;
    }
  }
  return threex3Vals;
};

// Get the x,y of the top left cell of the largest number
const getTopCell = (threex3Vals) => {
  let startingStatus = {
    x: 0,
    y: 0,
    val: 0,
  };
  const topCell = threex3Vals.reduce((runningRowStatus, oneRow, i) =>
    oneRow.reduce((runningColStatus, oneCell, j) =>
    runningColStatus.val > oneCell ? runningColStatus : {
      x: i,
      y: j,
      val: oneCell,
    }
    , runningRowStatus)
  , startingStatus);
  return `${topCell.x - 1},${topCell.y - 1}: ${topCell.val}`;
};
console.log(getTopCell(get3x3Values(assembleCells(3463))))