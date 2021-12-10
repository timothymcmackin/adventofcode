const { puzzleInput } = require('./inputs/input9');

const { processOpcode } = require('./intCode');

console.log(processOpcode(puzzleInput, [1]));
// 203 too low: [0, 203] -- fixed code 203, I think
// Now getting [ 2854060604, 21101, 21107, 21108, 21102 ] // does that mean these codes are wrong? surprised that addition with 