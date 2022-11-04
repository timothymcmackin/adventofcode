const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync(path.resolve(__dirname, './inputs/6.txt'), 'utf8').split('\n');
const coords = input.map((str) => [
  Number(str.split(',')[0]),
  Number(str.split(',')[1].trim()),
]);

// Find the coordinate that has the largest area via manhattan distance
// Calculate the number of points that are closer to this coord than any other?
// Not infinite, so we can eliminate the 4 coords at the edges
// That could help trim down the size of the problem

const smallestX = coords.reduce((currentSmallest, currentCoord) =>
  Math.min(currentSmallest, currentCoord[0])
);
const largestX = coords.reduce((currentLargest, currentCoord) =>
  Math.max(currentLargest, currentCoord[0])
);
const smallestY = coords.reduce((currentSmallest, currentCoord) =>
  Math.min(currentSmallest, currentCoord[1])
);
const largestY = coords.reduce((currentLargest, currentCoord) =>
  Math.max(currentLargest, currentCoord[1])
);