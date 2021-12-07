const testCasePositions = [16,1,2,0,4,2,7,1,2,14];

const { puzzlePositions } = require('./inputs/input7');

// Align the positions by making the fewest number of changes

const getFuelRequiredToMoveToPosition = (positions, targetPosition) => positions.reduce((sum, onePosition) => 
  // sum + Math.abs(onePosition - targetPosition)
  sum + getFuelRequiredToMoveOneSub(Math.abs(onePosition - targetPosition))
, 0);

// In part 2, the first step costs 1, the second step costs 2, and so on
const getFuelRequiredToMoveOneSub = (distance) => 
  distance <= 1 ? distance : distance + getFuelRequiredToMoveOneSub(distance - 1); 

const getPositionWithLeastRequiredFuel = (positions) => {
  const minPosition = Math.min(...positions);
  const maxPosition = Math.max(...positions);
  var bestPosition = minPosition;
  var bestPositionRequiredFuel = getFuelRequiredToMoveToPosition(positions, minPosition);
  for (let currentPosition = minPosition + 1; currentPosition <= maxPosition; currentPosition++) {
    const fuelAtPosition = getFuelRequiredToMoveToPosition(positions, currentPosition);
    if (fuelAtPosition < bestPositionRequiredFuel) {
      bestPosition = currentPosition;
      bestPositionRequiredFuel = fuelAtPosition;
    }
  }
  return {
    bestPosition,
    bestPositionRequiredFuel,
  }
}

console.assert(getFuelRequiredToMoveToPosition(testCasePositions, 5) === 168, 'test case 5 failed');
console.assert(getFuelRequiredToMoveToPosition(testCasePositions, 2) === 206, 'test case 2 failed');
console.assert(getPositionWithLeastRequiredFuel(testCasePositions).bestPosition === 5, 'test case failed to get 2 as best position');

console.log(getPositionWithLeastRequiredFuel(puzzlePositions));
