const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const testInput = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.split('\n');

const input = fs.readFileSync(path.resolve(__dirname, './inputs/7.txt'), 'utf8').split('\n');

const stepRegex = /Step (.) must be finished before step (.) can begin./;

const getStepLogic = (input) => input.map((oneStep) => {
  const result = stepRegex.exec(oneStep);
  return [result[1], result[2]];
});

const getStepDependencies = (dependencies) => dependencies.reduce((deps, oneDep) => {
  const mustBeFinished = oneDep[0];
  const beforeCanBegin = oneDep[1];
  if (!deps[beforeCanBegin]) {
    deps[beforeCanBegin] = [];
  }
  if (!deps[mustBeFinished]) {
    deps[mustBeFinished] = [];
  }
  deps[beforeCanBegin].push(mustBeFinished);
  return deps;
}, {});

const testDeps = getStepDependencies(getStepLogic(testInput));
const inputDeps = getStepDependencies(getStepLogic(input));

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const getStepToRun = (stepsThatHaveRun, deps, currentSteps = []) => {
  let stepToRun;
  let i = 0;
  while (!stepToRun && i < Object.keys(deps).length) {
    const letter = alphabet[i];
    if (!stepsThatHaveRun.includes(letter) && !currentSteps.includes(letter)) {
      const stepsThatMustHaveRun = deps[letter];
      if (stepsThatMustHaveRun.every((oneLetter) => stepsThatHaveRun.includes(oneLetter))) {
        stepToRun = letter;
      }
    }
    i++
  }
  return stepToRun;
};

const runSteps = (passedDeps) => {
  let deps = JSON.parse(JSON.stringify(passedDeps));
  let stepsThatHaveRun = [];

  while (stepsThatHaveRun.length < Object.keys(passedDeps).length) {
    const stepToRun = getStepToRun(stepsThatHaveRun, deps);
    stepsThatHaveRun.push(stepToRun);
  }
  return stepsThatHaveRun.join('');
};

if (runSteps(testDeps) !== 'CABDFE') {
  console.error('runSteps test failed');
  process.exit(1);
}

// console.log(runSteps(inputDeps)); // part 1: BITRAQVSGUWKXYHMZPOCDLJNFE

// Part two: multiple workers

/*
workers:
[
  {
    currentStep: 'F',
    timeRemaining: 12,
  }
]
*/
const runStepsMultipleWorkers = (passedDeps, numWorkers, baseTime) => {
  let deps = JSON.parse(JSON.stringify(passedDeps));
  let workers = [];
  for (let i = 0; i < numWorkers; i++) {
    workers.push({currentStep: 'idle', timeRemaining: 0});
  }
  let stepsThatHaveRun = [];
  const maxTicks = 1000000;
  let i = 0;
  while (i < maxTicks && stepsThatHaveRun.length < Object.keys(passedDeps).length) {
    // iterate for each worker
    for (let w = 0; w < workers.length; w++) {
      // Work one second on task
      workers[w].timeRemaining--;
      if (workers[w].currentStep !== 'idle' && workers[w].timeRemaining <= 0) {
        // Step complete
        stepsThatHaveRun.push(workers[w].currentStep);
        workers[w].currentStep = 'idle';
      }
      if (workers[w].currentStep === 'idle') {
        const currentSteps = workers.map(({currentStep}) => currentStep)
          .filter((currentStep) => currentStep !== 'idle');
        const nextStep = getStepToRun(stepsThatHaveRun, deps, currentSteps);
        if (nextStep) {
          // Assign step to idle worker 
          workers[w].currentStep = nextStep;
          workers[w].timeRemaining = alphabet.indexOf(nextStep) + 1 + baseTime;
        } else {
          // Do nothing; no available steps
        }
      }
    }
    console.log(i, workers.map((w) => w.currentStep === 'idle' ? '.' : w.currentStep).join(' '), stepsThatHaveRun.join(''));
    i++;
  }
  return i - 1;
};
const inputResult = runStepsMultipleWorkers(inputDeps, 5, 60);
console.log(inputResult);
