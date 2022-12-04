const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const testInputString = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const letterScores = letters.reduce((scores, char, i) => {
  scores[char] = i + 1;
  return scores;
}, {});

const processInput = (str) => {
  const length = str.length / 2;
  const a = str.substring(0, length);
  const b = str.substring(length);
  return [a, b];
};

const getDuplicate = (sack) => {
  const duplicate = sack[1].split('').find((char) => sack[0].split('').includes(char));
  return duplicate;
};

const scoreDuplicates = (sacks) => {
  const matches = sacks.map(getDuplicate);
  return matches.reduce((sum, char) => letterScores[char] ? sum + letterScores[char] : sum, 0);
}


const testInput = testInputString.split('\n').map(processInput);
const testDuplicateScore = scoreDuplicates(testInput);
console.log(testDuplicateScore);

const inputSacks = fs.readFileSync(path.resolve(__dirname, './inputs/3.txt'), 'utf8').split('\n').map(processInput);
const inputDuplicateScore = scoreDuplicates(inputSacks);
console.log(inputDuplicateScore); //8243

// part 2
const inputSacksPart2 = fs.readFileSync(path.resolve(__dirname, './inputs/3.txt'), 'utf8').split('\n');
const testInputSacksPart2 = testInputString.split('\n');

const getDuplicatesInGroups = (sacks) => {
  let dupes = [];
  while (sacks.length > 0) {
    const a = sacks.shift().split('');
    const b = sacks.shift().split('');
    const c = sacks.shift().split('');
    // find the character in all 3
    const inAllThree = _.uniq(a.filter((char) => b.includes(char) && c.includes(char)));
    if (inAllThree.length === 1) {
      dupes.push(inAllThree);
    } else {
      console.error('found more than one match');
    }
  }
  return dupes;
};

const testDupes = getDuplicatesInGroups(testInputSacksPart2);
console.log(testDupes)

const inputDupes = getDuplicatesInGroups(inputSacksPart2);
const inputDupesScores = inputDupes.reduce((sum, char) => letterScores[char] ? sum + letterScores[char] : sum, 0);
console.log(inputDupesScores);