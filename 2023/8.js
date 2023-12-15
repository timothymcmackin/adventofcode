const testInputStr1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const testInputStr2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const { inputStr } = require('./input/8');

const lineRegex = /^(\w+) = \((\w+), (\w+)\)/;

const processInput = (str) => {
  const lines = str.split('\n');
  const directions = lines.shift().split('');
  lines.shift();
  const paths = lines.map((oneLine) => {
    const result = lineRegex.exec(oneLine);
    return {
      source: result[1],
      L: result[2],
      R: result[3],
    };
  });
  return {
    directions,
    paths,
  };
}
/*
Debugger attached.
{
  directions: [ 'R', 'L' ],
  paths: [
    { source: 'AAA', L: 'BBB', R: 'CCC' },
    { source: 'BBB', L: 'DDD', R: 'EEE' },
    { source: 'CCC', L: 'ZZZ', R: 'GGG' },
    { source: 'DDD', L: 'DDD', R: 'DDD' },
    { source: 'EEE', L: 'EEE', R: 'EEE' },
    { source: 'GGG', L: 'GGG', R: 'GGG' },
    { source: 'ZZZ', L: 'ZZZ', R: 'ZZZ' }
  ]
*/

const getIterationsToZZZ = ({ directions, paths }) => {
  let currentLocation = 'AAA';
  let counter = 0;
  while (currentLocation !== 'ZZZ' && counter < 1000000) {
    let steps = JSON.parse(JSON.stringify(directions));
    while (steps.length > 0) {
      counter++;
      const currentStep = steps.shift();
      const currentPath = paths.find(({ source }) => source === currentLocation);
      currentLocation = currentPath[currentStep];
      if (currentLocation === 'ZZZ') {
        return counter;
      }
    }
  }
  return counter;
}

const test1 = getIterationsToZZZ(processInput(testInputStr1));
if (test1 !== 2) {
  console.log("Test 1 failed; should be 2 but got " + test1);
}
const test2 = getIterationsToZZZ(processInput(testInputStr2));
if (test2 !== 6) {
  console.log("Test 1 failed; should be 6 but got " + test2);
}

const inputResult = getIterationsToZZZ(processInput(inputStr));
console.log("Part 1:", inputResult);

// Part 1: take all of the same paths starting from a until all instances are on z

const testInputStrPart2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const getIterationsToZPart2 = ({ directions, paths }) => {
  // Start at all paths ending with A
  let currentLocations = paths
    .filter(({ source }) => source.endsWith('A'))
    .map(({ source }) => source);
  let counter = 0;

  while (counter < 1000000) {
    let steps = JSON.parse(JSON.stringify(directions));
    while (steps.length > 0) {
      counter++;
      const currentStep = steps.shift();

      // Remove duplicates
      currentLocations = [...new Set(currentLocations)];

      let newLocations = currentLocations.map((oneLocation) => {
        const currentPath = paths.find(({ source }) => source === oneLocation);
        return currentPath[currentStep];
      });

      if (newLocations.every((oneLocation) => oneLocation.endsWith('Z'))) {
        return counter;
      }
      currentLocations = newLocations;
    }
  }
  return counter;
}

const testPart2 = getIterationsToZPart2(processInput(testInputStrPart2));
if (testPart2 !== 6) {
  console.log("TestPart2 failed; should be 6 but got ", testPart2);
} else {
  console.log("Part 2: ", getIterationsToZPart2(processInput(inputStr)));
}
// 1000142 too low