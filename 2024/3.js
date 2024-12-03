const fs = require('fs');
const path = require('path');

const testInputString = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
const part2InputString = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

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

const calculatePart2 = (inputString) => {
  const multRegexWithDoAndNot = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/gm;
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/;
  let sum = 0;
  let active = true;
  let oneResult;
  while ((oneResult = multRegexWithDoAndNot.exec(inputString)) != null) {
    if (oneResult[1] == `do()`) {
      active = true;
    }
    if (oneResult[1] == `don't()`) {
      active = false;
    }
    if (mulRegex.test(oneResult[1]) && active) {
      const mulResult = mulRegex.exec(oneResult[1]);
      sum += (mulResult[1] * mulResult[2]);
    }
  }
  return sum;
}

if (calculatePart1(testInputString) != 161) {
  console.log('Part 1 test failed, got ', calculatePart1(testInputString));
} else {
  console.log('Part 1:', calculatePart1(rawInput));
}

if (calculatePart2(part2InputString) != 48) {
  console.log('Part 2 test failed, got ', calculatePart2(part2InputString));
} else {
  console.log('Part 2:', calculatePart2(rawInput));
}