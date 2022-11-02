const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const inputText = fs.readFileSync(path.resolve(__dirname, './inputs/2.txt'), 'utf8');
const inputs = inputText.split('\n');

/* Part 1
let twice = 0;
let thrice = 0;
let counter = 0;
while (counter < inputs.length) {
  const input = inputs[counter];
  // Get unique characters in string
  const uniqChars = _.uniq(input.split(''));
  const charCount = _.countBy(input, (c) => c);
  if (_.some(charCount, (v) => v === 2)) {
    twice++;
  }
  if (_.some(charCount, (v) => v === 3)) {
    thrice++;
  }
  counter++;
}

console.log(twice * thrice);
*/

let checkedStrings = [];
let counter = 0;
let matchedString;
while (!matchedString) {
  const input = inputs[counter];
  console.log(`Checking ${counter} of ${inputs.length} strings.`);
  if (!input) {
    console.error('too far');
    break;
  }


  const matchForInput = checkedStrings.find((str) => {
    // if only one char is off, it's a match
    let incorrectChars = 0;
    let j = 0;
    while (incorrectChars < 2 && j < str.length) {
      if (str.split('')[j] !== input.split('')[j]) {
        incorrectChars++;
      }
      j++;
    }
    if (incorrectChars === 1) {
      matchedString = str;
      return true;
    }
    return false;
  });

  if (matchForInput) {
    console.log(input, matchedString);
    let commonChars = '';
    for (let j = 0; j < input.length; j++) {
      if (input.split('')[j] === matchedString.split('')[j]) {
        commonChars += input.split('')[j];
      }
    }
    console.log('Common chars: ', commonChars)
  }

  checkedStrings.push(input);
  counter++;
}
