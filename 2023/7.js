const testInputString = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const { inputString } = require('./input/7');

const processInput = (str) => {
  const lines = str.split('\n');
  return lines.map((oneLine) => ({
    hand: oneLine.split(' ')[0],
    bid: Number(oneLine.split(' ')[1]),
  }));
}

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const rankSortFunction = (aChar, bChar) => {
  const a = ranks.indexOf(aChar);
  const b = ranks.indexOf(bChar);
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
const testRankSort = () => {
  const result1 = ['J', 'Q'].sort(rankSortFunction);
  if (result1[0] !== 'Q') {
    console.log('Rank sort of J and Q failed');
  }
}
testRankSort();

// For ease of detecting three of a kinds, full houses, get the number of groups of matching characters
const getGroups = (hand) => {
  const groups = hand.reduce((obj, oneChar) => {
    if (!obj[oneChar]) {
      obj[oneChar] = 0;
    }
    obj[oneChar] += 1;
    return obj;
  }, {});
  return groups;
}

/*
Every hand is exactly one type. From strongest to weakest, they are:

1: Five of a kind, where all five cards have the same label: AAAAA
2: Four of a kind, where four cards have the same label and one card has a different label: AA8AA
3: Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
4: Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
5: Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
6: One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
7: High card, where all cards' labels are distinct: 23456
*/

const getType = (handString) => {
  const hand = handString.split('');
  const groups = getGroups(hand);
  const numGroups = Object.keys(groups).length;

  if (numGroups === 1) return 1; // Five of a kind

  if (numGroups === 5) return 7; // High card
  if (numGroups === 4) return 6; // One pair

  const keys = Object.keys(groups);
  if (numGroups == 3) {
    // Two pair or three of a kind
    // If there's a 3, it's three of a kind
    let result;
    keys.forEach((key) => {
      if (groups[key] === 3) {
        // Three of a kind
        result = 4;
      }
    });
    return result || 5;
  }

  if (numGroups === 2) {
    // Four of a kind or full house
    // If there's a 4, it's 4 of a kind
    let result;
    keys.forEach((key) => {
      if (groups[key] === 4) {
        // Four of a kind
        result = 2;
      }
    });
    return result || 3;
  }
}

const handSortFunction = (aHand, bHand) => {
  const a = getType(aHand.hand);
  const b = getType(bHand.hand);
  if (a < b) return -1;
  if (a > b) return 1;
  // If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand.
  let result = 0;
  let aArray = aHand.hand.split('');
  let bArray = bHand.hand.split('');
  while (result === 0 && aArray.length > 0) {
    const charA = aArray.shift();
    const charB = bArray.shift();
    result = rankSortFunction(charA, charB);
  }
  return result;
}
const testTyping = () => {
  [
    ["32T3K", 6],
    ["T55J5", 4],
    ["KK677", 5],
    ["KTJJT", 5],
    ["QQQJA", 4],
    ["AAAAA", 1],
    ["QQQ22", 3],
    ["44445", 2],
  ].forEach((testCase) => {
    if (testCase[1] !== getType(testCase[0])) {
      console.log('Test case', testCase[0], 'failed; got', getType(testCase[0]));
    }
  })
}
testTyping();

const testOrdering = () => {
  const result1 = [
    { hand: "KK677" },
    { hand: "KTJJT" },
  ].sort(handSortFunction);
  if (result1[0].hand !== "KK677") {
    console.log("sort of KK and KT failed.");
  }
  const result2 = [
    { hand: "KK677" },
    { hand: "23456" },
  ].sort(handSortFunction);
  if (result2[0].hand !== "KK677") {
    console.log("sort of KK and 23 failed.");
  }
  const result3 = [
    { hand: "KTJJT" },
    { hand: "T55J5" },
  ].sort(handSortFunction);
  if (result3[0].hand !== "T55J5") {
    console.log("sort of T55J5 and KTJJT failed.");
  }
  const result4 = [
    { hand: "KK677" },
    { hand: "T55J5" },
  ].sort(handSortFunction);
  if (result4[0].hand !== "T55J5") {
    console.log("sort of T55J5 and KK677 failed.");
  }
}
testOrdering();


const testInput = processInput(testInputString);
const input = processInput(inputString);

// Each hand wins an amount equal to its bid multiplied by its rank, where the weakest hand gets rank 1, the second-weakest hand gets rank 2, and so on up to the strongest hand.

const getTotalPart1 = (inputHands) => {
  const sortedHands = inputHands.sort(handSortFunction).reverse();
  return sortedHands.reduce((sum, { bid }, index) =>
    sum + (bid * (index + 1))
  , 0);
}
const testTotalPart1 = getTotalPart1(testInput);
if (testTotalPart1 !== 6440) {
  console.log('Test part 1 failed; got', testTotalPart1);
} else {
  console.log('Part 1:', getTotalPart1(input));
}


// Part 2: Js are jokers
const ranks2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

const rankSortFunction2 = (aChar, bChar) => {
  const a = ranks2.indexOf(aChar);
  const b = ranks2.indexOf(bChar);
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

const getType2 = (handString) => {
  const hand = handString.split('');
  const groups = getGroups(hand);

  // edge case
  if (handString === 'JJJJJ') {
    return 1;
  }

  // Part 2: put Js with the largest group of non-Js
  if (groups.J && groups.J > 0) {
    const numJs = groups.J;
    delete groups.J;
    const keys = Object.keys(groups);
    const keyOfLargest = keys.reduce((prevLargest, oneKey) => {
      if (groups[prevLargest] < groups[oneKey]) {
        return oneKey;
      }
      return prevLargest;
    });
    groups[keyOfLargest] += numJs;
  }

  const numGroups = Object.keys(groups).length;

  if (numGroups === 1) return 1; // Five of a kind

  if (numGroups === 5) return 7; // High card
  if (numGroups === 4) return 6; // One pair

  const keys = Object.keys(groups);
  if (numGroups == 3) {
    // Two pair or three of a kind
    // If there's a 3, it's three of a kind
    let result;
    keys.forEach((key) => {
      if (groups[key] === 3) {
        // Three of a kind
        result = 4;
      }
    });
    return result || 5;
  }

  if (numGroups === 2) {
    // Four of a kind or full house
    // If there's a 4, it's 4 of a kind
    let result;
    keys.forEach((key) => {
      if (groups[key] === 4) {
        // Four of a kind
        result = 2;
      }
    });
    return result || 3;
  }
}

const handSortFunction2 = (aHand, bHand) => {
  const a = getType2(aHand.hand);
  const b = getType2(bHand.hand);
  if (a < b) return -1;
  if (a > b) return 1;
  // If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand.
  let result = 0;
  let aArray = aHand.hand.split('');
  let bArray = bHand.hand.split('');
  while (result === 0 && aArray.length > 0) {
    const charA = aArray.shift();
    const charB = bArray.shift();
    result = rankSortFunction2(charA, charB);
  }
  return result;
}

const getTotalPart2 = (inputHands) => {
  const sortedHands = inputHands.sort(handSortFunction2).reverse();
  return sortedHands.reduce((sum, { bid }, index) =>
    sum + (bid * (index + 1))
  , 0);
}
const testTotalPart2 = getTotalPart2(testInput);
if (testTotalPart2 !== 5905) {
  console.log('Test part 2 failed; got', testTotalPart2);
} else {
  console.log('Part 2:', getTotalPart2(input));
}