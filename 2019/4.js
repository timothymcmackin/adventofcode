/*
You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

However, they do remember a few key facts about the password:

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?

Your puzzle input is 264360-746325.

945

--- Part Two ---
An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

Given this additional criterion, but still ignoring the range rule, the following are now true:

112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
How many different passwords within the range given in your puzzle input meet all of the criteria?
*/

const begin = 264360;
const end = 746325;

var numberOfPasswords = 0;
var currentNumber = begin;

// I'm sure there are smarter ways to do this based on incrementing a single place instead of adding 1, but let's let the computer do the work
while (currentNumber <= end) {
  const splitNum = splitNumber(currentNumber)
  if (hasDouble(splitNum) && allIncreasing(splitNum)) {
    numberOfPasswords++;
  }
  currentNumber ++;
}
console.log(numberOfPasswords, 'valid passwords');

function hasDouble(splitNum) {
  // Reduce to an array with the number of sequential digits, like this:
  // index 0: {number: 5, numberOfDigits: 3}
  const tokenizedDigits = splitNum.reduce((digitList, currentDigit) => {
    // If it's the first number, add it directly
    if (digitList.length === 0) {
      digitList.push({
        number: currentDigit,
        numberOfDigits: 1,
      });
      return digitList;
    }
    
    // If it matches the previous number, increment the previous number
    var currentDigitObject = digitList.pop();
    if (currentDigit === currentDigitObject.number) {
      currentDigitObject.numberOfDigits++;
      digitList.push(currentDigitObject);
      return digitList;
    }
    
    // If it doesn't match, add a new entry
    digitList.push(currentDigitObject);
    digitList.push({
      number: currentDigit,
      numberOfDigits: 1,
    });
    return digitList;
  }, []);
  // console.log(JSON.stringify(tokenizedDigits, null, 2))
  return tokenizedDigits.some(({ numberOfDigits }) => numberOfDigits === 2);
}

function allIncreasing(splitNum) {
  var position = 0;
  while (position < splitNum.length - 1 ) {
    if (splitNum[position] > splitNum[position + 1]) {
      return false;
    }
    position++;
  }
  return true;
}

// Split a number into digits
function splitNumber(number) {
  const digits = number.toString().split('');
  const realDigits = digits.map(Number);
  return realDigits;
}