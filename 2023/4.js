const testInputString = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const { input } = require('./input/4');

const testInputCardValues = [
  8, 2, 2, 1, 0, 0,
];

const processInputString = (inputString) =>
  inputString.split('\n').map(processLine);

const processLine = (lineString) => {
  let splitBySpaces = lineString.split(' ')
    .filter((str) => str.length > 0);
  splitBySpaces.shift();
  const cardNumber = Number(splitBySpaces.shift().replace(':', ''));
  let winningNumbers = [];
  let numbersOnCard = [];
  let foundBar = false;
  while (splitBySpaces.length > 0) {
    const oneNumberOrBar = splitBySpaces.shift();
    if (oneNumberOrBar === '|') {
      foundBar = true;
    } else {
      const num = Number(oneNumberOrBar);
      if (foundBar) {
        numbersOnCard.push(num);
      } else {
        winningNumbers.push(num);
      }
    }
  }
  return {
    cardNumber,
    winningNumbers,
    numbersOnCard,
  };
}

// Card value is 2 to the power of the number of winning numbers
const getCardValue = ({ winningNumbers, numbersOnCard }) => {
  const matches = numbersOnCard.filter((oneNum) =>
    winningNumbers.includes(oneNum)
  );
  if (matches.length === 0) {
    return 0;
  }
  return matches.reduce((score, oneMatchedNumber) =>
    score === 0 ? 1 : score * 2
  , 0);
}

const testPart1 = () => {
  const cards = processInputString(testInputString);
  cards.forEach((oneCard, index) => {
    const cardValue = getCardValue(oneCard);
    if (cardValue !== testInputCardValues[index]) {
      console.log(`Test failed. Card ${index + 1} got ${cardValue} but should be ${testInputCardValues[index]}`);
    }
  });
}
testPart1();

const getValueForCards = (cards) =>
  cards.reduce((sum, oneCard) => sum + getCardValue(oneCard), 0);

const part1TestAnswer = getValueForCards(processInputString(testInputString));
if (part1TestAnswer !== 13) {
  console.log('Part 1 test failed, should be 13 but got ', part1TestAnswer);
}
const part1Answer = getValueForCards(processInputString(input));

console.log('Part 1:', part1Answer);