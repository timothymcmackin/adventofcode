const testCase1 = `inp x
mul x -1`;

const testCase2 = `inp z
inp x
mul z 3
eql z x`;

const testCase3 = `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`;

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
    const bString = currentString.length > 2 ? currentString.split(' ')[2] : null;
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

  return state;
}

function bruteForceLargestNumber() {
  var currentNumber = 100000000000000;
  var result = { z: null };

  while (result.z !== 0) {
    currentNumber--;
    const inputs = currentNumber.toString().split('').map(Number);
    if (!inputs.includes(0)) {
      console.log(currentNumber);
      result = processInstructions(puzzleInput, inputs);
    }
  }
  return result;
}

// No worky
function getLargestByDigits() {
  // Go by digits and check if the result.z === 0
  // 14-digit number

  var successfulDigits = [];

  for (let digitCounter = 1; digitCounter <= 14; digitCounter++) {
    var currentDigitValue = 10;
    var foundTheLargestDigit = false;
    while (currentDigitValue > 0 && !foundTheLargestDigit) {
      currentDigitValue--;
      // Check to see if this number works
      var digitsToTry = successfulDigits.concat(currentDigitValue);
      while (digitsToTry.length < 14) {
        digitsToTry.push(9);
      }
      const numberToTry = Number(digitsToTry.map((d) => d.toString()).join(''));
      console.log(`Trying ${numberToTry}`);
      const result = processInstructions(puzzleInput, numberToTry);
      if (result.fail === 'yes') {
        // try the next digit
      } else {
        // Found the digit
        foundTheLargestDigit = true;
      }
    }
    if (currentDigitValue > 0) {
      // Found the digit
      console.log(`Found digit ${currentDigitValue}. New number starts with ${successfulDigits.map((d) => d.toString()).join('')}`);
      successfulDigits.push(currentDigitValue);
    }
    
  }

}

// No worky
function getLargestFirstDigit() {
  var numberToTry = 99999999999999;
  var foundIt = false;
  while (!foundIt && numberToTry >= 19999999999999) {
    const result = processInstructions(puzzleInput, numberToTry);
    if (result.length > 0) {
      console.log(result)
    }
    numberToTry -= Math.pow(10, 13);
  }
}

// Got a little help for this strategy
// After looking at the program, z is the only persistent state
// So numbers that give the same z can be collapsed
function getLargestAtEachDigit() {
  var candidates = [1,2,3,4,5,6,7,8,9];
  var iterations = candidates.map(iterateOnStem);
  const bestZs2digits = reduceIterationsToBestZs(iterations);
  var best = JSON.parse(JSON.stringify(bestZs2digits));
  for (let i = 3; i <= 14; i++) {
    best = reduceIterationsToBestZs(best.map((num, z) => iterateOnStem(num)));
    console.log(`Completed round ${i} with ${best.length} candidates.`);
    if (best[0]) {
      console.log(`Best 0 so far is ${best[0]}`);
    }
  }
  // filter best to largest number that returns a 0
  console.log(best[0]);
  // const bestZs4digits = reduceIterationsToBestZs(bestZs3digits.map((num, z) => iterateOnStem(num)));
}

// Reduce the list of candidates and eliminate duplicates
const reduceIterationsToBestZs = (candidates) => candidates.flat(1).reduce((allNums, { num, z }) => {
  if (allNums[z]) {
    if (allNums[z] < num) {
      allNums[z] = num;
    }
  } else {
    allNums[z] = num;
  }
  return allNums;
}, []);

// Iterate for the 9 numbers starting with the given numbers
function iterateOnStem(startingNumbers) {
  var results = [];
  for (let i = 1; i < 10; i++) {
    const num = startingNumbers * 10 + i;
    results.push({
      num,
      z: processInstructions(puzzleInput, num),
    })
  }
  return results;
}

// console.assert(processInstructions(testCase1, 5).x === -5, 'testCase1 failed');
// console.assert(processInstructions(testCase2, 39).z === 1, 'testCase2 failed 1');
// console.assert(processInstructions(testCase2, 29).z === 0, 'testCase2 failed 3');
// const testCase3Result = processInstructions(testCase3, 5);
// console.assert(testCase3Result.w === 0, 'testCase3 w');
// console.assert(testCase3Result.x === 1, 'testCase3 x');
// console.assert(testCase3Result.y === 0, 'testCase3 y');
// console.assert(testCase3Result.z === 1, 'testCase3 z');

getLargestAtEachDigit();
