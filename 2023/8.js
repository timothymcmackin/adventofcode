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