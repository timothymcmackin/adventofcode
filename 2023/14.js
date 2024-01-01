const calculateWeightTestGrid = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`
  .split('\n')
  .map((oneLine) => oneLine.split(''));

// The amount of load caused by a single rounded rock (O) is equal to the number of rows from the rock to the south edge of the platform, including the row the rock is on. (Cube-shaped rocks (#) don't contribute to load.)

const calculateWeight = (passedGrid) => {
  // Reverse to make calculating the index easier
  const grid = passedGrid.reverse();
  return grid.reduce((gridSum, oneLine, rowIndex) =>
    oneLine.reduce((lineSum, oneChar) =>
      oneChar === 'O' ? lineSum + rowIndex + 1 : lineSum
    , gridSum)
  , 0);
}
if (calculateWeight(calculateWeightTestGrid) !== 136) {
  console.log('calculateWeight test failed');
}