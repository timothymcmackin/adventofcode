// convert paths into an array of source/target values
const preprocessPath = (pathString) => ({
  source: pathString.split('-')[0],
  target: pathString.split('-')[1],
});

// Create an object that looks like this:
/*
{
  start: [
    'A',
    'b',
  ],
  'A': [
    'c',
    'D',
  ]
}
*/
function createPaths(pathStrings) {
  const pathsList = pathStrings.split('\n').map(preprocessPath);
  return pathsList.reduce((allPaths, { source, target }) => {
    if (!allPaths[source]) {
      allPaths[source] = [];
    }
    if (!allPaths[source].includes(target)) {
      allPaths[source].push(target);
    }
    if (!allPaths[target]) {
      allPaths[target] = [];
    }
    if (!allPaths[target].includes(source)) {
      allPaths[target].push(source);
    }
    return allPaths;
  }, {});
}

function countPathsRecursive(paths, previousStops = ['start']) {
  const currentStop = previousStops[previousStops.length - 1];
  if (currentStop === 'end') {
    // console.log(previousStops.join(','));
    return 1;
  }
  if (!paths[currentStop]) {
    return 0;
  }
  // Get potential targets
  const potentialTargets = paths[currentStop]
  // Part 1: Filter out potential targets that visit a small cave a second time
    // .filter((potentialTarget) => {
    //   if (previousStops.includes(potentialTarget)) {
    //     if (potentialTarget !== potentialTarget.toUpperCase()) {
    //       return false;
    //     }
    //   }
    //   return true;
    // });
  // Part 2: One small cave can be visited twice, but no other small cave can be visited twice
    .filter((nextStop) => {
      if (nextStop === 'start') {
        return false;
      }
      if (nextStop === nextStop.toUpperCase()) {
        // Large cave, ok to visit multiple times
        return true;
      }
      if (!haveIVisitedASmallCaveTwice(previousStops)) {
        // Have not yet visited a small cave twice, so OK to add this cave
        return true;
      } else {
        // I have visited a small cave twice
        // Can't visit the same small cave three times
        // Can't visit a second small cave twice
        // Either way, I can't visit the same small cave twice again
        return !previousStops.includes(nextStop);
      }
    });
  // Add a path if it can get to the end
  // Look for other paths that can get to the end
  return potentialTargets.reduce((sum, oneTarget) => {
    const newStops = previousStops.concat(oneTarget);
    return sum + countPathsRecursive(paths, newStops);
  }, 0);
}

const haveIVisitedASmallCaveTwice = (steps) => {
  var smallCaves = steps.filter((oneStop) => oneStop !== oneStop.toUpperCase());
  while (smallCaves.length > 1) {
    const oneCave = smallCaves.pop();
    if (smallCaves.includes(oneCave)) {
      return true;
    }
  }
  return false;
}
console.assert(haveIVisitedASmallCaveTwice(['a', 'b', 'a', 'c']), 'have I visited test 1');
console.assert(!haveIVisitedASmallCaveTwice(['a', 'b', 'd', 'c']), 'have I visited test 2');


const testCaseInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const testCaseInput2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const testCaseInput3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const puzzleInput = `pg-CH
pg-yd
yd-start
fe-hv
bi-CH
CH-yd
end-bi
fe-RY
ng-CH
fe-CH
ng-pg
hv-FL
FL-fe
hv-pg
bi-hv
CH-end
hv-ng
yd-ng
pg-fe
start-ng
end-FL
fe-bi
FL-ks
pg-start`;

const testCasePaths = createPaths(testCaseInput);
console.assert(countPathsRecursive(testCasePaths) === 36, 'test case 1');
const testCasePaths2 = createPaths(testCaseInput2);
console.assert(countPathsRecursive(testCasePaths2) === 103, 'test case 2');
const testCasePaths3 = createPaths(testCaseInput3);
console.assert(countPathsRecursive(testCasePaths3) === 3509, 'test case 3');

const puzzlePaths = createPaths(puzzleInput);
console.log(countPathsRecursive(puzzlePaths));