const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const testInputString = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/4.txt'), 'utf8');

const processOutput = (str) => {
  const lines = str.split('\n');
  const pairsRegex = /^(\d+)-(\d+),(\d+)-(\d+)$/;
  return lines.map((line) => {
    const result = pairsRegex.exec(line);
    return [Number(result[1]), Number(result[2]), Number(result[3]), Number(result[4])];
  });
};

// Part 1: In how many assignment pairs does one range fully contain the other?
const countOverlappingPairs = (pairs) => {
  const overlaps = pairs.filter((pair) => {
    const [ startA, endA, startB, endB ] = pair;
    if (startA <= startB && endA >= endB) {
      return true;
    }
    if (startB <= startA && endB >= endA) {
      return true;
    }
    return false;
  });
  return overlaps.length;
};

const countPairsWithAnyOverlap = (pairs) => {
  const overlaps = pairs.filter((pair) => {
    const [ startA, endA, startB, endB ] = pair;
    const rangeA = _.range(startA, endA + 1);
    const rangeB = _.range(startB, endB + 1);
    if (
      rangeA.some((num) => rangeB.includes(num))
      || rangeB.some((num) => rangeA.includes(num))
    ) {
      return true;
    }
    return false;
  });
  return overlaps.length;
};

const testPairs = processOutput(testInputString);

// console.log(countOverlappingPairs(testPairs));

const inputPairs = processOutput(inputString);
console.log(countPairsWithAnyOverlap(inputPairs));
