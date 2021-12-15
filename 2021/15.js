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

const processInput = (inputString) => inputString.split('\n').map((oneString) => oneString.split('').map(Number));

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

const testCaseMap = processInput(testCaseInput);
console.assert(getSafestPath(testCaseMap) === 40, 'test case failed');

const puzzleMap = processInput(puzzleInput);
console.log(getSafestPath(puzzleMap));


