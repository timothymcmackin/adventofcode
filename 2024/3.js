const fs = require('fs');
const path = require('path');

const testInputString = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

const rawInput = fs.readFileSync(path.resolve(__dirname, './input/3.txt'), 'utf8');

const calculatePart1 = (inputString) => {
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
  let sum = 0;
  let oneResult;
  while ((oneResult = mulRegex.exec(inputString)) != null) {
    sum += (oneResult[1] * oneResult[2]);
  }
  return sum;
}

if (calculatePart1(testInputString) != 161) {
  console.log('Part 1 test failed, got ', calculatePart1(testInputString));
} else {
  console.log('Part 1:', calculatePart1(rawInput));
}