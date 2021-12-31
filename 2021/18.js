const { puzzleInput } = require('./inputs/input18');

function sanityCheck(arr) {
  // Number of open and close brackets should be the same
  const openBrackets = arr.filter((char) => char === '[').length;
  const closedBrackets = arr.filter((char) => char === ']').length;
  if (closedBrackets !== openBrackets) {
    console.log('This array doesn\'t have the same number of open and close brackets: ' + printNum(arr));
  }
  if (arr.some((char) => char === ',')) {
    console.log('This array has a comma: ' + printNum(arr));
  }
}

function checkIfSplitIsAppropriate(arr) {
  var i = 0;
  var numberOfOpenBrackets = 0;
  while (i < arr.length) {
    const char = arr[i];
    if (char === '[') {
      numberOfOpenBrackets++;
    }
    if (char === ']') {
      numberOfOpenBrackets--;
    }
    if (numberOfOpenBrackets >= 5) {
      return i;
    }
    i++;
  }
  return -1;
}


function reduceNumber(arr) {
  console.log();
  printNum(arr);
  var madeAChange = true;
  while (madeAChange) {
    madeAChange = false;

    // Run explodes
    var indexToExplode = whereToExplode(arr);
    while (indexToExplode > 0) {
      var i = 0;
      console.log(`Explode [${arr[indexToExplode]}, ${arr[indexToExplode + 1]}]`);
      arr = explode(arr, indexToExplode);
      printNum(arr);
      madeAChange = true;
      indexToExplode = whereToExplode(arr);
    }
    const splitok = checkIfSplitIsAppropriate(arr);
    if (splitok > -1) {
      console.log('Error: splitting but there is a 5-nested pair at ' + splitok);
    }
    // Check for a split
    var i = 0;
    var didASplit = false;
    while (!didASplit && i < arr.length) {
      if (isFinite(arr[i]) && arr[i] > 9) {
        console.log(`Split [${arr[i]}]`);
        arr = split(arr, i);
        printNum(arr);
        madeAChange = true;
        didASplit = true;
      }
      i++;
    }
  }
  return arr;
}

function whereToExplode(arr) {
  var i = 0;
  var indexOf5Nest = -1;
  var numberOfOpenBrackets = 0;
  while (i < arr.length && indexOf5Nest < 0) {
    const char = arr[i];
    if (char === '[') {
      numberOfOpenBrackets++;
    }
    if (char === ']') {
      numberOfOpenBrackets--;
    }
    if (numberOfOpenBrackets >= 5 && isFinite(arr[i]) && isFinite(arr[i + 1])) {
      indexOf5Nest = i;
    }
    i++;
  }
  return indexOf5Nest;
}

function explode(arr, indexOfLeftNumberToExplode) {
  // Find a 4-nested pair to explode
  // If any pair is nested inside four pairs, the leftmost such pair explodes.

  const leftNum = arr[indexOfLeftNumberToExplode];
  const rightNum = arr[indexOfLeftNumberToExplode + 1];
  arr.splice(indexOfLeftNumberToExplode - 1, 4, 0);

  // The leftmost number of the pair gets added to the first regular number to the left, if there is one
  var i = indexOfLeftNumberToExplode - 2;
  while (i > 0) {
    if (isFinite(arr[i])) {
      arr[i] += leftNum;
      i = 0;
    }
    i--;
  }

  // The right number of the pair gets added to the first regular number to the right, if there is one
  i = indexOfLeftNumberToExplode;
  while (i < arr.length) {
    if (isFinite(arr[i])) {
      arr[i] += rightNum;
      i = arr.length;
    }
    i++;
  }

  sanityCheck(arr);
  return removeExcessBrackets(arr);
}

function split(arr, indexOfNumberToSplit) {
  const numberToSplit = arr[indexOfNumberToSplit];
  var newPair = [];
  newPair.push('[');
  newPair.push(Math.floor(numberToSplit/2));
  newPair.push(Math.ceil(numberToSplit/2));
  newPair.push(']');
  arr.splice(indexOfNumberToSplit, 1, ...newPair);
  sanityCheck(arr);
  return arr;
}

