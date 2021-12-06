const {puzzleLineSegments} = require('./inputs/input5');

// x1, y1, x2, y2
const testCaseLineSegments = [
  [0,9,5,9],
  [8,0,0,8],
  [9,4,3,4],
  [2,2,2,1],
  [7,0,7,4],
  [6,4,2,0],
  [0,9,2,9],
  [3,4,1,4],
  [0,0,8,8],
  [5,5,8,2],
];

const getGridMaxX = (segments) => 
  segments.reduce((maxX, oneSegment) => Math.max(maxX, oneSegment[0], oneSegment[2]), 0);
const getGridMaxY = (segments) => 
  segments.reduce((maxY, oneSegment) => Math.max(maxY, oneSegment[1], oneSegment[3]), 0);
const getStartingGrid = (segments) => {
  const maxX = getGridMaxX(segments);
  const maxY = getGridMaxY(segments);
  var sampleRow = [];
  for (let i = 0; i <= maxX; i++) {
    sampleRow.push(0);
  }
  var grid = [];
  for (let i = 0; i <= maxY; i++) {
    grid.push([...sampleRow]);
  }
  return grid;
}

function getGrid(segments) {
  var startingGrid = getStartingGrid(segments);
  return segments.reduce((grid, oneSegment) => {
    const x1 = oneSegment[0];
    const x2 = oneSegment[2];
    const y1 = oneSegment[1];
    const y2 = oneSegment[3];
    if (x1 === x2) {
      // vertical line
      const startY = Math.min(y1, y2);
      const endY = Math.max(y1, y2);
      for (let index = startY; index <= endY; index++) {
        grid[index][x1]++;
      }
    } else if (y1 === y2) {
      // Horizontal line
      const startX = Math.min(x1, x2);
      const endX = Math.max(x1, x2);
      for (let index = startX; index <= endX; index++) {
        grid[y1][index]++;
      }
    } else {
      // Diagonal segment
      // Always 45 degrees
      // Flip if they go right to left
      const xDirection = x2 - x1;
      const yDirection = y2 - y1;
      var counter = Math.abs(x1 - x2);
      var currentX = x1;
      var currentY = y1;
      while(counter >= 0) {
        grid[currentY][currentX] += 1;
        currentX = iterate(currentX, xDirection);
        currentY = iterate(currentY, yDirection);
        counter--;
      }
    }
    return grid;
  }, startingGrid);
}

// Util function to iterate when I don't know which direction
function iterate(value, direction) {
  return direction < 0 ? value - 1 : value + 1;
}

const getOverlapGreaterThan = (grid, max) => 
  grid.reduce((total, oneRow) => 
    total + oneRow.reduce((rowCount, oneNumber) => 
      oneNumber >= max ? rowCount + 1 : rowCount
    , 0)
  , 0);

const testCaseGrid = getGrid(testCaseLineSegments);
const puzzleGrid = getGrid(puzzleLineSegments);
console.assert(getOverlapGreaterThan(testCaseGrid, 2) === 12, 'Test case grid should be 12');
console.log(getOverlapGreaterThan(puzzleGrid, 2));