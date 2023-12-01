const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const { input } = require('./input/1');

const digitRegex = new RegExp('^\\d$');
const filterOutLetters = (line) => line
  .split('')
  .filter(char => digitRegex.test(char))
  .join('');

const getLineValue = (line) => {
  const numbersArray = line.split('');
  const tensDigit = Number(numbersArray[0]);
  const onesDigit = Number(numbersArray.pop());
  return tensDigit * 10 + onesDigit;
}

// Part 1:
// Combine the first digit and the last digit (in that order) to form a single two-digit number.
// Then add the two-digit numbers
const getValuePart1 = (input) => {
  const lines = input.split('\n').map(filterOutLetters);
  const lineValues = lines.map(getLineValue);
  return lineValues.reduce((sum, value) => sum + value, 0);
}

if (getValuePart1(testInput) !== 142) {
  console.log('Test for part 1 failed. Should be 143 and got ' + getValuePart1(testInput));
}

console.log('Part 1: ' + getValuePart1(input));