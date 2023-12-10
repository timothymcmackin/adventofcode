const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const { input } = require('./input/1');

const digitRegex = new RegExp('^\\d$');
const filterOutLetters = (line) => line
  .split('')
  .filter(char => digitRegex.test(char))
  .join('');

const getLineValue = (line) => {
  const numbersArray = line.split('');
  const tensDigit = Number(numbersArray[0]);
  const onesDigit = Number(numbersArray.pop());
  return tensDigit * 10 + onesDigit;
}

// Part 1:
// Combine the first digit and the last digit (in that order) to form a single two-digit number.
// Then add the two-digit numbers
const getValuePart1 = (input) => {
  const lines = input.split('\n').map(filterOutLetters);
  const lineValues = lines.map(getLineValue);
  return lineValues.reduce((sum, value) => sum + value, 0);
}

// if (getValuePart1(testInput) !== 142) {
//   console.log('Test for part 1 failed. Should be 143 and got ' + getValuePart1(testInput));
// }

// console.log('Part 1: ' + getValuePart1(input));

// Part 2: convert the words to numbers in the string

const testInputPart2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

// The test input has 16 but the real input seems to have only 1-9
// const swaps = [
//   'zero', 'one', 'two', 'three', 'four', 'five',
//   'six', 'seven', 'eight', 'nine', 'ten',
//   'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
//   'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
// ];

// const swapsRound1 = [
//   ['fourteen', '14'],
//   ['sixteen', '16'],
//   ['seventeen', '17'],
//   ['eighteen', '18'],
//   ['nineteen', '19'],
// ];

// const swapsRound2 = [
//   ['zero', '0'],
//   ['one', '1'],
//   ['two', '2'],
//   ['three', '3'],
//   ['four', '4'],
//   ['five', '5'],
//   ['six', '6'],
//   ['seven', '7'],
//   ['eight', '8'],
//   ['nine', '9'],
//   ['ten', '10'],
//   ['eleven', '11'],
//   ['twelve', '12'],
//   ['thirteen', '13'],
//   ['fifteen', '15'],
// ];

// RTFM: Only 1-9 count even though there are teens in there
const swaps = [
  'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine',
]

// words-to-numbers doesn't work anymore
// console.log(wordsToNumbers('two1nine'));

// This doesn't work because "eightwothree" should be 83, not "eigh23"
/*
swaps.reduce((lineString, oneNumberString, idx) =>
  lineString.replaceAll(oneNumberString, idx.toString())
, line)
*/

// push the characters to a stack until you hit a number?
const convertStringPart2 = (input) => {
  // console.log("String:", input);
  // Split into sections divided by digits to make it easier to do replaces
  const chars = input.split('');
  const blocks = [];
  var currentString = '';
  while(chars.length > 0) {
    var char = chars.shift();
    if (digitRegex.test(char)) {
      // It's a digit
      if (currentString.length > 0) {
        blocks.push(currentString);
        currentString = '';
      }
      blocks.push(char);
    } else {
      // Not a digit
      currentString += char;
    }
  }
  if (currentString.length > 0) {
    blocks.push(currentString);
  }

  // Convert the strings to numbers
  // const blocksConvertedToNumbers = blocks.map((oneBlock) => {
  //   var newBlocks = [];
  //   while(oneBlock.length > 0) {
  //     if (digitRegex.test(oneBlock[0])) {
  //       newBlocks.push(oneBlock.substring(0, 1));
  //       oneBlock = oneBlock.substring(1);
  //     } else {
  //       foundMatch = false;
  //       swaps.forEach((numberName, index) => {
  //         if (oneBlock.startsWith(numberName)) {
  //           newBlocks.push(index + 1);
  //           oneBlock = oneBlock.replace(numberName, '');
  //           foundMatch = true;
  //         }

  //       });
  //       if (!foundMatch) {
  //         oneBlock = oneBlock.substring(1);
  //       }
  //     }
  //   }

  //   // Not sure how to do this piece by piece

  //   return newBlocks;
  // }).flat();

  const blocksConvertedToNumbers = blocks.map(convertBlockToNumber);
  // console.log("Becomes", blocksConvertedToNumbers.join(''), "with value", getLineValue(blocksConvertedToNumbers.join('')))
  return blocksConvertedToNumbers.join('');
}

