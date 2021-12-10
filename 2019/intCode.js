function processOpcode({ opcode, inputArray = [], relativeBase = 0, position = 0 }) {
  const instruction = opcode[position];
  // How many values to shift to get to the next instruction
  var shiftValue;

  // opcode 4 returns an output
  // Not sure how to handle output; do I add it to the input array?
  // var output;

  // The command is the two rightmost digits of the instruction
  const command = instruction % 100;
  if (command === 99) {
    return inputArray;
  }

  // The rightmost digits of the instruction control position mode, immediate mode, or relative mode
  // 0: Position mode
  // 1: immediate mode
  // 2: relative mode
  var modeDigits = splitNumber(instruction);
  // Leading zeroes omitted, so add them back
  while (modeDigits.length < 5) {
    modeDigits.unshift(0);
  }
  // Remove command
  modeDigits.pop();
  modeDigits.pop();

  if (command === 1) {
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const cMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    // add
    opcode = setValue(opcode, cMode, relativeBase, opcode[position + 3], a + b);
    shiftValue = 4;
  } else if (command === 2) {
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const cMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    // multiply
    opcode = setValue(opcode, cMode, relativeBase, opcode[position + 3], a * b);
    shiftValue = 4;
  } else if (command === 3) {
    // take an input value and store it at address a
    // Never in immediate mode
    const aMode = modeDigits.pop();
    opcode = setValue(opcode, aMode, relativeBase, opcode[position + 1], inputArray.shift());
    shiftValue = 2;
  } else if (command === 4) {
    shiftValue = 2;
    // output the value at address a
    // if position mode, use reference
    // if immediate mode, use the literal value
    const aMode = modeDigits.pop();
    inputArray.unshift(getValue(opcode, aMode, relativeBase, opcode[position + 1]));
  } else if (command === 5) {
    // jump to the second param if the first is not zero
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    if (a !== 0) {
      return { opcode, inputArray, relativeBase, position: b };
    }
    shiftValue = 3;
  } else if (command === 6) {
    // jump to the second param if the first is zero
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    if (a === 0) {
      return { opcode, inputArray, relativeBase, position: b };
    }
    shiftValue = 3;
  } else if (command === 7) {
    // if a < b, store 1 in c
    // else store 0 in c
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const cMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    opcode = setValue(opcode, cMode, relativeBase, opcode[position + 3], a < b ? 1 : 0);
    shiftValue = 4;
  } else if (command === 8) {
    // if a = b, store 1 in c
    // else store 0 in c
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const cMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    opcode = setValue(opcode, cMode, relativeBase, opcode[position + 3], a === b ? 1 : 0);
    shiftValue = 4;
  } else if (command === 9) {
    // Adjust the relative base by the parameter
    relativeBase += getValue(opcode, modeDigits.pop(), relativeBase, opcode[position + 1]);
    shiftValue = 2;
  } else {
    // error
    throw new Error('Invalid instruction at position ' + position);
  }

  return {
    opcode,
    inputArray,
    relativeBase,
    position: position + shiftValue,
  };
  // return processOpcode(opcode, inputArray, relativeBase, position + shiftValue);
}

function runOpcode(passedOpcode, inputArray = []) {
  var opcode = [...passedOpcode];
  var nextInstruction = 0;
  var position = 0;
  var relativeBase = 0;
  var result = { opcode, inputArray, relativeBase, position } ;
  while (nextInstruction !== 99) {
    result = processOpcode(result);
    nextInstruction = result.opcode[result.position];
  }
  return result.inputArray;
}

// Get a value based on the mode and relative base
// 0: position mode: use the value at position X
// 1: immediate mode: use the literal value
// 2: relative mode: get the value at position X + relativeBase
function getValue(opcode, mode, relativeBase, param) {
  if (mode === 0) {
    return opcode[param] || 0;
  }
  if (mode === 1) {
    return param;
  }
  if (mode === 2) {
    return opcode[param + relativeBase] || 0;
  }
}

function setValue(opcode, mode, relativeBase, param, value) {
  if (mode === 0) {
    opcode[param] = value;
  } else if (mode === 1) {
    // invalid
    throw new Error("Can't set value in immediate mode");
  } else if (mode === 2) {
    opcode[param + relativeBase] = value;
  }
  return opcode;
}

