const testInputString = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const { input } = require('./input/3');

const digitRegex = new RegExp('^\\d$');
const isADigit = char => digitRegex.test(char);

const symbolRegex = new RegExp('[^\.\d]');
const isASymbol = char => char && symbolRegex.test(char);

// Get the sum of the numbers that are adjacent to (including diagonally)
// a character that is not a number or a period

const getSum = (inputString) => {
  // Split into a matrix
  const grid = inputString.split('\n')
    .map(s => s.split(''));
  return grid.reduce((sum, _oneLine, index) =>
    sum + getSumOneLine(index, grid)
  , 0);
}

// Process one line and return the sum of numbers with adjacent symbols
const getSumOneLine = (index, grid) => {
  var currentIdx = -1;
  var sum = 0;
  var lineToProcess = JSON.parse(JSON.stringify(grid[index]));
  var inANumber = false;

  var currentNumberString = '';
  const numbersAdded = []; // for debugging
  while (lineToProcess.length > 0) {
    var currentChar = lineToProcess.shift();
    currentIdx++;
    if (inANumber || isADigit(currentChar)) {
      if (isADigit(currentChar)) {
        // Another digit to add to the active number
        currentNumberString += currentChar;
        inANumber = true;
      } else {
        inANumber = false;
        if (currentNumberString.length > 0) {
          // End of a number
          const numberValue = Number(currentNumberString);
          if (hasAdjacentSymbol(index, currentIdx, currentNumberString.length - 1, grid)) {
            sum += numberValue;
            numbersAdded.push(numberValue);
            // if (numberValue === 240) console.log('Adding ', numberValue);
          } else {
            // if (numberValue === 240) console.log('Not adding', numberValue);
          }
          currentNumberString = '';
        }
      }
    }
  }
  // If the line ends with a number
  if (currentNumberString.length > 0) {
    const numberValue = Number(currentNumberString);
    if (hasAdjacentSymbol(index, currentIdx, currentNumberString.length - 1, grid)) {
      sum += numberValue;
      numbersAdded.push(numberValue);
      // if (numberValue === 240) console.log('Adding ', numberValue);
    } else {
      // if (numberValue === 240) console.log('Not adding', numberValue);
    }
  }
  console.log(numbersAdded);
  return sum;
}

// Return true if the number ending at the specified index has a symbol other than a period adjacent to it
const hasAdjacentSymbol = (yIndex, xEndIndex, numberLength, grid) => {
  const xIndex = xEndIndex - numberLength;
  // Check the character immediately before
  if (xIndex > 0 && isASymbol(grid[yIndex][xIndex - 2])) {
    return true;
  }
  // Check the character immediately after
  if (xEndIndex < grid[yIndex].length && isASymbol(grid[yIndex][xEndIndex])) {
    return true;
  }

  // Get the characters above
  if (yIndex > 0) {
    var charsAbove = [];
    // Check diagonally up and left
    if (xIndex > 0) {
      charsAbove.push(grid[yIndex - 1][xIndex - 2]);
    }
    // Get chars above
    const charsDirectlyAbove = grid[yIndex - 1].slice(xIndex - 1, xEndIndex);
    charsAbove = charsAbove.concat(charsDirectlyAbove);
    // Check diagonally up and right
    if (xEndIndex < grid[yIndex].length - 1) {
      charsAbove.push(grid[yIndex - 1][xEndIndex]);
    }
    if (charsAbove.some(isASymbol)) {
      return true;
    }
  }

  // Get the characters below
  if (yIndex < grid.length - 1) {
    var charsBelow = [];
    // Check diagonally down and left
    if (xIndex > 0) {
      charsBelow.push(grid[yIndex + 1][xIndex - 2]);
    }
    // Get chars immediately below
    const charsDirectlyBelow = grid[yIndex + 1].slice(xIndex - 1, xEndIndex);
    charsBelow = charsBelow.concat(charsDirectlyBelow);
    // Check diagonally down and right
    if (xEndIndex < grid[yIndex].length) {
      charsBelow.push(grid[yIndex + 1][xEndIndex]);
    }
    if (charsBelow.some(isASymbol)) {
      return true;
    }
  }

  return false;
}

const testPart1Sum = getSum(testInputString);
const part1Sum = getSum(input);
console.log('Part 1 test:', testPart1Sum);
console.log('Part 1 answer', part1Sum);
// 519922 too low
// 522978 too high

// const testOneLineString = '10*...*..4.....240';
// const testOneLineSum = getSum(testOneLineString);
// console.log(testOneLineSum);