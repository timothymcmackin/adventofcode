const _ = require('lodash');

const puzzleInput = `inp w
mul x 0
add x z
mod x 26
div z 1
add x 14
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 1
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 7
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 13
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 26
add x -6
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 1
add x 14
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 0
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 26
add x -4
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 13
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 11
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 1
add x 11
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 1
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 26
add x 0
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 7
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 26
add x 0
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 11
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 26
add x -3
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 14
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 26
add x -9
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 4
mul y x
add z y

inp w
mul x 0
add x z
mod x 26
div z 26
add x -9
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y`;

const lastStep = `inp w
mul x 0
add x z
mod x 26
div z 26
add x -9
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y`;

function processInstructions(instructionString, passedInputs) {
  var inputs = passedInputs.toString().split('').map(Number);
  const instructions = instructionString.split('\n');
  // console.log(`Inputs: ${inputs}`);
  const state = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  for (let i = 0; i < instructions.length; i++) {
    const currentString = instructions[i];
    const command = currentString.split(' ')[0];
    const a = currentString.split(' ')[1];
    const bString = currentString.split('').length > 2 ? currentString.split(' ')[2] : null;
    const b = isFinite(bString) ? Number(bString) : state[bString];

    // If you're out of numbers, return z
    if (command === 'inp' && inputs.length === 0) {
      return state.z;
    }

    switch (command) {
      case 'inp':
        state[a] = inputs.shift();
        break;
        case 'add':
          state[a] = state[a] + b;
        break;
        case 'mul':
          state[a] = state[a] * b;
        break;
        case 'div':
          state[a] = Math.floor(state[a]/b);
        break;
        case 'mod':
          state[a] = state[a] % b;
        break;
        case 'eql':
          state[a] = state[a] === b ? 1 : 0;
        break;
      default:
        break;
    }
  }

  return state.z;
}

var results = [];
for (let i = 0; i < 1000000; i++) {
  const oneResult = processInstructions(lastStep, i);
  if (oneResult === 0) {
    results.push(i);
  }
}
console.log(results);