// Split a number into digits
const splitNumber = (number) => number.toString().split('').map(Number);

function reverseArray(array) {
  var newArray = [];
  while(array.length) {
    newArray.push(array.pop());
  }
  return newArray;
}

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

const largerExample = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
  1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
  999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
console.assert(runOpcode(largerExample, [6]).pop() === 999, 'largerExample failed');
console.assert(runOpcode(largerExample, [8]).pop() === 1000, 'largerExample failed');
console.assert(runOpcode(largerExample, [9]).pop() === 1001, 'largerExample failed');

const inputWith4 = [3,0,4,0,99];
console.assert(runOpcode(inputWith4, [12]).pop() === 12, 'inputWith4 failed');
const equalTo8Position = [3,9,8,9,10,9,4,9,99,-1,8];
console.assert(runOpcode(equalTo8Position, [8]).pop() === 1, 'equalTo8Position failed');
console.assert(runOpcode(equalTo8Position, [7]).pop() === 0, 'equalTo8Position failed');
const lessThan8Position = [3,9,7,9,10,9,4,9,99,-1,8];
console.assert(runOpcode(lessThan8Position, [8]).pop() === 0, 'lessThan8Position failed');
console.assert(runOpcode(lessThan8Position, [7]).pop() === 1, 'lessThan8Position failed');
const equalTo8Immediate = [3,3,1108,-1,8,3,4,3,99];
console.assert(runOpcode(equalTo8Immediate, [8]).pop() === 1, 'equalTo8Immediate failed');
console.assert(runOpcode(equalTo8Immediate, [7]).pop() === 0, 'equalTo8Immediate failed');
const lessThan8Immediate = [3,3,1107,-1,8,3,4,3,99];
console.assert(runOpcode(lessThan8Immediate, [8]).pop() === 0, 'lessThan8Immediate failed');
console.assert(runOpcode(lessThan8Immediate, [7]).pop() === 1, 'lessThan8Immediate failed');

const jumpTestNonzeroPosition = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
console.assert(runOpcode(jumpTestNonzeroPosition, [0]).pop() === 0, 'jumpTestNonzeroPosition failed');
console.assert(runOpcode(jumpTestNonzeroPosition, [7]).pop() === 1, 'jumpTestNonzeroPosition failed');
const jumpTestNonzeroImmediate = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
console.assert(runOpcode(jumpTestNonzeroImmediate, [0]).pop() === 0, 'jumpTestNonzeroImmediate failed');
console.assert(runOpcode(jumpTestNonzeroImmediate, [7]).pop() === 1, 'jumpTestNonzeroImmediate failed');

const copyOfItself = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
const output16Digits = [1102,34915192,34915192,7,4,7,99,0];
console.assert(runOpcode(output16Digits).pop().toString().length === 16, 'output16digits failed');
console.assert(compareArrays(reverseArray(runOpcode(copyOfItself)), copyOfItself), 'copyOfItself failed');
console.assert(runOpcode([104,1125899906842624,99]).pop() === 1125899906842624, 'big number failed');

// https://www.reddit.com/r/adventofcode/comments/e8aw9j/comment/fac3294/?utm_source=reddit&utm_medium=web2x&context=3
console.assert(runOpcode([109, -1, 4, 1, 99]).pop() === -1, 'test case 1');
console.assert(runOpcode([109, -1, 104, 1, 99]).pop() === 1, 'test case 2');
console.assert(runOpcode([109, -1, 204, 1, 99]).pop() === 109, 'test case 3');
console.assert(runOpcode([109, 1, 9, 2, 204, -6, 99]).pop() === 204, 'test case 4');
console.assert(runOpcode([109, 1, 109, 9, 204, -6, 99]).pop() === 204, 'test case 5');
console.assert(runOpcode([109, 1, 209, -1, 204, -106, 99]).pop() === 204, 'test case 6');
console.assert(runOpcode([109, 1, 3, 3, 204, 2, 99], [123456]).pop() === 123456, 'test case 7');
console.assert(runOpcode([109, 1, 203, 2, 204, 2, 99], [654321]).pop() === 654321, 'test case 8');

module.exports = { runOpcode };
