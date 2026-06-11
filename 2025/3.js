const fs = require('fs');
const path = require('path');

const rawInput = fs.readFileSync(path.resolve(__dirname, './input/3.txt'), 'utf8');

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

// Make the largest number possible by selecting two digits in order
const getLargest = (joltageString) => {
  // Is this as simple as picking the largest digit first
  // unless it's the last one?
  const digits = joltageString.split('').map(Number);
  const largest = Math.max(...digits);

  let result;

  // Edge case: number made of all the same digits
  const uniqueNumbers = [...new Set(digits)];
  if (uniqueNumbers.length === 1) {
    result = Number([uniqueNumbers[0], uniqueNumbers[0]].join(''));
    // console.log('Edge result:', joltageString, result);
    return result;
  }

  const indexOfLargest = digits.indexOf(largest);
  if (indexOfLargest != digits.length - 1) {
    // Largest number is not the last
    // Get the next largest number, after the largest
    const nextLargest = Math.max(...digits.slice(indexOfLargest + 1));
    result = (largest * 10) + nextLargest;
  } else {
    // Largest number is the last, get second largest
    const remainingNumbers = digits.filter((d) => d < largest);
    const secondLargest = Math.max(...remainingNumbers);
    result = (secondLargest * 10) + largest;
  }
  // console.log('Result:', joltageString, result);
  return result;
}

const part1TestResults = [98, 89, 78, 92];
testInput.split('\n').forEach((oneString, index) => {
  const result = getLargest(oneString);
  if (result !== part1TestResults[index]) {
    console.log('Test case failed, expected', part1TestResults[index], 'for', oneString, 'but got', result);
  }
})

const getTotalJoltage = (inputString) => inputString.split('\n').reduce((sum, oneString) =>
  sum + getLargest(oneString)  
, 0);

if (getTotalJoltage(testInput) !== 357) {
  console.log('Test case 1 failed');
}
console.log('Part 1:', getTotalJoltage(rawInput));

// Part 2: reduce to 12 digits and make the biggest number
// Thought about this a bit and am just going to brute force by removing each number and checking
const getBiggestByRemovingOneNumber = (joltageNumber) => {
  const digits = String(joltageNumber).split('').map(Number);
  let options = [];
  // Create a list of all the options
  for (let i = 0; i < digits.length; i++) {
    const oneSetOfDigits = [...digits];
    oneSetOfDigits.splice(i, 1);
    options.push(Number(oneSetOfDigits.map(String).join('')));
  }
  // Find the largest number
  return options.reduce((prevLargest, oneNumber) => Math.max(prevLargest, oneNumber), 0);
}

const getLargestPart2 = (joltageString) => {
  let currentNumber = BigInt(joltageString);
  while (String(currentNumber).split('').length > 12) {
    currentNumber = getBiggestByRemovingOneNumber(currentNumber);
  }
  return currentNumber;
}

const getTotalJoltagePart2 = (inputString) => inputString.split('\n').reduce((sum, oneString) =>
  sum + getLargestPart2(oneString)  
, 0);

const part2TestResults = [987654321111, 811111111119, 434234234278, 888911112111];
testInput.split('\n').forEach((oneString, index) => {
  const result = getLargestPart2(oneString);
  if (result !== part2TestResults[index]) {
    console.log('Test case failed, expected', part2TestResults[index], 'for', oneString, 'but got', result);
  }
})

console.log('Part 2:', getTotalJoltagePart2(rawInput));
