const fs = require('fs');
const path = require('path');

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/9.txt'), 'utf8');

const testString = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const testInput = testString.split('\n').map((line) => line.split(' '));
const input = inputString.split('\n').map((line) => line.split(' '));

// Given a location, add it to the list if it's not already in there
const addLocation = (locations, x, y) => {
  if (locations.some((l) => l.x === x && l.y === y)) {
    return locations;
  }
  return locations.concat(({ x, y }));
};

const getTailLocations = (input) => {
  let locations = [];
  let headX = 0;
  let headY = 0;
  let tailX = 0;
  let tailY = 0;

  for (const [dir, valueStr] of input) {
    const value = Number(valueStr);
    // Iterate for each step of the head's movement
    for (let i = 0; i < value; i++) {
      switch (dir) {
        case 'U':
          headY--;
          break;
        case 'D':
          headY++;
          break;
        case 'L':
          headX--;
          break;
        case 'R':
          headX++;
          break;
      }
      // If they're on the same spot or within 1, do nothing
      let closeEnough = false;
      if (headX === tailX && Math.abs(headY - tailY) <= 1) {
        // Same row, adjacent columns
        closeEnough = true;
      }
      if (headY === tailY && Math.abs(headX - tailX) <= 1) {
        // Same column, adjacent rows
        closeEnough = true;
      }
      if (Math.abs(headX - tailX) <= 1 && Math.abs(headY - tailY) <= 1) {
        // Diagonally adjacent
        closeEnough = true;
      }

      // If they're not, move the tail one step
      if (!closeEnough) {
        if (headX === tailX) {
          // Same column
          if (headY > tailY) {
            tailY++;
          }
          if (headY < tailY) {
            tailY--;
          }
        } else if (headY === tailY) {
          // Same row
          if (headX > tailX) {
            tailX++;
          }
          if (headX < tailX) {
            tailX--;
          }
        } else {
          // Diagonal, so move diagonal
          if (headX > tailX) {
            tailX++;
          }
          if (headX < tailX) {
            tailX--;
          }
          if (headY > tailY) {
            tailY++;
          }
          if (headY < tailY) {
            tailY--;
          }
        }

        // Add the tail's location to the list
      }
      locations = addLocation(locations, tailX, tailY);
      
    }

  }
  return locations.length;
};

console.log(getTailLocations(testInput), 'should be 13');
console.log('Part 1:', getTailLocations(input));