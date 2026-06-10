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

