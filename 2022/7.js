const path = require('path');
const fs = require('fs');

const testInputString = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/7.txt'), 'utf8');

// Break the string into two-field commands and responses
const cdRegex = /^\$\s+cd\s+(.+)/;
// const lsRegex = /^\$\s+ls^/;
const dirNameRegex = /^dir\s+(\w+)/;
const fileSizeRegex = /^(\d+)\s+(.+)/;
const stringToCmds = (str) => str.split('\n').map((line) => {
  if (cdRegex.test(line)) {
    const result = cdRegex.exec(line);
    return ['cd', result[1]];
  }
  // Don't need these commands
  // if (lsRegex.test(line)) {
  //   const result = lsRegex.exec(line);
  //   return ['ls', result[1]];
  // }
  if (dirNameRegex.test(line)) {
    const result = dirNameRegex.exec(line);
    if (result[1] === '..') {
      return ['dir', result[1]];
    }
  }
  if (fileSizeRegex.test(line)) {
    const result = fileSizeRegex.exec(line);
    return [Number(result[1]), result[2]];
  }
})
  .filter((line) => !!line);

const arraysEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  };
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// if array a starts with the same elements as array b
const arrayStartsWith = (a, b) => {
  for (var i = 0; i < a.length; ++i) {
    if (i > b.length - 1 || a[i] !== b[i]) return false;
  }
  return true;
};
const arraysWithTests = [
  [
    ['a','b','c'], ['a','b','c'], true,
  ],
  [
    ['a','b','c'], ['a','b','c','d'], true,
  ],
  [
    ['a','b','c'], ['a','b'], false,
  ],
];
for (const test of arraysWithTests) {
  if (arrayStartsWith(test[0], test[1]) !== test[2]) {
    console.error('test', test, 'failed.');
  }
}

// That wasn't working. Try another way.

const getDirSums = (cmds) => {
  let dirs = [];
  let currentDir = [];

  for (const cmd of cmds) {
    if (cmd[0] === 'cd') {
      if (cmd[1] === '..') {
        // Go up a folder
        currentDir.pop();
      } else {
        // Go deeper a folder
        currentDir.push(cmd[1]);
        // If the dir is not in the list already, add it
        if (!dirs.some((oneDir) => arraysEqual(oneDir.dir, currentDir))) {
          dirs.push({
            dir: [...currentDir],
            sum: 0,
          });
        }
      }
    }

    if (typeof cmd[0] === 'number') {
      // Add the file size to current dir and all parents
      const fileSize = cmd[0];
      dirs = dirs.map(({ dir, sum }) => {
        if (arrayStartsWith(dir, currentDir)) {
          return {
            dir,
            sum: sum + fileSize,
          };
        }
        return {
          dir,
          sum,
        };
      });
    }
  }

  return dirs;
}

const testCmds = stringToCmds(testInputString);
const testDirSums = getDirSums(testCmds);
const maxAmount = 100000;
const testSum = testDirSums.reduce((total, { sum }) => sum <= maxAmount ? total + sum: total , 0);
console.log('test part 1, should be 95437:', testSum);

const inputCmds = stringToCmds(inputString);
const inputDirSums = getDirSums(inputCmds);
const inputSum = inputDirSums.reduce((total, { sum }) => sum <= maxAmount ? total + sum: total , 0);
console.log('part 1 answer:', inputSum); //1582412


// Get the size of the smallest dir that, if deleted, would get unused disk space up to minUnusedSpace
const getSizeOfSmallestDir = (dirSums) => {
  const totalDiskSpace = 70000000;
  const minUnusedSpace = 30000000;

  // const totalFreeSpaceAtStart = totalDiskSpace - totalUsedDiskSpaceAtStart;
  // const spaceWeNeedToFree = totalFreeSpaceAtStart - minUnusedSpace;

  const sums = dirSums.map(({ sum }) => sum);
  const usedDiskSpace = Math.max(...sums);
  const currentFreeSpace = totalDiskSpace - usedDiskSpace;
  const spaceWeNeedToFree = minUnusedSpace - currentFreeSpace;

  const sumsThatWouldWork = sums.filter((sum) => sum >= spaceWeNeedToFree);
  return Math.min(...sumsThatWouldWork);
}

console.log('part 2 answer:', getSizeOfSmallestDir(inputDirSums));