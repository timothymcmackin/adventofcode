const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const { deepEqual } = require('assert');

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/16.txt'), 'utf8');
const testString = `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`;

// command: 9 2 1 2
// before: 3 2 1 1
// Output always goes into command[3], which is before's third register
// register A = 1
// register B = 2
// value A = 2
// value B = 1
const expectedResults = {
  addr: [3,2,3,1],
  addi: [3,2,2,1],
  mulr: [3,2,2,1],
  muli: [3,2,1,1],
  banr: [3,2,0,1],
  bani: [3,2,1,1],
  borr: [3,2,3,1],
  bori: [3,2,1,1],
  setr: [3,2,1,1],
  seti: [3,2,2,1],
  gtir: [3,2,0,1],
  gtri: [3,2,0,1],
  gtrr: [3,2,0,1],
  eqir: [3,2,1,1],
  eqri: [3,2,1,1],
  eqrr: [3,2,0,1],
};

const processInput = (inputStr) => {
  let str = inputStr.split('\n');
  const result = [];
  while (str.length > 0) {
    const beforeLine = str.shift();
    const commandLine = str.shift();
    const afterLine = str.shift();
    str.shift(); // blank line
    if (beforeLine === '') {
      return result;
    }

    const beforeRegex = /Before:\s*\[(\d*), (\d*), (\d*), (\d)\]/;
    const commandRegex = /^(\d*)\s(\d*)\s(\d*)\s(\d*)$/;
    const afterRegex = /After:\s*\[(\d*), (\d*), (\d*), (\d)\]/;

    const beforeResult = beforeRegex.exec(beforeLine);
    const commandResult = commandRegex.exec(commandLine);
    const afterResult = afterRegex.exec(afterLine);

    let oneInstance = {};
    oneInstance.before = [Number(beforeResult[1]), Number(beforeResult[2]), Number(beforeResult[3]), Number(beforeResult[4])];
    oneInstance.command = [Number(commandResult[1]), Number(commandResult[2]), Number(commandResult[3]), Number(commandResult[4])];
    oneInstance.after = [Number(afterResult[1]), Number(afterResult[2]), Number(afterResult[3]), Number(afterResult[4])];

    result.push(oneInstance);
  }
  return result;
};

// result of processInput(testString);
const exampleInstruction = processInput(testString);
// [
//   {
//     before: [ 3, 2, 1, 1 ],
//     command: [ 9, 2, 1, 2 ],
//     after: [ 3, 2, 2, 1 ]
//   }
// ];

