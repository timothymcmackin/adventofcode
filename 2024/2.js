const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, './input/2.txt'), 'utf8');

const testInputString = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const processInput = (inputStr) => inputStr
  .split('\n')
  .map((x) => x.split(' ').map((s) => parseInt(s)));

// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.
const isLevelSafe = (passedLevel) => {
  const level = JSON.parse(JSON.stringify(passedLevel));
  let increasing = false;
  let decreasing = false;
  let prev = level.shift();
  while(level.length > 0) {
    let current = level.shift();
    if (prev < current) {
      increasing = true;
    }
    if (prev > current) {
      decreasing = true;
    }
    if (increasing && decreasing) {
      return false;
    }
    let diff = Math.abs(prev - current);
    if (diff > 3 || diff == 0) {
      return false;
    }
    prev = current;
  }
  return true;
}

// In part 2 you can omit one number and still be safe
const isLevelSafePart2 = (passedLevel) => {
  if (isLevelSafe(passedLevel)) {
    return true;
  }
  const level = JSON.parse(JSON.stringify(passedLevel));

  // Remove one number at a time and test
  // Easier than trying to omit numbers and continue through
  for (let i = 0; i < level.length; i++) {
    // Get a list minus that one number
    let listWithoutOne = level.filter((_n, index) => index != i);
    if (isLevelSafe(listWithoutOne)) {
      return true;
    }
  }
  return false;
}

const countSafeLevels = (levels) => levels
  .map(isLevelSafe)
  .filter((l) => !!l)
  .length;

const countSafeLevelsPart2 = (levels) => levels
  .map(isLevelSafePart2)
  .filter((l) => !!l)
  .length;

const testInput = processInput(testInputString);
const input = processInput(rawInput);

if (countSafeLevels(testInput) != 2) {
  console.log('Part 1 test failed; got', countSafeLevels(testInput));
} else {
  console.log('Part 1:', countSafeLevels(input));
}

if (countSafeLevelsPart2(testInput) != 4) {
  console.log('Part 2 test failed; got', countSafeLevelsPart2(testInput));
} else {
  console.log('Part 2:', countSafeLevelsPart2(input));
}
// 611 too low
