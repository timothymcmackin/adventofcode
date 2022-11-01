const { puzzleInput } = require('./inputs/input15');

const testCaseInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const processInput = (inputString) => {
  var returnMap = inputString.split('\n').map((oneString) => oneString.split('').map(Number));
  returnMap[0][0] = 0; // Starting point doesn't count
  return returnMap;
}

const getSafestPath = (map, visited = [[0, 0]]) => {
  const maxRow = map.length - 1;
  const maxCol = map[0].length - 1;
  const lastStep = visited[visited.length - 1];
  const row = lastStep[0];
  const col = lastStep[1];
  const valueAtThisStep = map[row][col];
  // If we're next to the end, return the risk to move to the end
  if ((row === maxRow && col + 1 === maxCol) || (row + 1 === maxRow && col === maxCol)) {
    return map[maxRow][maxCol];
  }
  // Otherwise, return the shortest path to the exit
  // Get the possible next steps
  // No diagonals
  var nextSteps = [];
  // nextSteps.push([row - 1, col]);
  nextSteps.push([row + 1, col]);
  // nextSteps.push([row, col - 1])
  nextSteps.push([row, col + 1]);
  // Filter out impossible steps
  nextSteps = nextSteps.filter((oneStep) =>
    oneStep[0] >= 0 && oneStep[0] <= maxRow && oneStep[1] >=0 && oneStep[1] <= maxCol
  );
  // Filter out already visited places
  nextSteps = nextSteps.filter((oneStep) =>
    visited.every((oneVisited) => {
      return oneVisited[0] !== oneStep[0] || oneVisited[1] !== oneStep[1]
    })
  );
  // Return lowest path to the target
  if (nextSteps.length > 0) {
    const nextStepResultsArray = nextSteps.map((oneStep) => {
      const updatedNextSteps = visited.concat([oneStep]);
      return getSafestPath(map, updatedNextSteps);
    }).filter(isFinite);
    return valueAtThisStep + Math.min(...nextStepResultsArray);
  } else {
    return null;
  }
}

// Try cutting the problem in half by getting the safest route to the diagonal line running from SW to NE
// Use the fact that the map is a square
const getDiagonals = (map) => {
  var diagonalLocations = [];
  const rowLength = map[0].length;
  for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
    diagonalLocations.push([rowCounter, rowLength - rowCounter - 1]);
  }
  return diagonalLocations;
}

const getDiagonalsFromRowIndex = (rowIndex) => {
  var diagonalLocations = [];
  for (let i = rowIndex; i >= 0; i--) {
    diagonalLocations.push([i, rowIndex - i]);
  }
  return diagonalLocations;
}

// Get the value of the safest path to a given point on the diagonal
const getSafestPathTo = (map, targetLocation, visited = [[0, 0]]) => {
  const maxRow = map.length - 1;
  const maxCol = map[0].length - 1;
  const lastStep = visited[visited.length - 1];
  const row = lastStep[0];
  const col = lastStep[1];
  const targetRow = targetLocation[0];
  const targetCol = targetLocation[1];
  const valueAtThisStep = map[row][col];
  // If we're next to the target, return the risk to move there
  if ((row === targetRow && col + 1 === targetCol) || (row + 1 === targetRow && col === targetCol)) {
    return valueAtThisStep + map[targetRow][targetCol];
  }
  // Otherwise, return the shortest path to the exit
  // Get the possible next steps
  // No diagonals, and for now assume never moving N or W
  var nextSteps = [];
  // nextSteps.push([row - 1, col]);
  nextSteps.push([row + 1, col]);
  // nextSteps.push([row, col - 1])
  nextSteps.push([row, col + 1]);
  // Filter out impossible steps
  nextSteps = nextSteps.filter((oneStep) =>
    oneStep[0] >= 0 && oneStep[0] <= targetRow && oneStep[0] <= maxRow && oneStep[1] >=0 && oneStep[1] <= targetCol && oneStep[1] <= maxCol
  );
  // Filter out already visited places
  nextSteps = nextSteps.filter((oneStep) =>
    visited.every((oneVisited) => {
      return oneVisited[0] !== oneStep[0] || oneVisited[1] !== oneStep[1]
    })
  );
  // Return lowest path to the target
  if (nextSteps.length > 0) {
    const nextStepResultsArray = nextSteps.map((oneStep) => {
      const updatedNextSteps = visited.concat([oneStep]);
      return getSafestPathTo(map, targetLocation, updatedNextSteps);
    }).filter(isFinite);
    const minToTarget = Math.min(...nextStepResultsArray);
    const returnValue = valueAtThisStep + minToTarget;
    return returnValue;
  } else {
    return null;
  }

}

const duplicateMap = (map) => JSON.parse(JSON.stringify(map));

// Do the map halfway by setting the values at the diagonal to the min risk to get there
const goHalfway = (map, diagonals) => {
  const maxRow = map.length - 1;
  const maxCol = map[0].length - 1;
  var diagonalMap = duplicateMap(map);
  diagonals.forEach((targetLocation) => {
    const targetRow = targetLocation[0];
    const targetCol = targetLocation[1];
    diagonalMap[targetRow][targetCol] = getSafestPathTo(map, targetLocation);
  });

  console.log('Halfway!');

  // Go the rest of the way
  var allTheWayMap = duplicateMap(diagonalMap);
  diagonals.forEach((targetLocation) => {
    const targetRow = targetLocation[0];
    const targetCol = targetLocation[1];
    const diagonalsWithCurrent = diagonals.concat([targetLocation]);
    allTheWayMap[targetRow][targetCol] = getSafestPathTo(allTheWayMap, [maxRow, maxCol], diagonalsWithCurrent);
  });

  // Get the safest of the diagonals
  const risks = diagonals.map((oneDiag) => allTheWayMap[oneDiag[0]][oneDiag[1]]);
  return Math.min(...risks);
}

// Go through the SW/NE line to get the min risk to get to each spot in that diagonal
const goByDiagonals = (passedMap) => {
  var map = duplicateMap(passedMap);
  for (let diagonalCounter = 2; diagonalCounter < map[0].length - 1; diagonalCounter++) {
    var diagonalMap = duplicateMap(map);
    const diagonals = getDiagonalsFromRowIndex(diagonalCounter);

    // TODO calculate the values for that diagonal
    // First iteration is [0,2] [1,1] [2,0]
    // If there's a number above, consider it as a path
    // If  there's a number to the left, consider it

    map = duplicateMap(diagonalMap);
    
    
  }
}

// Rework the map to set the diagonal line to 

const testCaseMap = processInput(testCaseInput);
// console.assert(getSafestPath(testCaseMap) === 40, 'test case failed');
// console.assert(getSafestPathTo(testCaseMap, [9,9]) === 40, 'test case failed with new logic');
// console.assert(getSafestPathTo(testCaseMap, [0,9]) === 36, 'test case for getSafestPathTo failed');
// const diagonalLocationsTestCase = getDiagonals(testCaseMap);
// console.assert(goHalfway(testCaseMap, diagonalLocationsTestCase) === 40, 'test case for goHalfway failed');
// const puzzleMap = processInput(puzzleInput);
// const diagonalLocationsPuzzle = getDiagonals(puzzleMap);
// console.log(goHalfway(puzzleMap, diagonalLocationsPuzzle));

goByDiagonals(testCaseMap);