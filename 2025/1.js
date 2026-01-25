const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, './input/1.txt'), 'utf8');

const testCase = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const testCaseAnswer = 3;
const testCaseAnswerPart2 = 6;

// Count the number of times that the 100-number dial rests on 0 given the rotations listed

// Easy way might be to just add and subtract and count the mod 100 == 0

const countZeroes = (inputString) => {
  // The dial starts by pointing at 50.
  const startPosition = 50;
  const instructions = inputString.split('\n');
  const result = instructions.reduce(({ prevCount, prevPosition }, oneInstruction) => {
    const direction = oneInstruction.substring(0, 1);
    const moveNumber = Number(oneInstruction.substring(1));
    const newPosition = direction === 'L' ? prevPosition - moveNumber : prevPosition + moveNumber;
    const newCount = newPosition % 100 === 0 ? prevCount + 1 : prevCount;
    return {
      prevCount: newCount,
      prevPosition: newPosition,
    }
  }, {prevCount: 0, prevPosition: startPosition});
  return result.prevCount;
}

// Part 2: count every time the dial passes 0 or lands on zero

const countTouchingZero = (inputString) => {
  const startPosition = 50;
  const instructions = inputString.split('\n');
  const result = instructions.reduce(({ prevCount, prevPosition }, oneInstruction) => {
    const direction = oneInstruction.substring(0, 1);
    let moveNumber = Number(oneInstruction.substring(1));
    let newCount = prevCount;
    let newPosition;
    // Get it down below 100
    newCount += Math.floor(moveNumber/100);
    if (Math.floor(moveNumber/100) > 1) {
      console.log('Count', Math.floor(moveNumber/100));
    }
    const remainingMoveUnder100 = moveNumber % 100;
    if (direction === 'R') {
      newPosition = prevPosition + remainingMoveUnder100;
      if (newPosition >= 100) {
        newPosition -= 100;
        newCount++;
      }
    } else {
      newPosition = prevPosition - remainingMoveUnder100;
      if (newPosition < 0) {
        newPosition += 100;
        if (prevPosition !== 0) {
          newCount++;
        }
      } else if (newPosition === 0) {
        newCount++;
      }
    }
    // console.log(`THe dial is rotated ${oneInstruction} to point at ${newPosition}`);
    return {
      prevCount: newCount,
      prevPosition: newPosition,
    }
  }, {prevCount: 0, prevPosition: startPosition});
  return result.prevCount;
}


if (countZeroes(testCase) === testCaseAnswer) {
  console.log('Test case OK');
  console.log('Part 1:', countZeroes(rawInput));
} else {
  console.error('Test case 1 failed');
}

if (countTouchingZero(testCase) === testCaseAnswerPart2) {
  console.log('Test case OK');
  console.log('Part 2:', countTouchingZero(rawInput));
  // 5776 too low
} else {
  console.error('Test case 2 failed');
}