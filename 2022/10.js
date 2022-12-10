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

const runPart2 = (instructions) => {
  let X = 1;
  let cycle = 0;
  // grid is 40 wide and 6 high, so 240 chars
  let crt = '';

  // The sprite is 3 chars wide, starting with index X
  // "(In this system, there is no such thing as "vertical position": if the sprite's horizontal position puts its pixels where the CRT is currently drawing, then those pixels will be drawn.)"
  // ^ Does this mean that the sprite applies to all rows?
  // If the sprite is positioned such that one of its three pixels is the pixel currently being drawn, the screen produces a lit pixel (#); otherwise, the screen leaves the pixel dark (.).

  for (const { instruction, value } of instructions) {
    if (instruction === 'noop') {
      if (Math.abs((cycle % 40) - X) <= 1) {
        crt += '#';
      } else {
        crt += '.';
      }
      cycle++;
    }
    if (instruction === 'addx') {
      // takes two cycles
      if (Math.abs((cycle % 40) - X) <= 1) {
        crt += '#';
      } else {
        crt += '.';
      }
      cycle++;
      if (Math.abs((cycle % 40) - X) <= 1) {
        crt += '#';
      } else {
        crt += '.';
      }
      cycle++;
      X += value;
    }
  }
  printCrt(crt);
}

const printCrt = (str) => {
  const arr = [
    str.substring(0, 40),
    str.substring(40, 80),
    str.substring(80, 120),
    str.substring(120, 160),
    str.substring(160, 200),
    str.substring(200, 240),
  ];
  console.log(arr.join('\n'));
};

runPart2(testInput);
runPart2(input);