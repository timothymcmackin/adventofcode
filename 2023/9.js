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
  nums.reverse();
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
