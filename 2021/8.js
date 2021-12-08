const { puzzleInput } = require('./inputs/input8');

const testCaseInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

/*
I don't know what letters correspond to what segments on the digital display, but I know:
1 is the only number with 2 segments
7 is the only number with 3 segments
8 is the only number with 7 segments
4 is the only number with 4 segments

2: 5 segments
3: 5 segments
5: 5 segments

6: 6 segments
9: 6 segments
0: 6 segments

identify 9 because it has everything in 4
that leaves 6 and 0

distinguish 2,3,5:
3 has everything in 1 but the others don't
distinguish 2 and 5

identify segment e as segments in 8 minus segments in 9
2 has e, 5 does not

distinguish 6 and 0:
0 has all segments from 7; 6 does not

Identify which numbers are made from which segments

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
 */

// Get how many 1,7,4,8s are in the output values
function get1478s(input) {
  const outputLines = input.split('\n').map((oneLine) => oneLine.split('|')[1].trim());
  const allOutputCodes = outputLines.reduce((allCodes, oneLine) => {
    return allCodes.concat(oneLine.split(' '));
  }, []);
  return allOutputCodes.reduce((runningCount, oneCode) => {
    if ([2,3,4,7].includes(oneCode.length)) {
      runningCount++;
    }
    return runningCount;
  }, 0);
}

// Get the output of one line
function getOutput(inputLine) {
  const inputNumberStrings = inputLine.split('|')[0].trim().split(' ');
  const outputNumberStrings = inputLine.split('|')[1].trim().split(' ');
  var unassignedStrings = [...inputNumberStrings];
  
  // 1 is the only number with 2 segments
  const string1 = unassignedStrings.find((str) => str.length === 2);
  unassignedStrings = unassignedStrings.filter((str) => str.length !== 2);
  // 7 is the only number with 3 segments
  const string7 = unassignedStrings.find((str) => str.length === 3);
  unassignedStrings = unassignedStrings.filter((str) => str.length !== 3);
  // 8 is the only number with 7 segments
  const string8 = unassignedStrings.find((str) => str.length === 7);
  unassignedStrings = unassignedStrings.filter((str) => str.length !== 7);
  // 4 is the only number with 4 segments
  const string4 = unassignedStrings.find((str) => str.length === 4);
  unassignedStrings = unassignedStrings.filter((str) => str.length !== 4);

  // 2, 3, and 5 have 5 segments
  var unassignedStrings5Segments = unassignedStrings.filter((str) => str.length === 5);
  // 9, 6, and 0 have 6 segments
  var unassignedStrings6Segments = unassignedStrings.filter((str) => str.length === 6);

  // identify 9 because it has everything in 4
  const string9 = unassignedStrings6Segments.find((str) => doesStringHaveSameLetters(string4, str));
  unassignedStrings6Segments = unassignedStrings6Segments.filter((str) => !doesStringHaveSameLetters(string4, str));

  // 3 has everything in 1 but the others don't
  const string3 = unassignedStrings5Segments.find((str) => doesStringHaveSameLetters(string1, str));
  unassignedStrings5Segments = unassignedStrings5Segments.filter((str) => !doesStringHaveSameLetters(string1, str));
  
  // identify segment e as segments in 8 minus segments in 9
  const segmentE = string8.split('').find((oneLetter) => !string9.split('').includes(oneLetter));
  // 2 has e, 5 does not
  const string2 = unassignedStrings5Segments.find((str) => str.split('').includes(segmentE));
  const string5 = unassignedStrings5Segments.find((str) => str !== string2);
  
  // distinguish 6 and 0:
  // 0 has all segments from 7; 6 does not
  const string0 = unassignedStrings6Segments.find((str) => doesStringHaveSameLetters(string7, str));
  const string6 = unassignedStrings6Segments.find((str) => str !== string0);

  const numberMap = [
    { string: string0, value: 0 },
    { string: string1, value: 1 },
    { string: string2, value: 2 },
    { string: string3, value: 3 },
    { string: string4, value: 4 },
    { string: string5, value: 5 },
    { string: string6, value: 6 },
    { string: string7, value: 7 },
    { string: string8, value: 8 },
    { string: string9, value: 9 },
  ];

  var output = 0;
  output += getValue(outputNumberStrings[0], numberMap) * 1000;
  output += getValue(outputNumberStrings[1], numberMap) * 100;
  output += getValue(outputNumberStrings[2], numberMap) * 10;
  output += getValue(outputNumberStrings[3], numberMap) * 1;

  return output;

}

// Return the value of a string based on the map of numbers
function getValue(str, numberMap) {
  const match = numberMap.find(({ string }) =>
    string.length === str.length &&doesStringHaveSameLetters(string, str)
  );
  return match.value;
}

// Return true if the submitted string has all of the same letters as the second string
function doesStringHaveSameLetters(str, letters) {
  const lettersArray = letters.split('');
  const strArray = str.split('');
  const result = strArray.every((oneLetter) => lettersArray.includes(oneLetter));
  return result;
}

function getSumOfOutputs(inputStrings) {
  return inputStrings.split('\n').reduce((total, oneString) => total + getOutput(oneString), 0);
}


console.assert(getOutput('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf') === 5353);
console.assert(getSumOfOutputs(testCaseInput) === 61229);
console.log(getSumOfOutputs(puzzleInput))