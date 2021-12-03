const { processOpcode } = require('./5');
const { puzzleInput } = require('./inputs/input7');

// 5 amplifiers
// Each accepts a program and a "phase" input from 0 to 4
// Output goes to next amplifier
// Try every combination of phase inputs and find out the largest output

const amplifier = (program, phase, input) => processOpcode(program, [phase, input]);

const runAmplifiers = (program, sequence, input = 0) => {
  const phase = sequence.shift();
  const output = amplifier(program, phase, input);
  if (sequence.length) {
    return runAmplifiers(program, sequence, output);
  }
  return output;
}

const sampleProgram1 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
const samplePhaseSetting1 = [4,3,2,1,0];
console.assert(runAmplifiers(sampleProgram1, samplePhaseSetting1) === 43210);
const sampleProgram2 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
const samplePhaseSetting2 = [0,1,2,3,4];
console.assert(runAmplifiers(sampleProgram2, samplePhaseSetting2) === 54321);
const sampleProgram3 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
const samplePhaseSetting3 = [0,1,2,3,4];
console.assert(runAmplifiers(sampleProgram3, samplePhaseSetting3) === 54321);

// Stole this from here:
// https://stackoverflow.com/questions/9960908/permutations-in-javascript
function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

// Get the largest possible output
const getMaxOfAmps = (program, availablePhases) => {
  const permutations = permutator(availablePhases);
  return permutations.reduce((currentLargest, currentPermutation) => {
    const result = runAmplifiers(program, currentPermutation);
    return Math.max(currentLargest, result);
  }, 0);
}

console.assert(getMaxOfAmps(sampleProgram1, [0,1,2,3,4]), 43210);
console.assert(getMaxOfAmps(sampleProgram2, [0,1,2,3,4]), 53321);
console.assert(getMaxOfAmps(sampleProgram3, [0,1,2,3,4]), 65210);

console.log(getMaxOfAmps(puzzleInput, [0,1,2,3,4]))