const processStringToArr = (str) => {
  const arr = str.split('')
    .filter((char) => char !== ',')
    .map((char) => isFinite(char) ? Number(char) : char);
  sanityCheck(arr);
  return arr;
};

function addNumbers(numberString) {
  const numbers = numberString.split('\n').map(processStringToArr);
  return numbers.reduce(addArrays);
}

function addArrays(arr1, arr2) {
  const unreducedSum = ['[', ...arr1, ...arr2, ']'];
  printNum(arr1);
  console.log('+');
  printNum(arr2);
  console.log('=');
  const reducedNumber = reduceNumber(unreducedSum);
  printNum(reducedNumber);
  console.log();
  console.log();
  return reducedNumber;
}

const printNum = (arr) => {
  const printString = arr.reduce((str, element, index) => {
    if (index === arr.length - 1) {
      // Last item
      return str + element.toString();
    }
    const nextChar = arr[index + 1];
    if (isFinite(element) && isFinite(nextChar)) {
      return str + element.toString() + ',';
    }
    if (isFinite(element) && nextChar === '[') {
      return str + element.toString() + ',';
    }
    if (element === ']' && nextChar === '[') {
      return str + element + ',';
    }
    if (element === ']' && isFinite(nextChar)) {
      return str + element + ',';
    }
    return str + element.toString();
  }, '');
  console.log(printString);
}

const removeExcessBrackets = (arr) => {
  var madeAChange = true;
  while (madeAChange) {
    const locationOfFirstParen = arr.findIndex((element, index) => element === '[' && arr[index + 1] === ']');
    if (locationOfFirstParen > 0) {
      madeAChange = true;
      arr.splice(locationOfFirstParen, 2);
    } else {
      madeAChange = false;
    }
  }
  return arr;
}

/*
To check whether it's the right answer, the snailfish teacher only checks the magnitude of the final sum. The magnitude of a pair is 3 times the magnitude of its left element plus 2 times the magnitude of its right element. The magnitude of a regular number is just that number.
*/

// Returns [arr1, arr2]
function splitPair(passedArr) {
  var arr = JSON.parse(JSON.stringify(passedArr));
  var arr1 = [];
  // Get rid of enclosing brackets
  arr.shift();
  arr.pop();
  var numberOfOpenBrackets = 0;
  do {
    const char = arr.shift();
    arr1.push(char);
    if (char === '[') {
      numberOfOpenBrackets++;
    }
    if (char === ']') {
      numberOfOpenBrackets--;
    }
  } while (numberOfOpenBrackets > 0);
  const arr2 = JSON.parse(JSON.stringify(arr));
  return [arr1, arr2];
}

function getMagnitude(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  if (arr.length === 4) {
    return (3 * arr[1]) + (2 * arr[2]);
  }
  var split = splitPair(arr);
  return (3 * getMagnitude(split[0])) + (2 * getMagnitude(split[1]));
}
// const magnitudeTest = processStringToArr('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]');
// console.assert(getMagnitude(magnitudeTest) === 3488, 'magnitude test');

function getMaxMagOfList(numberString) {
  const numbers = numberString.split('\n').map(processStringToArr);
  var largestMagnitude = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) {
        const magnitude = getMagnitude(addArrays(numbers[i], numbers[j]));
        if (magnitude > largestMagnitude) {
          largestMagnitude = magnitude;
        }
      }
    }
  }
  return largestMagnitude;
}

const testCase1 = `[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`;
const testCase2 = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]`;
const testCase3 = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;
const testCase4 = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

const puzzleOutput = addNumbers(puzzleInput);
printNum(puzzleOutput); //[[[[6,0],[6,7]],[[7,7],[7,7]]],[[[7,7],[7,8]],[9,[5,5]]]]
console.log(getMagnitude(puzzleOutput));

console.log(getMaxMagOfList(puzzleInput));


