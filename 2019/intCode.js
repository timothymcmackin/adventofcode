function processOpcode(passedOpcode, inputArray, position = 0) {
  var opcode = [...passedOpcode];
  const instruction = opcode[position];

  // How many values to shift to get to the next instruction
  var shiftValue;

  // opcode 4 returns an output
  var output;

  // The command is the two rightmost digits of the instruction
  const command = instruction % 100;
  if (command === 99) {
    return inputArray[0];
  }

  // The rightmost digits of the instruction control position mode or immediate mode
  var modeDigits = splitNumber(instruction);
  // Leading zeroes omitted, so add them back
  while (modeDigits.length < 5) {
    modeDigits.unshift(0);
  }
  // Remove command
  modeDigits.pop();
  modeDigits.pop();

  if (command === 1) {
    // 0 means refer to position; 1 means literal value
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1];
    const b = bMode === 0 ? opcode[opcode[position + 2]] : opcode[position + 2];
    // add
    opcode[opcode[position + 3]] = a + b;
    shiftValue = 4;
  } else if (command === 2) {
    // 0 means refer to position; 1 means literal value
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1];
    const b = bMode === 0 ? opcode[opcode[position + 2]] : opcode[position + 2];
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
    inputArray.unshift(aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1]);
  } else if (command === 5) {
    // jump to the second param if the first is not zero
    // 0 means refer to position; 1 means literal value
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1];
    const b = bMode === 0 ? opcode[opcode[position + 2]] : opcode[position + 2];
    if (a !== 0) {
      return processOpcode(opcode, inputArray, b);
    }
    shiftValue = 3;
  } else if (command === 6) {
    // jump to the second param if the first is zero
    // 0 means refer to position; 1 means literal value
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1];
    const b = bMode === 0 ? opcode[opcode[position + 2]] : opcode[position + 2];
    if (a === 0) {
      return processOpcode(opcode, inputArray, b);
    }
    shiftValue = 3;
  } else if (command === 7) {
    // if a < b, store 1 in c
    // else store 0 in c
    // 0 means refer to position; 1 means literal value
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1];
    const b = bMode === 0 ? opcode[opcode[position + 2]] : opcode[position + 2];
    if (a < b) {
      opcode[opcode[position + 3]] = 1;
    } else {
      opcode[opcode[position + 3]] = 0;
    }
    shiftValue = 4;
  } else if (command === 8) {
    // if a = b, store 1 in c
    // else store 0 in c
    // 0 means refer to position; 1 means literal value
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1];
    const b = bMode === 0 ? opcode[opcode[position + 2]] : opcode[position + 2];
    if (a === b) {
      opcode[opcode[position + 3]] = 1;
    } else {
      opcode[opcode[position + 3]] = 0;
    }
    shiftValue = 4;
  } else {
    // error
    throw new Error('Invalid instruction at position ' + position);
  }

  return processOpcode(opcode, inputArray, position + shiftValue);
}

// Split a number into digits
function splitNumber(number) {
  const digits = number.toString().split('');
  const realDigits = digits.map(Number);
  return realDigits;
}

const largerExample = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
  1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
  999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
console.assert(processOpcode(largerExample, [6]) === 999, 'largerExample failed');
console.assert(processOpcode(largerExample, [8]) === 1000, 'largerExample failed');
console.assert(processOpcode(largerExample, [9]) === 1001, 'largerExample failed');

const inputWith3 = [1002,4,3,4,33];
const inputWith4 = [3,0,4,0,99];
console.assert(processOpcode(inputWith4, [12]) === 12, 'inputWith4 failed');
const equalTo8Position = [3,9,8,9,10,9,4,9,99,-1,8];
console.assert(processOpcode(equalTo8Position, [8]) === 1, 'equalTo8Position failed');
console.assert(processOpcode(equalTo8Position, [7]) === 0, 'equalTo8Position failed');
const lessThan8Position = [3,9,7,9,10,9,4,9,99,-1,8];
console.assert(processOpcode(lessThan8Position, [8]) === 0, 'lessThan8Position failed');
console.assert(processOpcode(lessThan8Position, [7]) === 1, 'lessThan8Position failed');
const equalTo8Immediate = [3,3,1108,-1,8,3,4,3,99];
console.assert(processOpcode(equalTo8Immediate, [8]) === 1, 'equalTo8Immediate failed');
console.assert(processOpcode(equalTo8Immediate, [7]) === 0, 'equalTo8Immediate failed');
const lessThan8Immediate = [3,3,1107,-1,8,3,4,3,99];
console.assert(processOpcode(lessThan8Immediate, [8]) === 0, 'lessThan8Immediate failed');
console.assert(processOpcode(lessThan8Immediate, [7]) === 1, 'lessThan8Immediate failed');

const jumpTestNonzeroPosition = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
console.assert(processOpcode(jumpTestNonzeroPosition, [0]) === 0, 'jumpTestNonzeroPosition failed');
console.assert(processOpcode(jumpTestNonzeroPosition, [7]) === 1, 'jumpTestNonzeroPosition failed');
const jumpTestNonzeroImmediate = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
console.assert(processOpcode(jumpTestNonzeroImmediate, [0]) === 0, 'jumpTestNonzeroImmediate failed');
console.assert(processOpcode(jumpTestNonzeroImmediate, [7]) === 1, 'jumpTestNonzeroImmediate failed');

module.exports = { processOpcode };
