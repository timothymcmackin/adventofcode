function processOpcode(passedOpcode, inputArray = [], relativeBase = 0, position = 0) {
  var opcode = [...passedOpcode];
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
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    // add
    opcode[opcode[position + 3]] = a + b;
    shiftValue = 4;
  } else if (command === 2) {
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    // multiply
    opcode[opcode[position + 3]] = a * b;
    shiftValue = 4;
  } else if (command === 3) {
    // take an input value and store it at address a
    // Always in position mode
    opcode[opcode[position + 1]] = inputArray.shift();
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
      return processOpcode(opcode, inputArray, relativeBase, b);
    }
    shiftValue = 3;
  } else if (command === 6) {
    // jump to the second param if the first is zero
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    if (a === 0) {
      return processOpcode(opcode, inputArray, relativeBase, b);
    }
    shiftValue = 3;
  } else if (command === 7) {
    // if a < b, store 1 in c
    // else store 0 in c
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    if (a < b) {
      opcode[opcode[position + 3]] = 1;
    } else {
      opcode[opcode[position + 3]] = 0;
    }
    shiftValue = 4;
  } else if (command === 8) {
    // if a = b, store 1 in c
    // else store 0 in c
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = getValue(opcode, aMode, relativeBase, opcode[position + 1]);
    const b = getValue(opcode, bMode, relativeBase, opcode[position + 2]);
    if (a === b) {
      opcode[opcode[position + 3]] = 1;
    } else {
      opcode[opcode[position + 3]] = 0;
    }
    shiftValue = 4;
  } else if (command === 9) {
    // Adjust the relative base by the parameter
    relativeBase += opcode[position + 1];
    shiftValue = 2;
  } else {
    // error
    throw new Error('Invalid instruction at position ' + position);
  }

  return processOpcode(opcode, inputArray, relativeBase, position + shiftValue);
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

// Split a number into digits
function splitNumber(number) {
  const digits = number.toString().split('');
  const realDigits = digits.map(Number);
  return realDigits;
}

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
console.assert(processOpcode(largerExample, [6]).pop() === 999, 'largerExample failed');
console.assert(processOpcode(largerExample, [8]).pop() === 1000, 'largerExample failed');
console.assert(processOpcode(largerExample, [9]).pop() === 1001, 'largerExample failed');

const inputWith4 = [3,0,4,0,99];
console.assert(processOpcode(inputWith4, [12]).pop() === 12, 'inputWith4 failed');
const equalTo8Position = [3,9,8,9,10,9,4,9,99,-1,8];
console.assert(processOpcode(equalTo8Position, [8]).pop() === 1, 'equalTo8Position failed');
console.assert(processOpcode(equalTo8Position, [7]).pop() === 0, 'equalTo8Position failed');
const lessThan8Position = [3,9,7,9,10,9,4,9,99,-1,8];
console.assert(processOpcode(lessThan8Position, [8]).pop() === 0, 'lessThan8Position failed');
console.assert(processOpcode(lessThan8Position, [7]).pop() === 1, 'lessThan8Position failed');
const equalTo8Immediate = [3,3,1108,-1,8,3,4,3,99];
console.assert(processOpcode(equalTo8Immediate, [8]).pop() === 1, 'equalTo8Immediate failed');
console.assert(processOpcode(equalTo8Immediate, [7]).pop() === 0, 'equalTo8Immediate failed');
const lessThan8Immediate = [3,3,1107,-1,8,3,4,3,99];
console.assert(processOpcode(lessThan8Immediate, [8]).pop() === 0, 'lessThan8Immediate failed');
console.assert(processOpcode(lessThan8Immediate, [7]).pop() === 1, 'lessThan8Immediate failed');

const jumpTestNonzeroPosition = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
console.assert(processOpcode(jumpTestNonzeroPosition, [0]).pop() === 0, 'jumpTestNonzeroPosition failed');
console.assert(processOpcode(jumpTestNonzeroPosition, [7]).pop() === 1, 'jumpTestNonzeroPosition failed');
const jumpTestNonzeroImmediate = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
console.assert(processOpcode(jumpTestNonzeroImmediate, [0]).pop() === 0, 'jumpTestNonzeroImmediate failed');
console.assert(processOpcode(jumpTestNonzeroImmediate, [7]).pop() === 1, 'jumpTestNonzeroImmediate failed');

const copyOfItself = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
const output16Digits = [1102,34915192,34915192,7,4,7,99,0];
console.assert(processOpcode(output16Digits).pop().toString().length === 16, 'output16digits failed');
console.assert(compareArrays(reverseArray(processOpcode(copyOfItself)), copyOfItself), 'copyOfItself failed');

module.exports = { processOpcode };
