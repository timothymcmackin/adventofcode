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

module.exports = { processOpcode };
