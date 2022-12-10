const { testInputString, inputString } = require('./inputs/10.js');

const processInput = (str) => str.split('\n').map((line) => {
  const lineSplit = line.split(' ');
  return {
    instruction: lineSplit[0],
    value: lineSplit.length > 1 ? Number(lineSplit[1]) : null,
  };
});

const testInput = processInput(testInputString);
const input = processInput(inputString);

// For now, consider the signal strength (the cycle number multiplied by the value of the X register) during the 20th cycle and every 40 cycles after that (that is, during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).
const runPart1 = (instructions) => {
  let X = 1;
  let cycle = 1;
  let cycleSum = 0;
  const cyclesToCheck = [20, 60, 100, 140, 180, 220];

  for (const { instruction, value } of instructions) {
    if (instruction === 'noop') {
      cycle++;
      if (cyclesToCheck.includes(cycle)) {
        cycleSum += X * cycle;
      }
    }
    if (instruction === 'addx') {
      // takes two cycles
      cycle++;
      if (cyclesToCheck.includes(cycle)) {
        cycleSum += X * cycle;
      }
      cycle++;
      X += value;
      if (cyclesToCheck.includes(cycle)) {
        cycleSum += X * cycle;
      }
    }
  }

  return cycleSum;
}

console.log(runPart1(testInput), 'should be 13140');
console.log('Part 1:', runPart1(input));