const fs = require('fs');
const { isNumber } = require('lodash');
const path = require('path');

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/1.txt'), 'utf8');

const convertStringToElves = (str) => {
  const elves = [];
  let i = 0;
  let strByLines = str.split('\n');
  
  while (strByLines.length > 0) {
    const oneLine = strByLines.shift();
    if (oneLine === '') {
      i++;
    } else {
      const numCals = Number(oneLine);
      if (!isNumber(elves[i])) {
        elves[i] = 0;
      }
      elves[i] += numCals;
    }
  };
  return elves;
};

const elvesSum = convertStringToElves(inputString);
// console.log(Math.max(...elvesSum)); // Part 1

const getTop3Sum = (elves) => {
  elves.sort((a, b) => a - b);
  let sum = 0;
  sum += elves.pop();
  sum += elves.pop();
  sum += elves.pop();
  return sum;
};
console.log(getTop3Sum(elvesSum));
// 91830 too low