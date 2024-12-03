const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, './input/1.txt'), 'utf8');

const testcase = `3   4
4   3
2   5
1   3
3   9
3   3`;

const parseInput = (inputStr) => {
  const lines = inputStr.split('\n');
  const sideBySide = lines.map((oneLineStr) => oneLineStr
    .split('   ')
    .map(s => parseInt(s)));
  let col1 = [];
  let col2 = [];
  sideBySide.forEach(([a, b]) => {
    col1.push(a);
    col2.push(b);
  });
  return [col1, col2];
}

// Count the number of instances of a number in a list
const countInstances = (inputList, numberToCount) => inputList.filter((n) => n == numberToCount).length;
// const countInstances = (inputList, numberToCount) => inputList.reduce((count, n) =>
//   n == numberToCount ? count + 1 : n
// , 0);

// Sort the list and get the sum of the distances between the matching items
const runPartOne = (inputStr) => {
  const input = parseInput(inputStr);
  const col1 = input[0].sort();
  const col2 = input[1].sort();
  return col1.reduce((sum, a) =>
    sum + Math.abs(a - col2.shift())
  , 0);
}

// Multiply the number in the left col by the number of times it appears in the right col
const runPartTwo = (inputStr) => {
  const input = parseInput(inputStr);
  const col1 = input[0];
  const col2 = input[1];
  return col1.reduce((sum, n) =>
    sum + (n * countInstances(col2, n))
  , 0);
}

if (runPartOne(testcase) != 11) {
  console.log('Part 1 test failed, got ', runPartOne(testcase));
} else {
  console.log('Part 1:', runPartOne(rawInput));
}

if (runPartTwo(testcase) != 31) {
  console.log('Part 2 test failed, got ', runPartTwo(testcase));
} else {
  console.log('Part 2:', runPartTwo(rawInput));
}