const testInputString = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const { inputString } = require('./input/5');

const numberRegex = new RegExp('^\\d+$');

const processInput = (inputString) => {
  const lines = inputString.split('\n')
    .filter((line) => line.length > 1);
  const firstLine = lines.shift();

  // Get the seed numbers
  const seeds = firstLine.split(' ')
    .filter((str) => numberRegex.test(str))
    .map(Number);

  // Assume that the factors are in order
  const factors = [];
  let currentFactor = [];
  while (lines.length > 0) {
    const oneLine = lines.shift();
    const firstChar = oneLine.substring(0, 1);
    if (numberRegex.test(firstChar)) {
      const numbers = oneLine
        .split(' ')
        .map(Number);
      currentFactor.push({
        offset: numbers[2],
        source: numbers[1],
        destination: numbers[0],
      });
    } else {
      // New factor
      if (currentFactor.length > 0) {
        factors.push(currentFactor);
      }
      currentFactor = [];
    }
  }
  factors.push(currentFactor);

  return { seeds, factors };
}

const testInput = processInput(testInputString);
const input = processInput(inputString);

const getLowestDestination = ({ seeds, factors }) => {
  const destinations = seeds.map((seed) => getDestinationForSeed(seed, factors));
  return Math.min(...destinations);
}

const getDestinationForSeed = (seed, factors) =>
  factors.reduce((prevNum, oneFactor) =>
    getOutput(prevNum, oneFactor)
  , seed);

// Find the factor that matches the initial value
const getOutput = (num, factor) => {
  let returnValue;

  let factorToCheck = JSON.parse(JSON.stringify(factor));

  while (factorToCheck.length > 0 && !returnValue) {
    const oneRange = factorToCheck.shift();
    const { offset, source, destination } = oneRange;
    const rangeEnd = source + offset - 1;
    if (source <= num && num <= rangeEnd) {
      returnValue = (num - source) + destination;
    }
  }

  // By default, return the same number
  return returnValue || num;
}

const testAnswer = getLowestDestination(testInput);
if (testAnswer !== 35) {
  console.log('Test failed. Should be 35 but got ', testAnswer);
}

console.log('Part 1:', getLowestDestination(input)); // 282277027

// Part 2: treat the seed numbers as the start and end of ranges

// Brute force method

const getLowestDestinationPart2 = ({ seeds, factors }) => {
  let min = 1000000;
  while (seeds.length > 0) {
    const rangeStart = seeds.shift();
    const numberOfIterations = seeds.shift();
    for (let i = 0; i < numberOfIterations; i++) {
      const seedToCheck = rangeStart + i;
      const value = getDestinationForSeed(seedToCheck, factors);
      if (value < min) {
        min = value;
      }
    }
  }

  return min;
}

const part2TestAnswer = getLowestDestinationPart2(testInput);
if (part2TestAnswer !== 46) {
  console.log('Test answer part 2 should be 46 but got', part2TestAnswer);
}
console.log('Part 2:', getLowestDestinationPart2(input));