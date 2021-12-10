const { puzzleInput } = require('./inputs/input9');
const _ = require('lodash');

const testCaseInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

// Your first goal is to find the low points - the locations that are lower than any of its adjacent locations.

const getLowPoints = (input) => {
  // Make the input into an array
  const inputByLines = input.split('\n');
  const map = inputByLines.map((oneLine) => {
    var stringArray = oneLine.split('');
    var numArray = stringArray.map((str) => parseInt(str));
    return numArray;
  });

  var lowPoints = [];
  // find points that have no lower point touching them
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const currentRow = map[rowIndex];
    for (let colIndex = 0; colIndex < map[0].length; colIndex++) {
      if (isLowPoint(rowIndex, colIndex, map)) {
        lowPoints.push(currentRow[colIndex]);
      }
    }
  }
  return lowPoints;
}

// Given coordinates, return true if it's a low point
const isLowPoint = (rowIndex, colIndex, map) => {
  var neighbors = [];
  const pointNumber = map[rowIndex][colIndex];
  // Get items in same row
  if (colIndex > 0) {
    neighbors.push(map[rowIndex][colIndex - 1]);
  }
  if (colIndex < map[rowIndex].length - 1) {
    neighbors.push(map[rowIndex][colIndex + 1]);
  }
  // Get items in same column
  if (rowIndex > 0) {
    neighbors.push(map[rowIndex - 1][colIndex]);
  }
  if (rowIndex < map.length - 1) {
    neighbors.push(map[rowIndex + 1][colIndex]);
  }
  return neighbors.every((num) => num > pointNumber);
}

// Part 2: get the basins
const get3TopBasins = (input) => {
  // Make the input into an array
  const inputByLines = input.split('\n');
  const map = inputByLines.map((oneLine) => {
    var stringArray = oneLine.split('');
    var numArray = stringArray.map((str) => parseInt(str));
    return numArray;
  });

  const lowPoints = [];
  // find points that have no lower point touching them
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const currentRow = map[rowIndex];
    for (let colIndex = 0; colIndex < map[0].length; colIndex++) {
      if (isLowPoint(rowIndex, colIndex, map)) {
        lowPoints.push({ rowIndex, colIndex });
      }
    }
  }

  // Get the basin sizes of the low points
  const lowPointsWithBasinInfo = lowPoints.map(({ rowIndex, colIndex }) => ({
    rowIndex,
    colIndex,
    basinSize: getBasinSize({ rowIndex, colIndex }, map),
  }));

  const sortedBasins = _.sortBy(lowPointsWithBasinInfo, ({ basinSize }) => basinSize);
  var top3Basins = [];
  top3Basins.push(sortedBasins.pop());
  top3Basins.push(sortedBasins.pop());
  top3Basins.push(sortedBasins.pop());

  console.log(top3Basins)

  return top3Basins.reduce((total, currentBasin) => total * currentBasin.basinSize, 1);

  // const basin1 = filterOutDuplicates(getBasinMembers({ rowIndex: 0, colIndex: 1 }, map));
  
  // console.log(lowPointsWithBasinInfo);
}

// Calculate the basin size starting with the location of the low point and recurse from there
const getBasinSize = (lowPoint, map) => {
  const basinMembers = filterOutDuplicates(getBasinMembers(lowPoint, map));
  return basinMembers.length;
}

const getBasinMembers = ({ rowIndex, colIndex }, map, alreadyInTheBasin = []) => {
  if (isLowPoint(rowIndex, colIndex, map)) {
    alreadyInTheBasin.push({ rowIndex, colIndex });
  }
  var neighbors = [];
  const pointNumber = map[rowIndex][colIndex];
  // Get items in same row
  if (colIndex > 0) {
    neighbors.push({
      rowIndex,
      colIndex: colIndex - 1,
    });
  }
  if (colIndex < map[rowIndex].length - 1) {
    neighbors.push({
      rowIndex,
      colIndex: colIndex + 1,
    });
  }
  // Get items in same column
  if (rowIndex > 0) {
    neighbors.push({
      rowIndex: rowIndex - 1,
      colIndex: colIndex,
    });
  }
  if (rowIndex < map.length - 1) {
    neighbors.push({
      rowIndex: rowIndex + 1,
      colIndex: colIndex,
    });
  }
  // const uniqueNeighbors = _.uniqBy(neighbors, ({ rowIndex, colIndex }) => (rowIndex * 10000) + colIndex );
  // Remove neighbors that have already been tested
  const neighborsNoDuplicates = neighbors.filter(({ rowIndex, colIndex }) => 
    !alreadyInTheBasin.some(({ rowIndex: ri, colIndex: ci }) => rowIndex === ri && colIndex === ci)
  );
  // Remove neighbors that are higher than this point
  const neighborsToCheck = neighborsNoDuplicates.filter(({ rowIndex, colIndex }) => {
    const neighborValue = map[rowIndex][colIndex];
    return neighborValue > pointNumber && neighborValue < 9
  });

  // TODO this filter is not working -- duplicates are in neighborsToCheck

  // Add neighbors to the basin
  alreadyInTheBasin.push(...neighborsToCheck);

  // Check those neighbors
  neighborsToCheck.forEach((oneNeighbor) => {
    alreadyInTheBasin.push(...getBasinMembers(oneNeighbor, map, alreadyInTheBasin));
  });

  return filterOutDuplicates(alreadyInTheBasin);

}

function filterOutDuplicates(list) {
  return _.uniqBy(list, ({ rowIndex, colIndex }) => (rowIndex * 10000) + colIndex );
}

const testCaseLowPoints = getLowPoints(testCaseInput);
console.assert(testCaseLowPoints.reduce((total, num) => total + num + 1, 0) === 15, 'test case failed');
// console.log(getLowPoints(puzzleInput).reduce((total, num) => total + num + 1, 0))
console.log(get3TopBasins(puzzleInput))