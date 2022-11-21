const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync(path.resolve(__dirname, './inputs/10.txt'), 'utf8');

const testInput = `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`;

const positionRegex = /position=<\s?(-?\d*),\s+(-?\d*)>\svelocity=<\s?(-?\d*),\s+(-?\d*)>/;

const getCoords = (inputText) => inputText.split('\n').map((oneLine) => {
  const result = positionRegex.exec(oneLine);
  const [xPos, yPos, xV, yV] = result.slice(1);
  return {
    xPos: Number(xPos), yPos: Number(yPos), xV: Number(xV), yV: Number(yV),
  };
});

const iteratePoints = (passedData, maxIterations) => {
  let i = 0;
  let data = JSON.parse(JSON.stringify(passedData));
  let keepGoing = true;
  let prevHeight = 100000000000;
  let prevWidth = 100000000000;
  let print = false;
  let newData;
  while (keepGoing && i < maxIterations) {

    // Iterate the data
    newData = data.map(({ xPos, yPos, xV, yV }) => ({
      xPos: xPos + xV,
      yPos: yPos + yV,
      xV,
      yV,
    }));

    // Maybe we can tell when to stop by when the width and height get smaller and then larger again?
    const minX = Math.min(...newData.map(({ xPos }) => xPos));
    const maxX = Math.max(...newData.map(({ xPos }) => xPos));
    const minY = Math.min(...newData.map(({ yPos }) => yPos));
    const maxY = Math.max(...newData.map(({ yPos }) => yPos));
    const width = maxX - minX;
    const height = maxY - minY;

    console.log(width, 'x', height);
    if (width > prevWidth && height > prevHeight) {
      console.log('iterations:', i);
      printData(data, i);
      keepGoing = false;
    }
    prevHeight = height;
    prevWidth = width;
    data = JSON.parse(JSON.stringify(newData));

    i++;
  }
};

const printData = (data, iterations) => {
  const minX = Math.min(...data.map(({ xPos }) => xPos));
  const maxX = Math.max(...data.map(({ xPos }) => xPos));
  const minY = Math.min(...data.map(({ yPos }) => yPos));
  const maxY = Math.max(...data.map(({ yPos }) => yPos));
  let grid = [];
  for (let i = minY; i <= maxY; i++) {
    grid[i] = [];
    for (let j = minX; j <= maxX; j++) {
      grid[i][j] = '.';
    }
  }

  data.forEach(({ xPos, yPos }) => grid[yPos][xPos] = '*');
  console.log();
  console.log(grid.map((oneLine) => oneLine.join('')).join('\n'));
  console.log(iterations);
  console.log();
};

const testCoords = getCoords(testInput);
const inputCoords = getCoords(input);
iteratePoints(inputCoords, 10000000000);
// RBCZAEPP