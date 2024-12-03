const fs = require('fs');
const path = require('path');

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

// Sort the list and get the sum of the distances between the matching items
const runPartOne = (inputStr) => {
  const input = parseInput(inputStr);
  const col1 = input[0].sort();
  const col2 = input[1].sort();
  return col1.reduce((sum, a) =>
    sum + Math.abs(a - col2.shift())
  , 0);
}

if (runPartOne(testcase) != 11) {
  console.log('Part 1 test failed, got ', runPartOne(testcase));
} else {
  console.log('Part 1:', runPartOne(fs.readFileSync(path.resolve(__dirname, './input/1.txt'), 'utf8')));
}