// In the example, words got converted from the beginning, but it appears that they have to get converted by the end
// const convertBlockToNumber = (block) => {
//   if (digitRegex.test(block)) {
//     return block;
//   }
//   let blockArr = block.split('');
//   let str = '';
//   let result = '';
//   while (blockArr.length > 0) {
//     str = blockArr.pop() + str;
//     swaps.forEach((numberName, index) => {
//       if (str.startsWith(numberName)) {
//         result = String(index + 1) + result;
//         str = '';
//       }
//     });
//   }
//   return result;
// }

// console.log(convertStringPart2('eighttwothree'));

// testInputPart2.split('\n').forEach((line) => {
//   console.log(line, ' becomes ', convertStringPart2(line));
// })

// const getValuePart2 = (input) => {
//   const lines = input.split('\n');
//   const linesWithStringNumbers = lines.map(convertStringPart2);
//   const lineValues = linesWithStringNumbers
//     .map(filterOutLetters)
//     .map(getLineValue);
//   return lineValues.reduce((sum, value) => sum + value, 0);
// }

// const debugPart2 = (input) => {
//   const lines = input.split('\n');
//   const data = lines.map((oneLine) => ({
//     line: oneLine,
//     digits: convertStringPart2(oneLine),
//     value: getLineValue(convertStringPart2(oneLine)),
//   }));
//   data.map(({line, digits, value}) => console.log(line, digits, value));
//   const result = data.reduce((sum, { value }) => sum + value, 0);
//   console.log('Part 2:', result);
// }

const part2Attempt3 = (inputString) => {
  const lines = inputString.split('\n');
  return lines.reduce((sum, oneLine) =>
    sum + getLineValuePart2Attempt3(oneLine)
  , 0);
}

// I've tried replacing number names from the beginning and from the end
// Try getting the first number from the beginning and the last number from the end
const getLineValuePart2Attempt3 = (lineString) => {
  return (getBeginningNumber(lineString) * 10) + getEndNumber(lineString);
}

const getBeginningNumber = (lineString) => {
  let tempString = '';
  const line = lineString.split('');
  let foundNumber;

  while (line.length > 0) {
    const oneChar = line.shift();
    if (digitRegex.test(oneChar)) {
      return Number(oneChar);
    } else {
      tempString += oneChar;
      swaps.forEach((numberName, index) => {
        if (tempString.endsWith(numberName)) {
          foundNumber = index + 1;
        }
      });
      if (foundNumber) {
        return foundNumber;
      }
    }
  }
}

const getEndNumber = (lineString) => {
  let tempString = '';
  const line = lineString.split('');
  let foundNumber;

  while (line.length > 0) {
    const oneChar = line.pop(); // only difference is this pop instead of shift
    if (digitRegex.test(oneChar)) {
      return Number(oneChar);
    } else {
      tempString = oneChar + tempString; // Also the order here
      swaps.forEach((numberName, index) => {
        if (tempString.startsWith(numberName)) { // also startswith instead of endswith
          foundNumber = index + 1;
        }
      });
      if (foundNumber) {
        return foundNumber;
      }
    }
  }
}

const testPart2Attempt3 = () => {
  const testValues = [
    { line: 'two1nine', value: 29 },
    { line: 'eightwothree', value: 83 },
    { line: 'abcone2threexyz', value: 13 },
    { line: 'xtwone3four', value: 24 },
    { line: '4nineeightseven2', value: 42 },
    { line: 'zoneight234', value: 14 },
    { line: '7pqrstsixteen', value: 76 },
  ];

  testValues.forEach(({ line, value }) => {
    const calculatedValue = getLineValuePart2Attempt3(line);
    if (calculatedValue !== value) {
      console.log(`Test failed. Line ${line} returned ${calculatedValue} but it should be ${value}.`)
    }
  });
}
testPart2Attempt3();

if (part2Attempt3(testInputPart2) !== 281) {
  console.log('Test for part 2 failed. Should be 281 and got ' + getValuePart2(testInputPart2));
}
console.log("Part 2:", part2Attempt3(input));
// 55427 too low
// 55549 too high
// 55429 correct