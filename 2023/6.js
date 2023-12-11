const testInputString = `Time: 7 15 30
Distance: 9 40 200`;

const inputString = `Time: 48 93 84 66
Distance: 261 1192 1019 1063`;

const formatInput = (str) => {
  const lines = str.split('\n');
  const times = lines[0].split(' ');
  times.shift();
  const distances = lines[1].split(' ');
  distances.shift();
  const races = times.map((time, index) => ({
    time: Number(time),
    distance: Number(distances[index]),
  }));
  return races;
}

const testInput = formatInput(testInputString);
const input = formatInput(inputString);

/*
[
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 }
]
*/

// To avoid brute-forcing, get the start and end of the range of wins
// For example, for the first test race, you have to go at least 9
const getFirstTimeToWin = ({ time, distance }) => {
  let minWinTime;
  let holdDownButtonTime = 1;
  while (!minWinTime) {
    const timeToTravel = time - holdDownButtonTime;
    const distanceTraveled = timeToTravel * holdDownButtonTime;
    if (distanceTraveled > distance) {
      minWinTime = holdDownButtonTime;
    }
    holdDownButtonTime++;
  }
  return minWinTime;
}

const getLastTimeToWin = ({ time, distance }) => {
  let lastWinTime;
  let holdDownButtonTime = time;
  while (!lastWinTime) {
    const timeToTravel = time - holdDownButtonTime;
    const distanceTraveled = timeToTravel * holdDownButtonTime;
    if (distanceTraveled > distance) {
      lastWinTime = holdDownButtonTime;
    }
    holdDownButtonTime--;
  }
  return lastWinTime;
}

// Get the number of different times that you could win with, inclusive
const getNumberOfWinningTimesForRace = (race) =>
  getLastTimeToWin(race) - getFirstTimeToWin(race) + 1; // +1 because inclusive

const getProductOfWinningTimes = (races) =>
  races.reduce((product, oneRace) => product * getNumberOfWinningTimesForRace(oneRace), 1);

const testInputResult = getProductOfWinningTimes(testInput);
if (testInputResult !== 288) {
  console.log('Test filed. Should be 288 but got ', testInputResult);
}
console.log('Part 1: ', getProductOfWinningTimes(input));

const formatInputPart2 = (str) => {
  const lines = str.split('\n');
  const times = lines[0].split(' ');
  times.shift();
  const distances = lines[1].split(' ');
  distances.shift();

  const time = Number(times.join(''));
  const distance = Number(distances.join(''));
  return { time, distance };
}

const testInputPart2 = formatInputPart2(testInputString);
const inputPart2 = formatInputPart2(inputString);

const testResultPart2 = getNumberOfWinningTimesForRace(testInputPart2);
if (testResultPart2 !== 71503) {
  console.log('Test filed. Should be 71503 but got ', testResultPart2);
}
console.log('Part 2: ', getNumberOfWinningTimesForRace(inputPart2));