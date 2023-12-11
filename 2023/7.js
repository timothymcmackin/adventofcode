const testInputString = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

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
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

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

console.log(getType('32T3K'))