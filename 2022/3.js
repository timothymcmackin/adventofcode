const fs = require('fs');
const path = require('path');

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


// const testInput = testInputString.split('\n').map(processInput);
// const testDuplicateScore = scoreDuplicates(testInput);
// console.log(testDuplicateScore);

const inputSacks = fs.readFileSync(path.resolve(__dirname, './inputs/3.txt'), 'utf8').split('\n').map(processInput);;
const inputDuplicateScore = scoreDuplicates(inputSacks);
console.log(inputDuplicateScore); //8243
