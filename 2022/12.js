const { find_path } = require('dijkstrajs');
const fs = require('fs');
const path = require('path');

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/12.txt'), 'utf8');

const testInputString = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

// This is where AoC leaves non-pro programmers in the dust.
// Had to look up Dijkstra's algorithm and how to use it, so I'm learning things!

const processInputString = (str) => {
  let map = str.split('\n').map((oneLineStr) => oneLineStr.split(''));
  // Your current position (S) has elevation a, and the location that should get the best signal (E) has elevation z.
  let startX, startY;
  let endX, endY;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const cell = map[y][x];
      if (cell === 'S') {
        map[y][x] = 'a';
        startY = y;
        startX = x;
      }
      if (cell === 'E') {
        map[y][x] = 'z';
        endX = x;
        endY = y;
      }
    }
  }
  return { startX, startY, endX, endY, map };
};

// Given a grid, create a graph for the algorithm

// From https://github.com/tcort/dijkstrajs/blob/master/test/dijkstra.test.js
/*
var graph = {
    a: {b: 10, d: 1},
    b: {a: 1, c: 1, e: 1},
    c: {b: 1, f: 1},
    d: {a: 1, e: 1, g: 1},
    e: {b: 1, d: 1, f: 1, h: 1},
    f: {c: 1, e: 1, i: 1},
    g: {d: 1, h: 1},
    h: {e: 1, g: 1, i: 1},
    i: {f: 1, h: 1}
};
var path = find_path(graph, 'a', 'i');
expect(path).to.eql(['a', 'd', 'e', 'f', 'i']);
*/
const getShortestPathLength = ({ startX, startY, endX, endY, map }) => {
  // Set up a grid of keys for the graph
  // Is there a better way to get a unique key for the graph for each cell?
  let keyCounter = 0;
  let keys = [];
  for (let y = 0; y < map.length; y++) {
    keys[y] = [];
    for (let x = 0; x < map[0].length; x++) {
      keys[y].push(keyCounter);
      keyCounter++;
    }
  }

  // Add each cell to the graph
  let graph = {};
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      // Get the adjoining cells and their scores
      let potentialTargetCells = [];
      if (y > 0) {
        potentialTargetCells.push({
          key: keys[y - 1][x],
          letter: map[y - 1][x],
        });
      }
      if (y < map.length - 1) {
        potentialTargetCells.push({
          key: keys[y + 1][x],
          letter: map[y + 1][x],
        });
      }
      if (x > 0) {
        potentialTargetCells.push({
          key: keys[y][x - 1],
          letter: map[y][x - 1],
        });
      }
      if (x < map[0].length - 1) {
        potentialTargetCells.push({
          key: keys[y][x + 1],
          letter: map[y][x + 1],
        });
      }
      // Add the ones that are no more than 1 step up to the graph
      // We can only go up one letter but down any number of letters
      const currentCellKey = keys[y][x];
      const currentCellLetter = map[y][x];
      const currentCellScore = alpha.indexOf(currentCellLetter);
      // Filter out paths that are more than +1 letter up
      // Does this mess up the algorithm because it creates one-way paths?
      // Should I make impossible letter steps infinity?
      const validTargetKeys = potentialTargetCells.filter(({ letter }) => {
        const targetIndex = alpha.indexOf(letter);
        // If the target cell is no more than one letter up, it's a valid path
        return targetIndex <= currentCellScore + 1;
      }).map(({ key }) => key);
      // Add to the graph
      const graphAddition = validTargetKeys.reduce((obj, key) => {
        obj[key] = 1;
        return obj;
      }, {});
      graph[currentCellKey] = graphAddition;
    }
  }

  // Use the algorithm to find the shortest path
  const keyOfStart = keys[startY][startX];
  const keyOfEnd = keys[endY][endX];
  const shortestPath = find_path(graph, keyOfStart, keyOfEnd).map(Number);

  // Print path to compare with illustration from instructions
  // let placesStepped = JSON.parse(JSON.stringify(keys));
  // for (let y = 0; y < placesStepped.length; y++) {
  //   for (let x = 0; x < placesStepped[0].length; x++) {
  //     placesStepped[y][x] = shortestPath.includes(placesStepped[y][x]) ? 'X' : '.';
  //   }
  // }
  // console.log(placesStepped.map((oneRow) => oneRow.join('')).join('\n'));
  // Path is equivalent to the example

  return shortestPath;
}

const testInput = processInputString(testInputString);
const shortestTestPath = getShortestPathLength(testInput);
console.log(shortestTestPath.length, 'should be 31');
const input = processInputString(inputString);
const shortestInputPath = getShortestPathLength(input);
console.log('Part 1:', shortestInputPath.length);
// 473 is too high