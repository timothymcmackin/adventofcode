const oneTestInput = '0 3 6 9 12 15'.split(' ').map(Number);
const allTestInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const { inputStr } = require('./input/9');

const processInput = (inputString) => inputString
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const reduceSeries = (nums) => {
  let prevNumber = nums.shift();
  let reducedSeries = [];
  while (nums.length > 0) {
    const thisNum = nums.shift();
    reducedSeries.push(thisNum - prevNumber);
    prevNumber = thisNum;
  }
  return reducedSeries;
}

/*
0   3   6   9  12  15  [18]
  3   3   3   3   3   [3]
    0   0   0   0   0
*/
const getNextNumberInSeries = (passedNums) => {
  // Only the last number in the series is important
  const lastNumbers = [];
  let nums = JSON.parse(JSON.stringify(passedNums));
  while (!nums.every((n) => n === 0)) {
    lastNumbers.push(nums[nums.length - 1]);
    nums = reduceSeries(nums);
  }
  lastNumbers.reverse();
  return lastNumbers.reduce((sum, currentNumber) =>
    sum + currentNumber
  , 0);
}
if (getNextNumberInSeries(oneTestInput) !== 18) {
  console.log('getNextNumberInSeries test failed; got', getNextNumberInSeries(oneTestInput));
}

const getSumOfSeries = (series) => series
  .reduce((sum, oneSeries) => sum + getNextNumberInSeries(oneSeries), 0);

const testInput = processInput(allTestInput);
if (getSumOfSeries(testInput) !== 114) {
  console.log('Test input failed.');
}

const input = processInput(inputStr);
console.log('Part 1:', getSumOfSeries(input));

/*
[5]  10  13  16  21  30  45
  [5]   3   3   5   9  15
   [-2]   0   2   4   6
      [2]   2   2   2
          0   0   0
*/
const getPrevNumberInSeries = (passedNums) => {
  // Only the last number in the series is important
  const firstNumbers = [];
  let nums = JSON.parse(JSON.stringify(passedNums));
  while (!nums.every((n) => n === 0)) {
    firstNumbers.push(nums[0]);
    nums = reduceSeries(nums);
  }
  firstNumbers.reverse();
  return firstNumbers.reduce((sum, currentNumber) =>
    currentNumber - sum
  , 0);
}
if (getPrevNumberInSeries(oneTestInput) !== -3) {
  console.log('getPrevNumberInSeries test line 1failed; got', getPrevNumberInSeries(oneTestInput));
}
if (getPrevNumberInSeries(testInput[1]) !== 0) {
  console.log('getPrevNumberInSeries test line 2 failed; got', getPrevNumberInSeries(testInput[1]));
}
if (getPrevNumberInSeries(testInput[2]) !== 5) {
  console.log('getPrevNumberInSeries test line 3 failed; got', getPrevNumberInSeries(testInput[2]));
}

const getSumOfSeriesPart2 = (series) => series
  .reduce((sum, oneSeries) => sum + getPrevNumberInSeries(oneSeries), 0);

if (getSumOfSeriesPart2(testInput) !== 2) {
  console.log('Part 2 test failed');
}

console.log('Part 2:', getSumOfSeriesPart2(input));
