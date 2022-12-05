const { initialCratesString, initialInstructionsString } = require('./inputs/5.js');

const testInitialCratesString = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

const testInstructionsString = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const processCrateString = (crateString) => {
  // Convert the string into a horizontal grid
  let cratesHorizontal = [];
  let crateStringByLines = crateString.split('\n');
  let i = 0;
  while (crateStringByLines.length > 0) {
    cratesHorizontal[i] = [];
    let oneLine = crateStringByLines.shift();

    // take 4 chars at a time
    while (oneLine.length >= 3) {
      let oneCell = oneLine.substring(0, 4);
      oneLine = oneLine.substring(4);
      if (oneCell.match(/\s{4}/)) {
        cratesHorizontal[i].push(null);
      } else if (oneCell.match(/\[(\w)\]/)) {
        const letterResult = /\[(\w)\]/.exec(oneCell);
        cratesHorizontal[i].push(letterResult[1]);
      }
    }
    i++
  }
  // Remove the last line with the numbers
  // Watch out for the off by one
  cratesHorizontal.pop();
  // Equalize the lengths
  const maxStackHeight = Math.max(...cratesHorizontal.map((oneLine) => oneLine.length));
  for (let i = 0; i < cratesHorizontal.length; i++) {
    while (cratesHorizontal[i].length < maxStackHeight - 1) {
      cratesHorizontal[i].push(null);
    }
  }
  // console.log(cratesHorizontal);
  /*
  [
    [ null, 'D', null ],
    [ 'N', 'C', null ],
    [ 'Z', 'M', 'P' ]
  ]
  */

  // Pivot the array so the top crate is at the highest index
  let crates = [];
  for (let i = 0; i < maxStackHeight; i++) {
    crates[i] = [];
    for (let j = 0; j < cratesHorizontal.length; j++) {
      crates[i].push(cratesHorizontal[j].shift() || null);
    }
  }
  printCrates(crates);
  crates = crates.map((oneCrate) => oneCrate.filter((c) => !!c));
  return crates;
};

const instructionsRegex = /^move (\d+) from (\d+) to (\d+)/;
const processInstructionsString = (instructionsString) => (
  instructionsString.split('\n').map((oneLine) => {
    const result = instructionsRegex.exec(oneLine);
    return {
      quantity: Number(result[1]),
      source: Number(result[2]) - 1,
      target: Number(result[3]) - 1,
    };
  })
);

const runInstructions = (crates, instructions) => {
  while (instructions.length > 0) {
    const { quantity, source, target } = instructions.shift();
    for (let i = 0; i < quantity; i++) {
      // Get the top crate from the source stack
      let depth = 0;
      let movingCrate = null;
      while (!movingCrate) {
        movingCrate = crates[source][depth];
        depth++;
      }
      crates[source][depth - 1] = null;
      // Check if there is anything at the very top of the source stack
      if (!!crates[target][0]) {
        // If so, add an empty slot to each stack
        // Turns out that this wasn't necessary except to pretty-print without having to rotate back
        crates = crates.map((stack) => [null, ...stack]);
        crates[target][0] = movingCrate;
      } else if (crates[target].every((item) => !item)) {
        // The stack is empty, so put it at the end
        crates[target].shift();
        crates[target].push(movingCrate);
      } else {
        // Loop to find the last open place in the target stack
        let targetPosition = null;
        depth = 0;
        while (!targetPosition) {
          targetPosition = crates[target][depth];
          depth++;
        }
        // Add it to the target stack
        crates[target][depth - 2] = movingCrate;
      }
      // printCrates(crates);
    }
  }
  return crates;
}

// In part two, crates are moved as a unit
const runInstructionsPartTwo = (crates, instructions) => {
  while (instructions.length > 0) {
    const { quantity, source, target } = instructions.shift();
    let movingCrates = [];
    for (let i = 0; i < quantity; i++) {
      movingCrates.push(crates[source].shift())
    }
    if (!crates[target]) {
      crates[target] = [];
    }
    crates[target] = [...movingCrates, ...crates[target]];
  }
  return crates;
}

const printCrates = (crates) => {
  let strGrid = [];
  for (let i = 0; i < crates[0].length; i++) {
    let strLine = '';
    for (let j = 0; j < crates.length; j++) {
      strLine += ` ${crates[j][i] || ' '}  `
    }
    strGrid.push(strLine);
  }
  console.log(strGrid.join('\n'));
};

const getTopCrates = (crates) => {
  crates = crates.map((stack) => stack.filter((item) => !!item));
  return crates.reduce((str, oneStack) => str + oneStack.shift(), '');
};

// const testCrates = processCrateString(testInitialCratesString);
const inputCrates = processCrateString(initialCratesString);

// const testInstructions = processInstructionsString(testInstructionsString);
const inputInstructions = processInstructionsString(initialInstructionsString);

// const testCratesMoved = runInstructionsPartTwo(testCrates, testInstructions);
const inputCratesMoved = runInstructionsPartTwo(inputCrates, inputInstructions);

// console.log(getTopCrates(testCratesMoved));
console.log(getTopCrates(inputCratesMoved));
// Not FFWFFWFWF