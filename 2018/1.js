const fs = require('fs');
const path = require('path');

const startingFreq = 0;

let freq = startingFreq;

const inputText = fs.readFileSync(path.resolve(__dirname, './inputs/1.txt'), 'utf8');
const inputs = inputText.split('\n').map(Number);

// const endingFreq = inputs.reduce((sum, f) => sum + f);

let foundFreqs = [];
let freqTwice = false;
let counter = 0;

while (!freqTwice) {
  freq += inputs[counter];
  console.log(`freq is ${freq} after adding item ${counter}, which is ${inputs[counter]}`);
  if (foundFreqs.includes(freq)) {
    freqTwice = true;
  } else {
    foundFreqs.push(freq);
  }
  counter = counter === inputs.length - 1 ? 0 : counter + 1;
}

console.log(freq);

