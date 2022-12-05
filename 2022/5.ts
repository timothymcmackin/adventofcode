import { initialCratesString, initialInstructionsString } from './inputs/5.js';

const testInitialCratesString = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

const testInstructionsString = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const processCrateString = (crateString: string): string[][] => {
  // Convert the string into a horizontal grid
  // let cratesHorizontal: string[] = [];
  let cratesHorizontal: (string | null)[][] = [];
  let crateStringByLines = crateString.split('\n');
  let i = 0;
  while (crateStringByLines.length > 0) {
    let newRow: (string | null)[] = [];
    let oneLine: string = crateStringByLines.shift()!;

    // take 4 chars at a time
    while (oneLine && oneLine.length >= 3) {
      let oneCell = oneLine.substring(0, 4);
      oneLine = oneLine.substring(4);
      if (oneCell.match(/\s{4}/)) {
        // No crate here
        newRow.push(null);
      } else if (oneCell.match(/\[(\w)\]/)) {
        // Crate
        const letterResult = /\[(\w)\]/.exec(oneCell);
        newRow.push(letterResult![1]);
      }
    }
    cratesHorizontal.push(newRow);
    i++
  }
  // Remove the last line with the numbers
  // Watch out for the off by one
  cratesHorizontal.pop();
  // Equalize the lengths for blank spaces at the end
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
  let crates: (string)[][] = []
  for (let i = 0; i < maxStackHeight; i++) {
    crates[i] = [];
    for (let j = 0; j < cratesHorizontal.length; j++) {
      if (cratesHorizontal[j].length > 0) {
        crates[i].push(cratesHorizontal[j].shift()!);
      }
    }
  }
  // printCrates(crates);
  // Filter out nulls at the top so we can just pop and shift everything
  return crates.map((oneCrate) => oneCrate.filter((c) => !!c));
};

const instructionsRegex = /^move (\d+) from (\d+) to (\d+)/;
type Instruction = {
  quantity: number,
  source: number,
  target: number,
};
const processInstructionsString = (instructionsString): Instruction[] => (
  instructionsString.split('\n').map((oneLine) => {
    const result = instructionsRegex.exec(oneLine);
    return {
      quantity: Number(result![1]),
      source: Number(result![2]) - 1,
      target: Number(result![3]) - 1,
    };
  })
);

const printCrates = (passedCrates: (string | null)[][]): void => {
  // Standardize the height so it prints cleanly
  const cratesToPrint = JSON.parse(JSON.stringify(passedCrates));
  const maxHeight = Math.max(...cratesToPrint.map((c) => c.length));
  const crates: (String | null)[][] = cratesToPrint.map((c) => {
    while (c.length < maxHeight) {
      c.unshift(null);
    }
    return c;
  });

  // Convert to strings
  let strGrid: string[] = [];
  for (let i = 0; i < crates[0].length; i++) {
    let strLine = '';
    for (let j = 0; j < crates.length; j++) {
      strLine += ` ${crates[j][i] || ' '}  `
    }
    strGrid.push(strLine);
  }
  console.log(strGrid.join('\n'));
  console.log('\n\n');
};

// Combined into one function from 5.js
enum craneMode {
  single,
  multiple,
};
const runInstructions = (
  passedCrates: string[][],
  passedInstructions: Instruction[],
  mode: craneMode,
  ): string[][] => {
  let crates = JSON.parse(JSON.stringify(passedCrates));
  let instructions = JSON.parse(JSON.stringify(passedInstructions));
  while (instructions.length > 0) {
    const { quantity, source, target } = instructions.shift()!;
    // Get the top crates from the source stack
    let movingCrates: string[] = [];
    for (let i = 0; i < quantity; i++) {
      movingCrates.push(crates[source].shift()!);
    }
    // Put the crates on the target stack
    // If we're moving one crate at a time, reverse the crates
    if (mode === craneMode.single) {
      movingCrates.reverse();
    }
    crates[target] = [...movingCrates, ...crates[target]];
  }
  // printCrates(crates);
  return crates;
};

const getTopCrates = (crates: string[][]): string => crates.reduce((str, oneStack) => str + oneStack[0], '');

const testCrates = processCrateString(testInitialCratesString);
// printCrates(testCrates);
const inputCrates = processCrateString(initialCratesString);
// printCrates(inputCrates);

const testInstructions = processInstructionsString(testInstructionsString);
const inputInstructions = processInstructionsString(initialInstructionsString);

const testCratesMovedPart1 = runInstructions(testCrates, testInstructions, craneMode.single);
const inputCratesMovedPart1 = runInstructions(inputCrates, inputInstructions, craneMode.single);

const testCratesMovedPart2 = runInstructions(testCrates, testInstructions, craneMode.multiple);
const inputCratesMovedPart2 = runInstructions(inputCrates, inputInstructions, craneMode.multiple);

console.log('Test 1:', getTopCrates(testCratesMovedPart1));
console.log('Test 2:', getTopCrates(testCratesMovedPart2));

console.log('Part 1:', getTopCrates(inputCratesMovedPart1));
console.log('Part 2:', getTopCrates(inputCratesMovedPart2));
