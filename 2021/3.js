const testCase1 = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

const _ = require('lodash');
const { puzzleInput } = require('./inputs/input3');

// Split a number into digits
function splitNumber(number) {
  const digits = number.toString().split('');
  const realDigits = digits.map(Number);
  return realDigits;
}

const getBinaryTotals = (binaryArray) => _.reduce(binaryArray, (totals, binaryInDecimal) => {
  const digits = splitNumber(binaryInDecimal);
  for (let index = 0; index < digits.length; index++) {
    const numberToIncrement = digits[index];
    if (!totals[index]) {
      totals[index] = {};
      totals[index][numberToIncrement] = 1;
    } else if (!totals[index][numberToIncrement]) {
      totals[index][numberToIncrement] = 1;
    } else {
      totals[index][numberToIncrement] += 1;
    }
  }
  return totals;
}, []);

// gamma rate is the more common bit in each place
const getGammaRate = (binaryTotals) => {
  return _.map(binaryTotals, (oneTotal) => 
    oneTotal["0"] > oneTotal['1'] ? 0 : 1
  ).join('');
}

// epsilon rate is the more common bit in each place
const getEpsilonRate = (binaryTotals) => {
  return _.map(binaryTotals, (oneTotal) => 
    oneTotal["0"] > oneTotal['1'] ? 1 : 0
  ).join('');
}

// This is super complicated; see https://adventofcode.com/2021/day/3#part2
const getOxygenRating = (passedBinaryArray) => {
  var binaryArray = Array.from(passedBinaryArray);
  var index = 0;
  while (binaryArray.length > 1) {
    // Keep the binary numbers with the most common digits
    // If 0 and 1 are equally common, keep 1s
    const binaryTotals = getBinaryTotals(binaryArray);
    const numberToKeepAtIndex = binaryTotals[index]["1"] >= binaryTotals[index]["0"] ? 1 : 0;
    binaryArray = binaryArray.filter((oneBinary) => {
      const oneBinaryArray = splitNumber(oneBinary);
      const oneBinaryAtIndex = oneBinaryArray[index];
      return oneBinaryAtIndex === numberToKeepAtIndex;
    });
    index ++;
  }
  return binaryArray[0];
}

const getCO2Rating = (passedBinaryArray) => {
  var binaryArray = Array.from(passedBinaryArray);
  var index = 0;
  while (binaryArray.length > 1) {
    // Keep the binary numbers with the most common digits
    // If 0 and 1 are equally common, keep 1s
    const binaryTotals = getBinaryTotals(binaryArray);
    const numberToKeepAtIndex = binaryTotals[index]["1"] >= binaryTotals[index]["0"] ? 0 : 1;
    binaryArray = binaryArray.filter((oneBinary) => {
      const oneBinaryArray = splitNumber(oneBinary);
      const oneBinaryAtIndex = oneBinaryArray[index];
      return oneBinaryAtIndex === numberToKeepAtIndex;
    });
    index ++;
  }
  return binaryArray[0];
}

// const testCaseTotals = getBinaryTotals(testCase1);
// console.assert(parseInt(getGammaRate(testCaseTotals), 2) === 22, 'Gamma rate incorrect');
// console.assert(parseInt(getCO2Rating(testCaseTotals), 2)=== 9, 'Epsilon rate incorrect');

// const puzzleTotals = getBinaryTotals(puzzleInput);
// console.log(getGammaRate(puzzleTotals) * getEpsilonRate(puzzleTotals))

// Part 2
console.assert(parseInt(getOxygenRating(testCase1), 2) === 23, 'getOxygenRating failed');
console.assert(parseInt(getCO2Rating(testCase1), 2) === 10, 'getC02Rating failed');
console.log(parseInt(getOxygenRating(puzzleInput), 2) * parseInt(getCO2Rating(puzzleInput), 2))
