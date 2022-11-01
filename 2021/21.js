const testCaseStart = {
  player1: 4,
  player2: 8,
};

const puzzleStart = {
  player1: 10,
  player2: 1,
}

var currentDieNumber = 0;
function rollDie() {
  if (currentDieNumber === 100) {
    currentDieNumber = 0;
  }
  console.log('rolling', currentDieNumber + 1)
  return ++currentDieNumber;
}

function advancePlayer(currentPosition, roll) {
  const newPosition = (currentPosition + roll) % 10;
  return newPosition === 0 ? 10 : newPosition;
}

function playGame(startPositions) {
  var { player1: p1position, player2: p2position } = startPositions;
  var p1 = 0;
  var p2 = 0;
  var numberOfRolls = 0;

  while (p1 < 1000 && p2 < 1000) {
    var currentRoll = 0;

    currentRoll = rollDie() + rollDie() + rollDie();
    numberOfRolls += 3;
    p1position = advancePlayer(p1position, currentRoll);
    p1 += p1position;
    if (p1 >= 1000) {
      return p2 * numberOfRolls;
    }

    currentRoll = rollDie() + rollDie() + rollDie();
    numberOfRolls += 3;
    p2position = advancePlayer(p2position, currentRoll);
    p2 += p2position;
    if (p2 >= 1000) {
      return p1 * numberOfRolls;
    }
    
  }
}

console.log(playGame(puzzleStart));