const runCommands = ({ before, command }) => {
  let result = {};
  const vA = command[1];
  const vB = command[2];
  const rA = before[command[1]];
  const rB = before[command[2]];
  const outputRegister = command[3];
  // Addition:
  
  // addr (add register) stores into register C the result of adding register A and register B.
  const addr = rA + rB;
  let addrResult = JSON.parse(JSON.stringify(before));
  addrResult[outputRegister] = addr;
  result.addr = addrResult;
  // addi (add immediate) stores into register C the result of adding register A and value B.
  const addi = rA + vB;
  let addiResult = JSON.parse(JSON.stringify(before));
  addiResult[outputRegister] = addi;
  result.addi = addiResult;

  // Multiplication:
  
  // mulr (multiply register) stores into register C the result of multiplying register A and register B.
  const mulr = rA * rB;
  let mulrResult = JSON.parse(JSON.stringify(before));
  mulrResult[outputRegister] = mulr;
  result.mulr = mulrResult;
  // muli (multiply immediate) stores into register C the result of multiplying register A and value B.
  const muli = rA * vB;
  let muliResult = JSON.parse(JSON.stringify(before));
  muliResult[outputRegister] = muli;
  result.muli = muliResult;

  // Bitwise AND:
  
  // banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.
  const banr = parseInt(rA & rB, 2);
  let banrResult = JSON.parse(JSON.stringify(before));
  banrResult[outputRegister] = banr;
  result.banr = banrResult;
  // bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.
  const bani = parseInt(rA & vB, 2);
  let baniResult = JSON.parse(JSON.stringify(before));
  baniResult[outputRegister] = bani;
  result.bani = baniResult;

  // Bitwise OR:
  
  // borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.
  const borr = rA | rB;
  let borrResult = JSON.parse(JSON.stringify(before));
  borrResult[outputRegister] = borr;
  result.borr = borrResult;
  // bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.
  const bori = rA | vB;
  let boriResult = JSON.parse(JSON.stringify(before));
  boriResult[outputRegister] = bori;
  result.bori = boriResult;

  // Assignment:
  
  // setr (set register) copies the contents of register A into register C. (Input B is ignored.)
  const setr = rA;
  let setrResult = JSON.parse(JSON.stringify(before));
  setrResult[outputRegister] = setr;
  result.setr = setrResult;
  // seti (set immediate) stores value A into register C. (Input B is ignored.)
  const seti = vA;
  let setiResult = JSON.parse(JSON.stringify(before));
  setiResult[outputRegister] = seti;
  result.seti = setiResult;

  // Greater-than testing:
  
  // gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
  const gtir = vA > rB ? 1 : 0;
  let gtirResult = JSON.parse(JSON.stringify(before));
  gtirResult[outputRegister] = gtir;
  result.gtir = gtirResult;
  // gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
  const gtri = rA > vB ? 1 : 0;
  let gtriResult = JSON.parse(JSON.stringify(before));
  gtriResult[outputRegister] = gtri;
  result.gtri = gtriResult;
  // gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
  const gtrr = rA > rB ? 1 : 0;
  let gtrrResult = JSON.parse(JSON.stringify(before));
  gtrrResult[outputRegister] = gtrr;
  result.gtrr = gtrrResult;

  // Equality testing:
  
  // eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
  const eqir = vA === rB ? 1 : 0;
  let eqirResult = JSON.parse(JSON.stringify(before));
  eqirResult[outputRegister] = eqir;
  result.eqir = eqirResult;
  // eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
  const eqri = rA === vB ? 1 : 0;
  let eqriResult = JSON.parse(JSON.stringify(before));
  eqriResult[outputRegister] = eqri;
  result.eqri = eqriResult;
  // eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
  const eqrr = rA === rB ? 1 : 0;
  let eqrrResult = JSON.parse(JSON.stringify(before));
  eqrrResult[outputRegister] = eqrr;
  result.eqrr = eqrrResult;

  return result;
};

// console.log(runCommands(exampleInstruction[0]))
/*
{
  addr: [ 3, 2, 1, 3 ],
  addi: [ 3, 2, 1, 2 ],
  mulr: [ 3, 2, 1, 2 ],
  ...
*/

const compareArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let a1 = JSON.parse(JSON.stringify(arr1));
  let a2 = JSON.parse(JSON.stringify(arr2));
  while (a1.length > 0) {
    if (a1.shift() !== a2.shift()) {
      return false;
    }
  }
  return true;
};

const getMatchingOpcodes = (instruction) => {
  const { before, command, after } = instruction;
  const results = runCommands(instruction);
  const commands = Object.keys(results);
  return commands.filter((cmd) => {
    const result = results[cmd];
    return after[0] === result[0] && after[1] === result[1] && after[2] === result[2] && after[3] === result[3]
  });
};

// console.log(getMatchingOpcodes(exampleInstruction[0]));
const exampleResults = runCommands(exampleInstruction[0]);
const commands = Object.keys(expectedResults);
commands.forEach((cmd) => {
  if (!compareArrays(expectedResults[cmd], exampleResults[cmd])) {
    console.log(cmd, 'failed. Expected', expectedResults[cmd], ', got ', exampleResults[cmd])
  }
})

const inputInstructions = processInput(inputString);
const inputResults = inputInstructions.map(getMatchingOpcodes);
const inputResultsWithMoreThan3 = inputResults.filter((opcodes) => opcodes.length >= 3);

console.log(inputResultsWithMoreThan3.length);