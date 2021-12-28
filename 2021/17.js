
// Location:

const { max } = require("lodash");

/*
{
  x: 5,
  y: 3,
}
targetArea:
{
  1: {
    x: 5,
    y: 3,
  },
  2: {
    x: 10,
    y: 7,
  }
}
*/
const isProbeInTargetArea = (location, targetArea) => {
  const { x, y } = location;
  const { x: t1x, y: t1y } = targetArea['1'];
  const { x: t2x, y: t2y } = targetArea['2'];
  const minX = Math.min(t1x, t2x);
  const maxX = Math.max(t1x, t2x);
  const minY = Math.min(t1y, t2y);
  const maxY = Math.max(t1y, t2y);
  return (x <= maxX && x >= minX && y <= maxY && y >= minY);
}

const doesProbeStopInTargetArea = (initial, targetArea) => {
  var { x: vX, y: vY } = initial;
  var x = 0;
  var y = 0;
  const { x: t1x, y: t1y } = targetArea['1'];
  const { x: t2x, y: t2y } = targetArea['2'];

  var highestYReached = 0;
  var keepGoing = true;
  while (keepGoing) {
    x += vX;
    y += vY;
    vX = vX === 0 ? 0 : vX - 1;
    vY -= 1;
    highestYReached = Math.max(highestYReached, y);
    if (isProbeInTargetArea({ x, y }, targetArea)) {
      return highestYReached;
    }
    // If Y is still above the max Y and X < min X, the initial Y is too high and anything higher will not work, so stop increasing y
    // if (y > Math.max(t1y, t2y) && x < Math.min(t1x, t2x) && vX === 0) {
    //   return 'no bigger ys';
    // }

    // If we've missed the target, return 0
    if (x > Math.max(t1x, t2x) || y < Math.min(t1y, t2y)) {
      return 0;
    }

  }
  return 0;
}

const doesProbeStopInTargetAreaTrueFalse = (initial, targetArea) => {
  var { x: vX, y: vY } = initial;
  var x = 0;
  var y = 0;
  const { x: t1x, y: t1y } = targetArea['1'];
  const { x: t2x, y: t2y } = targetArea['2'];

  var keepGoing = true;
  while (keepGoing) {
    x += vX;
    y += vY;
    vX = vX === 0 ? 0 : vX - 1;
    vY -= 1;
    if (isProbeInTargetArea({ x, y }, targetArea)) {
      return true;
    }
    // If Y is still above the max Y and X < min X, the initial Y is too high and anything higher will not work, so stop increasing y
    // if (y > Math.max(t1y, t2y) && x < Math.min(t1x, t2x) && vX === 0) {
    //   return 'no bigger ys';
    // }

    // If we've missed the target, return 0
    if (x > Math.max(t1x, t2x) || y < Math.min(t1y, t2y)) {
      return false;
    }

  }
  return false;
}

const convertTargetArea = (str) => {
  const halves = str.split(', ');
  // NW corner is the smallest X and largest (closest to zero) y
  // SE corner is the largest X and smallest Y
  const xString = halves.find((oneHalf) => oneHalf.split('=')[0] === 'x');
  const yString = halves.find((oneHalf) => oneHalf.split('=')[0] === 'y');
  const xs = xString.split('=')[1].split('..').map(Number);
  const ys = yString.split('=')[1].split('..').map(Number);
  return {
    1: {
      x: Math.min(...xs),
      y: Math.max(...ys),
    },
    2: {
      x: Math.max(...xs),
      y: Math.min(...ys),
    }
  };
}

const getHighestY = (targetArea) => {
  const { x: t1x, y: t1y } = targetArea['1'];
  const { x: t2x, y: t2y } = targetArea['2'];
  // Set the max X to the farthest point of the target area
  const maxInitialX = Math.max(t1x, t2x);
  const maxInitialY = 1000;

  var maxY = 0;
  for (let xCounter = 0; xCounter <= maxInitialX; xCounter++) {
    for (let yCounter = 0; yCounter <= maxInitialY; yCounter++) {
      const maxForThisStart = doesProbeStopInTargetArea({
        x: xCounter,
        y: yCounter,
      }, targetArea);
      if (isFinite(maxForThisStart)) {
        maxY = Math.max(maxY, maxForThisStart);
      }
    }
  }
  return maxY;
}

const getNumberOfSuccessfulInitialVelocities = (targetArea) => {
  const { x: t1x, y: t1y } = targetArea['1'];
  const { x: t2x, y: t2y } = targetArea['2'];
  // Set the max X to the farthest point of the target area
  const maxInitialX = Math.max(t1x, t2x);
  const maxInitialY = 1000;
  var hitCounter = 0;
  for (let xCounter = 0; xCounter <= maxInitialX; xCounter++) {
    var keepGoing = true;
    var yCounter = Math.min(t1y, t2y);
    while (keepGoing && yCounter < maxInitialY) {
      const result = doesProbeStopInTargetAreaTrueFalse({
        x: xCounter,
        y: yCounter,
      }, targetArea);
      if (isFinite(result) && result > 0) {
        hitCounter++;
      }
      if (result === 'no bigger ys') {
        keepGoing = false;
      }
      yCounter++;
    }
  }
  return hitCounter;
}

const testCaseTargetAreaString = 'x=20..30, y=-10..-5';
const puzzleTargetAreaString = 'x=70..96, y=-179..-124';
const testCaseTargetArea = convertTargetArea(testCaseTargetAreaString);
const puzzleTargetArea = convertTargetArea(puzzleTargetAreaString);
console.assert(doesProbeStopInTargetArea({x: 6, y: 9}, testCaseTargetArea) === 45, 'test case 1');
console.assert(getHighestY(puzzleTargetArea) === 15931, 'part 1 failed');
console.log(getNumberOfSuccessfulInitialVelocities(puzzleTargetArea));
// 282 too low
