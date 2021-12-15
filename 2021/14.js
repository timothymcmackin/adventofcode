const _ = require('lodash');

const testCaseTemplate = 'NNCB';
const testCaseSubstitutions = `CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const puzzleTemplate = 'KFFNFNNBCNOBCNPFVKCP';
const puzzleSubstitutions = `PB -> F
KC -> F
OB -> H
HV -> N
FS -> S
CK -> K
CC -> V
HF -> K
VP -> C
CP -> S
HO -> N
OS -> N
HS -> O
HB -> F
OH -> V
PP -> B
BS -> N
VS -> F
CN -> B
KB -> O
KH -> B
SS -> K
NS -> B
BP -> V
FB -> S
PV -> O
NB -> S
FC -> F
VB -> P
PC -> O
VF -> K
BV -> K
OO -> B
PN -> N
NH -> H
SP -> B
KF -> O
BN -> F
OF -> C
VV -> H
BB -> P
KN -> H
PO -> C
BH -> O
HC -> B
VO -> O
FV -> B
PK -> V
KO -> H
BK -> V
SC -> S
KV -> B
OV -> S
HK -> F
NP -> V
VH -> P
OK -> S
SO -> C
PF -> C
SH -> N
FP -> V
CS -> C
HH -> O
KK -> P
BF -> S
NN -> O
OC -> C
CB -> O
BO -> V
ON -> F
BC -> P
NO -> N
KS -> H
FF -> V
FN -> V
HP -> N
VC -> F
OP -> K
VN -> S
NV -> F
SV -> F
FO -> V
PS -> H
VK -> O
PH -> P
NF -> N
KP -> S
CF -> S
FK -> P
FH -> F
CO -> H
SN -> B
NC -> H
SK -> P
CV -> P
CH -> H
HN -> N
SB -> H
NK -> B
SF -> H`;

const getSubsMap = (inputString) => {
  return inputString.split('\n')
    .map((oneLine) => {
      const data = oneLine.split(' -> ');
      return [data[0], data[1]];
    })
    .reduce((allSubs, oneSub) => {
      allSubs[oneSub[0]] = oneSub[1];
      return allSubs;
    }, {});
}

// Part 1: brute force
const getString = (template, subsMap, iterations) => {
  var output = template.split('');
  for (let counter = 0; counter < iterations; counter++) {
    // Iterate through the entire string
    var i = 0;
    var newOutput = [];
    while (i < output.length) {

      // Keep making substitutions before incrementing
      // NNCB
      // NCNCB
      // NBCNCB
      // NCNBCHB
      const lettersToCheck = output[i] + output[i + 1];
      if (subsMap[lettersToCheck]) {
        newOutput.push(output[i]);
        newOutput.push(subsMap[lettersToCheck]);
      } else {
        newOutput.push(output[i]);
      }

      i++;
      
    }
    output = [...newOutput];

    // console.log(output.join(''));
  }
  return output.join('');
}

function getPairs(template) {
  var pairs = {};
  // Keep track of pairs of letters instead of the whole string
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.substring(i, i + 2);
    if (!pairs[pair]) {
      pairs[pair] = 0;
    }
    pairs[pair]++;
  }
  return pairs;
}

const evaluateStringFaster = (template, subsMap, iterations) => {
  var pairs = getPairs(template);
  var newPairs;

  for (let iterationCounter = 0; iterationCounter < iterations; iterationCounter++) {
    newPairs = {};

    _.forEach(pairs, (numberOfThisPair, pairToReplace) => {
      if (numberOfThisPair === 0 || !subsMap[pairToReplace]) {
        // No substitutions needed
        return;
      }
      const charToInsert = subsMap[pairToReplace];

      const newPairOne = pairToReplace.split('')[0] + charToInsert;
      const newPairTwo = charToInsert + pairToReplace.split('')[1];
      // Add two new pairs
      if (!newPairs[newPairOne]) {
        newPairs[newPairOne] = 0;
      }
      newPairs[newPairOne] += numberOfThisPair;
      if (!newPairs[newPairTwo]) {
        newPairs[newPairTwo] = 0;
      }
      newPairs[newPairTwo] += numberOfThisPair;
    });

    pairs = JSON.parse(JSON.stringify(newPairs));


  }

  return pairs;

}

/*
Apply 10 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?
*/
const evaluateLettersOld = (string) => {
  const letters = string.split('');
  const letterTotals = letters.reduce((totals, oneLetter) => {
    if (!totals[oneLetter]) {
      totals[oneLetter] = 0;
    }
    totals[oneLetter]++;
    return totals;
  }, {});
  console.log(letterTotals);

  const maxLetter = _.reduce(letterTotals, (max, currentLetter) => Math.max(max, currentLetter));
  const minLetter = _.reduce(letterTotals, (min, currentLetter) => Math.min(min, currentLetter));
  console.log(`evaluateLettersOld: ${maxLetter} - ${minLetter} = ${maxLetter - minLetter}`);
  return maxLetter - minLetter;
}

const evaluateLettersNew = (pairs, originalTemplate) => {

  var letterCount = _.reduce(pairs, (totals, pairTotal, onePair) => {
    const letter1 = onePair[0];
    const letter2 = onePair[1];
    if (!totals[letter1]) {
      totals[letter1] = 0;
    }
    totals[letter1] += pairTotal;
    if (!totals[letter2]) {
      totals[letter2] = 0;
    }
    totals[letter2] += pairTotal;
    return totals;
  }, {});

  // All letters get double-counted, so add the first and last letter and divide by 2
  const firstLetter = originalTemplate.substring(0, 1);
  const lastLetter = originalTemplate.substring(originalTemplate.length - 1);
  letterCount[firstLetter]++;
  letterCount[lastLetter]++;
  const letterTotals = _.mapValues(letterCount, (count) => count / 2);

  console.log(letterTotals);

  const maxLetter = _.reduce(letterTotals, (max, currentLetter) => Math.max(max, currentLetter));
  const minLetter = _.reduce(letterTotals, (min, currentLetter) => Math.min(min, currentLetter));
  console.log(`evaluateLettersNew: ${maxLetter} - ${minLetter} = ${maxLetter - minLetter}`);
  return maxLetter - minLetter;

}

const testCaseMap = getSubsMap(testCaseSubstitutions);
// const testCaseAfter4Steps = getString(testCaseTemplate, testCaseMap, 4);
// const testCaseAfter10Steps = getString(testCaseTemplate, testCaseMap, 10);
// console.log(evaluateLettersOld(testCaseAfter4Steps))
// console.log(getPairs(testCaseAfter4Steps));
// const testCasePairs = evaluateStringFaster(testCaseTemplate, testCaseMap, 4);
// console.log(testCasePairs)
// console.assert(evaluateLettersOld(testCaseAfter10Steps) === 1588, 'test case failed');
// console.log(evaluateLettersNew(testCasePairs, testCaseTemplate));


const puzzleMap = getSubsMap(puzzleSubstitutions);
// const puzzleAfter10Steps = getString(puzzleTemplate, puzzleMap, 40);
// evaluateLettersOld(puzzleAfter10Steps);
// "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB"

const puzzleAfter10Steps = evaluateStringFaster(puzzleTemplate, puzzleMap, 40);
evaluateLettersNew(puzzleAfter10Steps, puzzleTemplate)

// got really confused doing this one!