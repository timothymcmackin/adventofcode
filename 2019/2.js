function processOpcode(passedOpcode, position = 0) {
  var opcode = [...passedOpcode];
  const command = opcode[position];
  var mathToDo;
  if (command === 99) {
    return opcode;
  }

  const a = opcode[opcode[position + 1]];
  const b = opcode[opcode[position + 2]];

  if (command === 1) {
    // add
    mathToDo = add;
    // console.log(`Adding ${a}, ${b}`);
  } else if (command === 2) {
    // multiply
    // console.log(`multiplying ${a}, ${b}`);
    mathToDo = multiply;
  } else {
    // error
    throw new Error('Invalid code at position ' + position);
  }

  const result = mathToDo(a, b);
  opcode[opcode[position + 3]] = result;
  // console.log(opcode);
  return processOpcode(opcode, position + 4);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const promptSource = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,10,23,1,23,13,27,1,6,27,31,1,9,31,35,2,10,35,39,1,39,6,43,1,6,43,47,2,13,47,51,1,51,6,55,2,6,55,59,2,59,6,63,2,63,13,67,1,5,67,71,2,9,71,75,1,5,75,79,1,5,79,83,1,83,6,87,1,87,6,91,1,91,5,95,2,10,95,99,1,5,99,103,1,10,103,107,1,107,9,111,2,111,10,115,1,115,9,119,1,13,119,123,1,123,9,127,1,5,127,131,2,13,131,135,1,9,135,139,1,2,139,143,1,13,143,0,99,2,0,14,0];

const test1 = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
const result1 = [
  3500, 9, 10, 70,
  2, 3, 11, 0,
  99, 30, 40, 50
];
const test2 = [1,1,1,4,99,5,6,0,99];
const result2 = [30,1,1,4,2,5,6,0,99];

function test(passedInput, expectedResult, name) {
  const input = processOpcode(passedInput);
  if (input.length !== expectedResult.length) {
    console.error(name, ' doesn\'t have the same lengths');
  }

  for (let index = 0; index < input.length; index++) {
    const inputValue = input[index];
    const outputValue = expectedResult[index];
    if (inputValue !== outputValue) {
      console.error(`Test ${name}: At index ${index}, ${inputValue} doesn't match ${outputValue}`);
    }
  }
}
test(test1, result1, 'test1');
test(test2, result2, 'test2');

function processWithNounAndVerb(noun, verb) {
  var prompt = [...promptSource];
  prompt[1] = noun;
  prompt[2] = verb;
  return processOpcode(prompt);
}

for (let noun = 1; noun < 100; noun++) {
  for(let verb = 1; verb < 100; verb++) {
    const result = processWithNounAndVerb(noun, verb)[0];
    if (result === 19690720) {
      console.log('noun: ', noun);
      console.log('verb: ', verb);
      console.log('answer: ', 100 * noun + verb);
    }
  }
}

// console.log(processWithNounAndVerb(12, 2)[0])