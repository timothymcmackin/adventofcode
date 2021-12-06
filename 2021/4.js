const { puzzleBoards, puzzleCalledNumbers } = require('./inputs/input4');

const testCaseBoards = [
[
[22,13,17,11,0],
[8,2,23,4,24],
[21,9,14,16,7],
[6,10,3,18,5],
[1,12,20,15,19],
],[
[3,15,0,2,22],
[9,18,13,17,5],
[19,8,7,25,23],
[20,11,10,24,4],
[14,21,16,12,6],
],[
[14,21,17,24,4],
[10,16,15,9,19],
[18,8,23,26,20],
[22,11,13,6,5],
[2,0,12,3,7],
]
];

const testCaseCalledNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];

// Test if the board wins.
// If it wins, return the last number
// Otherwise, return -1
const doesBoardWin = (board, numbers) => {
  // Are any horizontal rows winners?
  if (board.some((oneRow) => 
    oneRow.every((oneNumber) => 
      numbers.includes(oneNumber)
    )
  )) {
    return true;
  }
  // Are any vertical columns winners?
  const cols = [0,1,2,3,4];
  if (cols.some((currentColumn) => {
    const numbersInColumn = board.map((oneRow) => oneRow[currentColumn]);
    return numbersInColumn.every((oneNumber) => 
      numbers.includes(oneNumber)
    );
  })) {
    return true;
  }
  // Are any diagonals winners?
  // Oops, no diagonals
  // var currentCol = 0;
  // const NWtoSEdiagonalNumbers = board.reduce((runningNumbers, currentRow) => {
  //   const numberToAdd = currentRow[currentCol];
  //   currentCol++;
  //   runningNumbers.push(numberToAdd);
  //   return runningNumbers;
  // }, []);
  // if (NWtoSEdiagonalNumbers.every((oneNumber) => numbers.includes(oneNumber))) {
  //   return true;
  // }
  // currentCol = 4;
  // const SWtoNEdiagonalNumbers = board.reduce((runningNumbers, currentRow) => {
  //   const numberToAdd = currentRow[currentCol];
  //   currentCol--;
  //   runningNumbers.push(numberToAdd);
  //   return runningNumbers;
  // }, []);
  // if (SWtoNEdiagonalNumbers.every((oneNumber) => numbers.includes(oneNumber))) {
  //   return true;
  // }
  return false;
}

console.assert(doesBoardWin(testCaseBoards[0], [22,13,17,11,0]), 'row win detection failed');
console.assert(doesBoardWin(testCaseBoards[0], [22,8,21,6,1]), 'column win detection failed');
// console.assert(doesBoardWin(testCaseBoards[0], [22,2,14,18,19]), 'NW to SE detection failed');
// console.assert(doesBoardWin(testCaseBoards[0], [1,10,14,4,0]), 'SW to NE detection failed');

// The score of a winning board is the sum of the non-called numbers times the last number called
const getBoardScore = (board, calledNumbers) => {
  const sumOfUncalledNumbers = board.reduce((sum, oneRow) => {
    sum += oneRow.reduce((rowSum, oneNumber) => {
      if (!calledNumbers.includes(oneNumber)) {
        rowSum += oneNumber;
      }
      return rowSum;
    }, 0);
    return sum;
  }, 0);
  return sumOfUncalledNumbers * calledNumbers[calledNumbers.length - 1];
}

const getFirstBoardToWin = (boards, passedNumbers) => {
  var allNumbers = [...passedNumbers]
  var calledNumbers = [];
  var winningBoards = [];
  while(allNumbers.length > 0) {
    calledNumbers.push(allNumbers.shift());
    boards.forEach((oneBoard) => {
      if (doesBoardWin(oneBoard, calledNumbers)) {
        winningBoards.push({
          score: getBoardScore(oneBoard, calledNumbers),
          board: oneBoard,
        });
      }
    });
    if (winningBoards.length > 0) {
      return winningBoards;
    }
  }
  throw new Error('No board won');
}

const getLastBoardToWin = (boards, passedNumbers) => {
  var allNumbers = [...passedNumbers]
  var calledNumbers = [];
  while(allNumbers.length > 0 && boards.length > 1) {
    calledNumbers.push(allNumbers.shift());
    boards = boards.filter((oneBoard) => !doesBoardWin(oneBoard, calledNumbers));
  }
  const lastWinningBoard = boards[0];
  while(!doesBoardWin(lastWinningBoard, calledNumbers)) {
    calledNumbers.push(allNumbers.shift());
  }
  return {
    score: getBoardScore(lastWinningBoard, calledNumbers),
    board: lastWinningBoard,
  }
}

// console.log(JSON.stringify(getFirstBoardToWin(testCaseBoards, testCaseCalledNumbers)));
console.assert(getFirstBoardToWin(testCaseBoards, testCaseCalledNumbers)[0].score === 4512, 'test case gave wrong score')
console.assert(getFirstBoardToWin(puzzleBoards, puzzleCalledNumbers)[0].score === 60368);

console.assert(getLastBoardToWin(testCaseBoards, testCaseCalledNumbers).score === 1924);

console.log(getLastBoardToWin(puzzleBoards, puzzleCalledNumbers).score)