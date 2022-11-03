const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync(path.resolve(__dirname, './inputs/5.txt'), 'utf8');
const testInput = 'dabAcCaCBAcCcaDA';

const reduceString = (passedString) => {
  let str = passedString;
  let madeChange = true;
  while (madeChange) {
    madeChange = false;
    let i = 0;
    while (i < str.length) {
      const letter1 = str.charAt(i);
      const letter2 = str.charAt(i + 1);
      // if they are the same letter
      if (letter1.toUpperCase() === letter2.toUpperCase()) {
        // if one is upper and the other is lower
        if ((letter1.toUpperCase() === letter1 && letter2.toLowerCase() === letter2) || (letter2.toUpperCase() === letter2 && letter1.toLowerCase() === letter1)) {
          // Trim those chars out of the string
          str = str.slice(0, i) + str.slice(i + 2);
          madeChange = true;
          i--;
        }
      }
      i++;
    }
  }
  return str;
};
if (reduceString(testInput) !== 'dabCBAcaDA') {
  console.error('reduceString test failed');
  process.exit(1);
}

console.log(reduceString(input).length); // part 1

// Part 2: remove one letter (upper and lower) and then reduce
// Which letter provides the smallest string?

// replaceAll() was giving me trouble, maybe due to the length of the string
const removeLetter = (char, passedString) => {
  const str = passedString.split('');
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== char && str[i] !== char.toUpperCase()) {
      result += str[i];
    }
    
  }
  return result;
}

const alphabet = 'abcdefghijklmnopqrstufwxyz'.split('');
const unreducedLengths = alphabet.map((char) => ({
  char,
  unreduced: removeLetter(char, input),
}));

const reducedLengths = unreducedLengths.map(({ char, unreduced }) => ({
  char,
  reduced: reduceString(unreduced),
}));

const stringLengths = reducedLengths.map(({ char, reduced }) => ({
  char,
  length: reduced.length,
}));

const shortest = stringLengths.reduce((soFarLongest, current) => 
  current.length < soFarLongest.length ? current : soFarLongest
);
console.log(shortest);