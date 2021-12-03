function processOpcode(passedOpcode, input, position = 0) {
  var opcode = [...passedOpcode];
  const instruction = opcode[position];

  // How many values to shift to get to the next instruction
  var shiftValue;

  // opcode 4 returns an output
  var output;

  // The command is the two rightmost digits of the instruction
  const command = instruction % 100;
  if (command === 99) {
    return input;
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
    opcode[opcode[position + 1]] = input;
    shiftValue = 2;
  } else if (command === 4) {
    shiftValue = 2;
    // output the value at address a
    // if position mode, use reference
    // if immediate mode, use the literal value
    const aMode = modeDigits.pop();
    return aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1];
  } else if (command === 5) {
    // jump to the second param if the first is not zero
    // 0 means refer to position; 1 means literal value
    const aMode = modeDigits.pop();
    const bMode = modeDigits.pop();
    const a = aMode === 0 ? opcode[opcode[position + 1]] : opcode[position + 1];
    const b = bMode === 0 ? opcode[opcode[position + 2]] : opcode[position + 2];
    if (a !== 0) {
      return processOpcode(opcode, null, b);
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
      return processOpcode(opcode, null, b);
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

  return processOpcode(opcode, output /*|| input*/, position + shiftValue);
}

// Split a number into digits
function splitNumber(number) {
  const digits = number.toString().split('');
  const realDigits = digits.map(Number);
  return realDigits;
}

const inputWith3 = [1002,4,3,4,33];
const inputWith4 = [3,0,4,0,99];
// console.assert(processOpcode(inputWith4, 12) === 12, 'inputWith4 failed');
// const equalTo8Position = [3,9,8,9,10,9,4,9,99,-1,8];
// console.assert(processOpcode(equalTo8Position, 8) === 1, 'equalTo8Position failed');
// console.assert(processOpcode(equalTo8Position, 7) === 0, 'equalTo8Position failed');
// const lessThan8Position = [3,9,7,9,10,9,4,9,99,-1,8];
// console.assert(processOpcode(lessThan8Position, 8) === 0, 'lessThan8Position failed');
// console.assert(processOpcode(lessThan8Position, 7) === 1, 'lessThan8Position failed');
// const equalTo8Immediate = [3,3,1108,-1,8,3,4,3,99];
// console.assert(processOpcode(equalTo8Immediate, 8) === 1, 'equalTo8Immediate failed');
// console.assert(processOpcode(equalTo8Immediate, 7) === 0, 'equalTo8Immediate failed');
// const lessThan8Immediate = [3,3,1107,-1,8,3,4,3,99];
// console.assert(processOpcode(lessThan8Immediate, 8) === 0, 'lessThan8Immediate failed');
// console.assert(processOpcode(lessThan8Immediate, 7) === 1, 'lessThan8Immediate failed');

// const jumpTestNonzeroPosition = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
// console.assert(processOpcode(jumpTestNonzeroPosition, 0) === 0, 'jumpTestNonzeroPosition failed');
// console.assert(processOpcode(jumpTestNonzeroPosition, 7) === 1, 'jumpTestNonzeroPosition failed');
// const jumpTestNonzeroImmediate = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
// console.assert(processOpcode(jumpTestNonzeroImmediate, 0) === 0, 'jumpTestNonzeroImmediate failed');
// console.assert(processOpcode(jumpTestNonzeroImmediate, 7) === 1, 'jumpTestNonzeroImmediate failed');

const largerExample = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
console.assert(processOpcode(largerExample, 6) === 999, 'largerExample failed');
console.assert(processOpcode(largerExample, 8) === 1000, 'largerExample failed');
console.assert(processOpcode(largerExample, 9) === 1001, 'largerExample failed');

const puzzleInputPart1 = [3,225,1,225,6,6,1100,1,238,225,104,0,2,136,183,224,101,-5304,224,224,4,224,1002,223,8,223,1001,224,6,224,1,224,223,223,1101,72,47,225,1101,59,55,225,1101,46,75,225,1101,49,15,224,101,-64,224,224,4,224,1002,223,8,223,1001,224,5,224,1,224,223,223,102,9,210,224,1001,224,-270,224,4,224,1002,223,8,223,1001,224,2,224,1,223,224,223,101,14,35,224,101,-86,224,224,4,224,1002,223,8,223,101,4,224,224,1,224,223,223,1102,40,74,224,1001,224,-2960,224,4,224,1002,223,8,223,101,5,224,224,1,224,223,223,1101,10,78,225,1001,39,90,224,1001,224,-149,224,4,224,102,8,223,223,1001,224,4,224,1,223,224,223,1002,217,50,224,1001,224,-1650,224,4,224,1002,223,8,223,1001,224,7,224,1,224,223,223,1102,68,8,225,1,43,214,224,1001,224,-126,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1102,88,30,225,1102,18,80,225,1102,33,28,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,677,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1107,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,108,226,226,224,102,2,223,223,1005,224,359,1001,223,1,223,1108,677,226,224,102,2,223,223,1006,224,374,101,1,223,223,108,677,226,224,102,2,223,223,1006,224,389,1001,223,1,223,107,226,226,224,102,2,223,223,1005,224,404,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,419,101,1,223,223,1107,677,677,224,102,2,223,223,1006,224,434,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,449,101,1,223,223,7,677,677,224,1002,223,2,223,1006,224,464,1001,223,1,223,1108,226,677,224,1002,223,2,223,1005,224,479,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,494,101,1,223,223,7,226,677,224,102,2,223,223,1005,224,509,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,524,101,1,223,223,8,226,677,224,1002,223,2,223,1006,224,539,1001,223,1,223,1007,677,677,224,102,2,223,223,1005,224,554,101,1,223,223,107,226,677,224,1002,223,2,223,1005,224,569,1001,223,1,223,1108,677,677,224,1002,223,2,223,1006,224,584,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,599,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,614,101,1,223,223,7,677,226,224,1002,223,2,223,1005,224,629,1001,223,1,223,107,677,677,224,1002,223,2,223,1006,224,644,101,1,223,223,1007,226,677,224,1002,223,2,223,1005,224,659,1001,223,1,223,1007,226,226,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226];
console.log(processOpcode(puzzleInputPart1, 5));

