const { puzzleInput } = require('./inputs/input9');

const { runOpcode } = require('./intCode');

console.assert(runOpcode(puzzleInput, [1]).pop() === 2316632620);
console.log(runOpcode(puzzleInput, [2]));