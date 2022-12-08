const fs = require('fs');
const path = require('path');

const testInputString = `30373
25512
65332
33549
35390`;

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/8.txt'), 'utf8');

const processString = (str) => str
  .split('\n')
  .map((strLine) => strLine.split('').map(Number));

// I guess start by brute-forcing it?
// A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.
const bruteForceVisibleTrees = (grid) => {
  let visibleTrees = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isTreeVisible(grid, x, y)) {
        visibleTrees.push(grid[y][x]);
      }
    }
  }
  return visibleTrees.length;
};

const isTreeVisible = (grid, x, y) => {
  // Trees on the edge are visible
  if (x === 0 || y === 0 || x === grid[0].length - 1 || y === grid.length - 1) {
    return true;
  }
  const treeHeight = grid[y][x];
  // Check same row
  const treesPriorRow = grid[y].slice(0, x);
  if (Math.max(...treesPriorRow) < treeHeight) {
    return true;
  }
  const treesPostRow = grid[y].slice(x + 1);
  if (Math.max(...treesPostRow) < treeHeight) {
    return true;
  }
  // Check same column
  const allTreesInColumn = grid.map((oneRow) => oneRow[x]);
  const treesPriorCol = allTreesInColumn.slice(0, y);
  if (Math.max(...treesPriorCol) < treeHeight) {
    return true;
  }
  const treesPostCol = allTreesInColumn.slice(y + 1);
  if (Math.max(...treesPostCol) < treeHeight) {
    return true;
  }

  return false;
};

// There feel like smarter ways to do this, like removing trees that are not visible
// But that messes up my grid

const testInput = processString(testInputString);
const testTreeVisibleNumber = bruteForceVisibleTrees(testInput);
console.log(testTreeVisibleNumber, 'should be 21');

const input = processString(inputString);
const inputTreeVisibleNumber = bruteForceVisibleTrees(input);
console.log('part 1:', inputTreeVisibleNumber, 'should be 1816');

// Part 2 brute force
// A tree's scenic score is found by multiplying together its viewing distance in each of the four directions. For this tree, this is 4 (found by multiplying 1 * 1 * 2 * 2).
// If a tree is right on the edge, at least one of its viewing distances will be zero.
const getScenicScore = (grid, x, y) => {
  if (x === 0 || y === 0 || x === grid[0].length - 1 || y === grid.length - 1) {
    return 0;
  }
  const treeHeight = grid[y][x];
  const treesPriorRow = grid[y].slice(0, x).reverse();
  const treesPostRow = grid[y].slice(x + 1);
  const allTreesInColumn = grid.map((oneRow) => oneRow[x]);
  const treesPriorCol = allTreesInColumn.slice(0, y).reverse();
  const treesPostCol = allTreesInColumn.slice(y + 1);
  
  const score = [treesPriorRow, treesPostRow, treesPriorCol, treesPostCol]
    .reduce((s, arr) => s * getVisibleTrees(treeHeight, arr), 1);
  return score;
}

// Get the number of visible trees
const getVisibleTrees = (treeHeight, trees) => {
  let visibleTrees = 0;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i] < treeHeight) {
      visibleTrees++;
    }
    if (trees[i] >= treeHeight) {
      visibleTrees++;
      return visibleTrees;
    }
  }
  return visibleTrees;
}

const getTopScenicScore = (grid) => {
  let topScore = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const treeScore = getScenicScore(grid, x, y);
      topScore = Math.max(topScore, treeScore);
    }
  }
  return topScore;
}

const testScenicTop = getTopScenicScore(testInput);
console.log(testScenicTop, 'should be 8.');

const inputScenicTop = getTopScenicScore(input);
console.log('Part 2:', inputScenicTop);