const _ = require('lodash');
const { puzzleInput } = require('./inputs/input22');

const testCaseInput = `on x=10..12,y=10..12,z=10..12
on x=11..13,y=11..13,z=11..13
off x=9..11,y=9..11,z=9..11
on x=10..10,y=10..10,z=10..10`;

const testCaseInput2 = `on x=-20..26,y=-36..17,z=-47..7
on x=-20..33,y=-21..23,z=-26..28
on x=-22..28,y=-29..23,z=-38..16
on x=-46..7,y=-6..46,z=-50..-1
on x=-49..1,y=-3..46,z=-24..28
on x=2..47,y=-22..22,z=-23..27
on x=-27..23,y=-28..26,z=-21..29
on x=-39..5,y=-6..47,z=-3..44
on x=-30..21,y=-8..43,z=-13..34
on x=-22..26,y=-27..20,z=-29..19
off x=-48..-32,y=26..41,z=-47..-37
on x=-12..35,y=6..50,z=-50..-2
off x=-48..-32,y=-32..-16,z=-15..-5
on x=-18..26,y=-33..15,z=-7..46
off x=-40..-22,y=-38..-28,z=23..41
on x=-16..35,y=-41..10,z=-47..6
off x=-32..-23,y=11..30,z=-14..3
on x=-49..-5,y=-3..45,z=-29..18
off x=18..30,y=-20..-8,z=-3..13
on x=-41..9,y=-7..43,z=-33..15
on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
on x=967..23432,y=45373..81175,z=27513..53682`;

const initMap = (max) => {
  var map = {};
  for (let x = 0 - max; x <= max; x++) {
    map[x] = {};
    for (let y = 0 - max; y <= max; y++) {
      map[x][y] = {};
      for (let z = 0 - max; z <= max; z++) {
        map[x][y][z] = 0;
      }
    }
  }
  return map;
}

const runStep = (passedMap, step, max = 50) => {
  const map = JSON.parse(JSON.stringify(passedMap));
  const onOrOff = step.split(' ')[0];
  const numberString = step.split(' ')[1];
  const numberStrings = numberString.split(',');
  const numbers = numberStrings.reduce((nums, oneNum) => {
    const letter = oneNum.substring(0, 1);
    const onlyNums = oneNum.split('=')[1];
    const bothNumStrings = onlyNums.split('..');
    const bothNums = bothNumStrings.map((n) => parseInt(n, 10));

    var start = Math.min(...bothNums);
    start = start < 0 - max ? 0 - max : start;
    var end = Math.max(...bothNums);
    end = end > max ? max : end;

    nums[letter] = { start, end };
    return nums;
  }, {});

  for (let xcounter = numbers.x.start; xcounter <= numbers.x.end; xcounter++) {
    for (let ycounter = numbers.y.start; ycounter <= numbers.y.end; ycounter++) {
      for (let zcounter = numbers.z.start; zcounter <= numbers.z.end; zcounter++) {
       if (onOrOff === 'on') {
         map[xcounter.toString()][ycounter.toString()][zcounter.toString()] = 1;
       } else if (onOrOff === 'off') {
        map[xcounter.toString()][ycounter.toString()][zcounter.toString()] = 0;
       }
      }
    }
  }
  return map;
}

const runSteps = (passedMap, allStepsString, max) => {
  var map = JSON.parse(JSON.stringify(passedMap));
  const stepStrings = allStepsString.split('\n');
  for (let i = 0; i < stepStrings.length; i++) {
    const currentStepString = stepStrings[i];
    map = runStep(map, currentStepString, max);
  }
  return map;
}

const countLitCells = (map) => _.reduce(map, (xtotal, onex) =>
  _.reduce(onex, (ytotal, oney) =>
    _.reduce(oney, (ztotal, onez) =>
    onez + ztotal, ytotal)
  , xtotal)
, 0);

const testCaseMap = initMap(50);
const testCaseMapComplete = runSteps(testCaseMap, testCaseInput);
console.assert(countLitCells(testCaseMapComplete) === 39, 'test case 1 failed');

const testCase2Map = initMap(50);
const testCase2Complete = runSteps(testCase2Map, testCaseInput2);
console.assert(countLitCells(testCase2Complete) === 590784, 'test case 2 failed');

const puzzleMap = initMap(50);
const puzzleComplete = runSteps(puzzleMap, puzzleInput);
console.log(countLitCells(puzzleComplete));
