const fs = require('fs');
const path = require('path');

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/13.txt'), 'utf8');

const testInputString = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const processInputString = (str) => {
  const stringByPairs = str.split('\n\n');
  return stringByPairs.map((wholeStr) => {
    const pairs = wholeStr.split('\n');
    return pairs.map(stringToArray);
  });
};

// Break a string into array elements. Recursive.
// Wonder if I could do this with a reduce().
const stringToArray = (passedStr) => {

  if (passedStr.indexOf('[') != 0) {
    let contents = passedStr.split(',');
    return contents.length > 1 ? contents.map(Number) : Number(contents[0]);
  }

  let str = passedStr
    .substring(1, passedStr.length - 1)
    .split(' ')
    .join('');
  let elements = [];
  let openBrackets = 0;
  let runningString = '';
  for (const char of str.split('')) {
    if (runningString !== '' || char !== ',') {
      // Filter out the commas
      runningString += char;
    }
    if (char ==='[') {
      openBrackets++;
    }
    if (char === ']') {
      openBrackets--;
    }
    if (openBrackets === 0 && runningString.length > 0) {
      elements.push(runningString);
      runningString = '';
    }
  }
  return elements.map(stringToArray);
};

// Compairs two things and returns true/false/undefined
// When comparing two values, the first value is called left and the second value is called right. Then:
const isPairInRightOrder = (pair) => {
  const [a, b] = pair;
  // console.log('Compare', JSON.stringify(a), 'vs', JSON.stringify(b));
  // If both values are integers, the lower integer should come first. If the left integer is lower than the right integer, the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order. Otherwise, the inputs are the same integer; continue checking the next part of the input.
  if (typeof a === 'number' && typeof b === 'number') {
    if (a < b) {
      return true;
    }
    if (a > b) {
      return false;
    }
    return undefined;
  }
  // If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2);
  if (typeof a != 'number' && typeof b === 'number') {
    return isPairInRightOrder([a, [b]]);
  }
  if (typeof b != 'number' && typeof a === 'number') {
    return isPairInRightOrder([[a], b]);
  }
  // If both values are lists, compare the first value of each list, then the second value, and so on. If the left list runs out of items first, the inputs are in the right order. If the right list runs out of items first, the inputs are not in the right order. If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
  if (typeof a === 'object' && typeof b === 'object') {
    for (let i = 0; i < b.length; i++) {
      const elementB = b[i];
      if (a.length < i + 1) {
        // There's no matching list item in a, so left ran out of items
        return true;
      }
      const elementA = a[i];
      const result = isPairInRightOrder([elementA, elementB]);
      if (result !== undefined) {
        return result;
      }
    }
    if (a.length > b.length) {
      // Right list ran out of items first
      return false;
    }
  }

  return undefined;
};

const getSumOfPairsInRightOrder = (pairs) => pairs.reduce((sum, pair, index) =>
  isPairInRightOrder(pair) ? sum + index + 1 : sum
, 0);

const getIndexesOfPairsInRightOrder = (pairs) => pairs.reduce((pairIndexes, pair, index) =>
isPairInRightOrder(pair) ? pairIndexes.concat(index + 1) : pairIndexes
, []);

const testInput = processInputString(testInputString);
console.log(getSumOfPairsInRightOrder(testInput), 'should be 13');

const input = processInputString(inputString);
console.log('Part 1:', getSumOfPairsInRightOrder(input));
console.log('part 1 indexes:', getIndexesOfPairsInRightOrder(testInput), 'should be [ 1, 2, 4, 6 ]');
// 5729 too high
