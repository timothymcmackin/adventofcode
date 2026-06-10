const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, './input/2.txt'), 'utf8');

const testCase1 = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

// Since the young Elf was just doing silly patterns, you can find the invalid IDs by looking for any ID which is made only of some sequence of digits repeated twice. So, 55 (5 twice), 6464 (64 twice), and 123123 (123 twice) would all be invalid IDs.
const isValid = (idNumber) => {
  // Probably faster to do this without converting to numbers
  const digits = String(idNumber).split('').map(Number);
  // Would have to have an even number of digits
  if (digits.length %2 != 0) {
    return true;
  }
  // Split and compare
  const splitLength = digits.length / 2;
  const a = Number(digits.slice(0, splitLength).join(''));
  const b = Number(digits.slice(splitLength).join(''));
  if (a === b) { return false }
  return true;
}

const getInvalidInRange = (rangeString) => {
  const dashIndex = rangeString.indexOf('-');
  const begin = Number(rangeString.slice(0, dashIndex));
  const end = Number(rangeString.slice(dashIndex + 1));
  let invalidNumbersInRange = [];
  for (let i = begin; i <= end; i++) {
    if (!isValid(i)) {
      invalidNumbersInRange.push(i);
    }
  }
  return invalidNumbersInRange;
}

const getSumOfInvalidInRanges = (listOfRangesString) => {
  const stringRanges = listOfRangesString.split(',');
  return stringRanges.reduce((total, oneStringRange) => {
    const invaidInRange = getInvalidInRange(oneStringRange);
    const sumOfInvalidInRange = invaidInRange.reduce((sum, oneVal) => sum + oneVal, total);
    return sumOfInvalidInRange;
  }, 0);
}

if (getSumOfInvalidInRanges(testCase1) !== 1227775554) {
  console.log('Test case 1 failed');
}
console.log('Part 1:', getSumOfInvalidInRanges(rawInput))

// Part 2:
// Now, an ID is invalid if it is made only of some sequence of digits repeated at least twice. So, 12341234 (1234 two times), 123123123 (123 three times), 1212121212 (12 five times), and 1111111 (1 seven times) are all invalid IDs.

const isValidPart2 = (idNumber) => {
  // So we have to work out how many equal parts a number can be split into
  const digits = String(idNumber).split('').map(Number);
  // Loop and check if the number is evenly divisible
  for (let i = 1; i <= digits.length; i++) {
    // Is evenly divisible?
    const divisor = Math.trunc(digits.length / i);
    if (digits.length % i === 0 && divisor < digits.length) {
      // Get the series of numbers by splitting into [divisor] parts
      let parts = [];
      for (let j = 0; j < digits.length; j += divisor) {
        parts.push(digits.slice(j, j + divisor));
      }
      const numbers = parts.map((c) => Number(c.join('')));
      // Invalid if all numbers are equal
      // ... removes duplicates from a set
      const uniqueNumbers = [...new Set(numbers)];
      if (uniqueNumbers.length === 1) {
        return false;
      }
    }
  }
  // True by default
  return true;
}

const part2InvalidNumbers = [12341234, 123123123, 1212121212, 1111111];
const failedPart2InvalidNumbers = part2InvalidNumbers.filter(isValidPart2);
if (failedPart2InvalidNumbers.length > 0) {
  console.log('Failed part 2 test:', failedPart2InvalidNumbers, 'came up valid')
}
const part2ValidNumbers = [12]
const failedPart2ValidNumbers = part2ValidNumbers.filter(n => !isValidPart2(n));
if (failedPart2ValidNumbers.length > 0) {
  console.log('Failed part 2 test:', failedPart2ValidNumbers, 'came up invalid')
}


const getInvalidInRangePart2 = (rangeString) => {
  const dashIndex = rangeString.indexOf('-');
  const begin = Number(rangeString.slice(0, dashIndex));
  const end = Number(rangeString.slice(dashIndex + 1));
  let invalidNumbersInRange = [];
  for (let i = begin; i <= end; i++) {
    if (!isValidPart2(i)) {
      invalidNumbersInRange.push(i);
    }
  }
  return invalidNumbersInRange;
}

const getSumOfInvalidInRangesPart2 = (listOfRangesString) => {
  const stringRanges = listOfRangesString.split(',');
  return stringRanges.reduce((total, oneStringRange) => {
    const invaidInRange = getInvalidInRangePart2(oneStringRange);
    const sumOfInvalidInRange = invaidInRange.reduce((sum, oneVal) => sum + oneVal, total);
    return sumOfInvalidInRange;
  }, 0);
}

if (getSumOfInvalidInRangesPart2(testCase1) !== 4174379265) {
  console.log('Test case 2 failed');
}
console.log('Part 2:', getSumOfInvalidInRangesPart2(rawInput))