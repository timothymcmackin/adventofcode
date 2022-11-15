const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const testInputStr = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;

const inputStr = `initial state: ##.##.#.#...#......#..#.###..##...##.#####..#..###.########.##.....#...#...##....##.#...#.###...#.##

.###. => #
###.# => #
#..#. => #
.#..# => #
...## => #
.#### => .
.#.## => #
#.... => .
#..## => .
..#.. => .
#.##. => #
##.#. => .
....# => .
#.#.. => #
.#... => #
.##.# => #
..### => .
.##.. => .
##... => #
###.. => #
##..# => #
...#. => .
..#.# => #
..##. => .
#...# => .
.#.#. => #
##### => .
#.#.# => .
####. => #
#.### => .
..... => .
##.## => .`;

const processInput = (str) => {
  const arr = str.split('\n');
  var initial = [];
  let plantGrowsIfMatches = [];
  let plantDoesNotGrowIfMatches = [];

  const initialRegex = /^initial state: ([#.]*)$/;
  const ruleRegex = /^([#.]{5}) => ([#.])/;

  arr.forEach(oneStr => {
    if (initialRegex.test(oneStr)) {
      const result = initialRegex.exec(oneStr);
      const initialString = result[1];
      initial = initialString.split('').reduce((allInits, char, idx) => {
        allInits[idx] = char === '#' ? true : false;
        return allInits;
      }, {});
    } else if (ruleRegex.test(oneStr)) {
      const result = ruleRegex.exec(oneStr);
      const grows = result[2] === '#' ? true : false;
      const ruleArray = result[1].split('').map((char) => char === '#' ? true : false);
      if (grows) {
        plantGrowsIfMatches.push(ruleArray);
      } else {
        plantDoesNotGrowIfMatches.push(ruleArray);
      }
    }
  });

  return { initial, plantGrowsIfMatches, plantDoesNotGrowIfMatches };
};

const runPots = ({ initial, plantGrowsIfMatches, plantDoesNotGrowIfMatches }, numGenerations) => {
  let pots = JSON.parse(JSON.stringify(initial));
  console.log(0, ':', '...', _.reduce(pots, (str, val) => str + (val ? '#' : '.'), ''));

  for (let gen = 1; gen <= numGenerations; gen++) {
    const prevPots = JSON.parse(JSON.stringify(pots));
    const maxStartingPots = Math.max(...Object.keys(pots).map(Number));

    let activePot = 0;
    let recentPots = [true, true, true, true, true]; // not necessary but simpler
    // Continue until 5 pots in a row are empty
    while (recentPots.some((val) => !!val) || activePot <= maxStartingPots) {
      // Get the prev state of the 5 adjacent pots to compare with the rules
      const prevAdjPots = ["-2", "-1", "0", "1", "2"].map((numStr) => {
        const adjIndex = Number(activePot) + Number(numStr);
        return !!prevPots[adjIndex.toString()];
      });
      if (plantGrowsIfMatches.some((oneRule) =>
          oneRule.every((val, index) => val === prevAdjPots[index])
      )) {
        pots[activePot.toString()] = true;
      } else {
        pots[activePot.toString()] = false;
      }
      recentPots.push(pots[activePot.toString()]);
      recentPots.shift();

      activePot++;
    }

    // Now go left from 0
    activePot = -1;
    recentPots = [0, 1, 2, 3, 4].map((numStr) => {
      const adjIndex = Number(activePot) + Number(numStr);
      return !!prevPots[adjIndex.toString()];
    });
    while (recentPots.some((val) => !!val)) {
      const prevAdjPots = ["-2", "-1", "0", "1", "2"].map((numStr) => {
        const adjIndex = Number(activePot) + Number(numStr);
        return !!prevPots[adjIndex.toString()];
      });
      if (plantGrowsIfMatches.some((oneRule) =>
          oneRule.every((val, index) => val === prevAdjPots[index])
      )) {
        pots[activePot.toString()] = true;
      } else {
        pots[activePot.toString()] = false;
      }

      recentPots.push(pots[activePot.toString()]);
      recentPots.shift();

      activePot--;
    }

    // console.log(gen, ':', '...', _.reduce(pots, (str, val) => str + (val ? '#' : '.'), ''));

    
  }
  // Count the active pots
  return _.reduce(pots, (count, val, idx) => val ? count + Number(idx) : count, 0);
};


const testInput = processInput(testInputStr);
const input = processInput(inputStr);


console.log(runPots(input, 100));