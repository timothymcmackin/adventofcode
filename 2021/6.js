const testCaseStart = [3,4,3,1,2];
const puzzleInput = [1,1,3,1,3,2,1,3,1,1,3,1,1,2,1,3,1,1,3,5,1,1,1,3,1,2,1,1,1,1,4,4,1,2,1,2,1,1,1,5,3,2,1,5,2,5,3,3,2,2,5,4,1,1,4,4,1,1,1,1,1,1,5,1,2,4,3,2,2,2,2,1,4,1,1,5,1,3,4,4,1,1,3,3,5,5,3,1,3,3,3,1,4,2,2,1,3,4,1,4,3,3,2,3,1,1,1,5,3,1,4,2,2,3,1,3,1,2,3,3,1,4,2,2,4,1,3,1,1,1,1,1,2,1,3,3,1,2,1,1,3,4,1,1,1,1,5,1,1,5,1,1,1,4,1,5,3,1,1,3,2,1,1,3,1,1,1,5,4,3,3,5,1,3,4,3,3,1,4,4,1,2,1,1,2,1,1,1,2,1,1,1,1,1,5,1,1,2,1,5,2,1,1,2,3,2,3,1,3,1,1,1,5,1,1,2,1,1,1,1,3,4,5,3,1,4,1,1,4,1,4,1,1,1,4,5,1,1,1,4,1,3,2,2,1,1,2,3,1,4,3,5,1,5,1,1,4,5,5,1,1,3,3,1,1,1,1,5,5,3,3,2,4,1,1,1,1,1,5,1,1,2,5,5,4,2,4,4,1,1,3,3,1,5,1,1,1,1,1,1];

// Each day, subtract 1
// If the fish is at zero, reset to 6 and create a new lanternfish at 8
// The hard way would be to have a huge array with a number for each fish
// But I think we can just count the number of fish on each day
const getLanternfishTotal = (initialFish, numberOfDays)  => {
  var fishState = [0,0,0,0,0,0,0,0,0];
  fishState = initialFish.reduce((currentFishState, currentFish) => {
    currentFishState[currentFish]++;
    return currentFishState;
  }, fishState);
  for (let dayCounter = 0; dayCounter < numberOfDays; dayCounter++) {
    var oldFishState = [...fishState];
    fishState = [0,0,0,0,0,0,0,0,0];
    for (let fishStateCounter = 0; fishStateCounter < oldFishState.length; fishStateCounter++) {
      const numberOfFishAtState = oldFishState[fishStateCounter];
      // If the fish is zero, reset to 6 and create a new fish at 8
      if (fishStateCounter === 0) {
        fishState[8] += numberOfFishAtState;
        fishState[6] += numberOfFishAtState;
      } else {
        // Progress the fish by a day
        fishState[fishStateCounter-1] += numberOfFishAtState;
      }
    }
  }
  return fishState.reduce((total, num) => total + num, 0);
}

console.assert(getLanternfishTotal(testCaseStart, 18) === 26);
console.assert(getLanternfishTotal(testCaseStart, 80) === 5934);
console.assert(getLanternfishTotal(testCaseStart, 256) === 26984457539);
console.log(getLanternfishTotal(puzzleInput, 256));