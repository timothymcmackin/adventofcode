const { puzzleInput } = require('./inputs/input10');

const testCase = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

// Stop at the first incorrect closing character on each corrupted line.

// If the nesting is OK, return 0
// If the nesting is incomplete, return 0
// If the nesting is invalid, return
/*
  ): 3 points.
  ]: 57 points.
  }: 1197 points.
  >: 25137 points.
*/
// If you have to use chars to complete the line, score:
/*
Start with a total score of 0. Then, for each character, multiply the total score by 5 and then increase the total score by the point value given for the character in the following table:
  ): 1 point.
  ]: 2 points.
  }: 3 points.
  >: 4 points.
*/

const getLineValue = (line) => {
  var openCharStack = [];
  var lineChars = line.split('');

  var newChar;
  while (lineChars.length > 0) {
    newChar = lineChars.shift();
    if (['(', '[', '{', '<'].includes(newChar)) {
      openCharStack.push(newChar);
    } else {
      const closer = reverses[openCharStack.pop()];
      if (newChar !== closer) {
        // return corruptedPoints(newChar);
        return null;
      }
    }
  }

  if (openCharStack.length > 0) {
    // Line is incomplete
    var pointTotal = 0;
    while (openCharStack.length > 0) {
      const char = openCharStack.pop();
      const reverseChar = reverses[char];
      pointTotal *= 5;
      pointTotal += completionPoints(reverseChar);
    }
    return pointTotal;
  }

  // Line is valid and complete
  return 0;
}

const getSumOfLines = (input) => {
  const lineArray = input.split('\n');
  return lineArray.reduce((total, oneLine) => {
    const lineValue = getLineValue(oneLine);
    // console.log(oneLine, lineValue);
    return total + lineValue;
  }, 0);
}

const getMedianOfLines = (input) => {
  const lineArray = input.split('\n');
  const points = lineArray.map(getLineValue).filter((val) => !!val);
  return median(points);
}

const reverses = {
  '[': ']',
  ']': '[',
  '(': ')',
  ')': '(',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
};

const corruptedPoints = (char) => {
  if (char === ')') {
    return 3;
  } else if (char === ']') {
    return 57;
  } else if (char === '}') {
    return 1197;
  } else if (char === '>') {
    return 25137;
  }
}

const completionPoints = (char) => {
  if (char === ')') {
    return 1;
  } else if (char === ']') {
    return 2;
  } else if (char === '}') {
    return 3;
  } else if (char === '>') {
    return 4;
  }
}

function median(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

console.assert(getLineValue('[<>({}){}[([])<>]]') === 0, 'test case 1');
console.assert(getLineValue('{([(<{}[<>[]}>{[]{[(<()>') === 1197, 'test case 2');
console.assert(getLineValue('[[<[([]))<([[{}[[()]]]') === 3, 'test case 3');
console.assert(getLineValue('[<(<(<(<{}))><([]([]()') === 3, 'test case 4');
console.assert(getLineValue('<{([([[(<>()){}]>(<<{{') === 25137, 'test case 5');

// Completion of lines
console.assert(getLineValue('[({(<(())[]>[[{[]{<()<>>') === 288957, 'test case 6');
console.assert(getLineValue('[(()[<>])]({[<{<<[]>>(') === 5566, 'test case 7');
console.assert(getLineValue('(((({<>}<{<{<>}{[]{[]{}') === 1480781, 'test case 8');
console.assert(getLineValue('{<[[]]>}<{[{[{[]{()[[[]') === 995444, 'test case 9');
console.assert(getLineValue('<{([{{}}[<[[[<>{}]]]>[]]') === 294, 'test case 10');
/*
}}]])})] - 288957 total points.
)}>]}) - 5566 total points.
}}>}>)))) - 1480781 total points.
]]}}]}]}> - 995444 total points.
])}> - 294 total points.
*/

console.assert(getMedianOfLines(testCase) === 288957, 'test case median failed');

// console.assert(getSumOfLines(puzzleInput) === 374061, 'puzzle input failed')

console.log(getMedianOfLines(puzzleInput))