const path = require('path');
const fs = require('fs');

const testInputString = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/ `;

const testInputStringPart2 = `/>-<)  
|   |  
| /<+-)
| | | v
)>+</ |
  |   ^
  )<->/`;

const inputString = fs.readFileSync(path.resolve(__dirname, './inputs/13.txt'), 'utf8');

const processInputString = (str) => str.split('\n').map((oneLine) => {
  let arr = [];
  for (let i = 0; i < oneLine.length; i++) {
    arr.push(oneLine[i]);
  }
  // Verify that all rows are the same length
  const row0length = arr[0].length;
  if (arr.some((oneRow) => oneRow.length !== row0length)) {
    console.error('Rows not the same length; check backslash issues');
    process.exit(1);
  }
  return arr;
});

// Remove carts and make them a separate object because they need memory of previous turn
const removeCartsFromGrid = (passedGrid) => {
  let grid = JSON.parse(JSON.stringify(passedGrid));
  let carts = [];
  const nextTurn = 'left';
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      // Process grid at [y][x]
      const char = grid[y][x];
      if (char === '>' || char === '<') {
        carts.push({ x, y, char, nextTurn });
        grid[y][x] = '-';
      }
      if (char === '^' || char === 'v') {
        carts.push({ x, y, char, nextTurn });
        grid[y][x] = '|';
      }
    }
  }
  return { grid, carts };
};

const sortCarts = (passedCarts) => passedCarts.sort(cartSortFn);

const cartSortFn = (cartA, cartB) => {
  if (cartA.y < cartB.y) {
    return -1;
  }
  if (cartA.y > cartB.y) {
    return 1;
  }
  if (cartA.x < cartB.x) {
    return -1;
  }
  if (cartA.x > cartB.x) {
    return 1;
  }
  return 0;
}

const getCartMatch = (carts) => {
  // If any carts have the same x and y, they match
  for (let i = 1; i < carts.length; i++) {
    const cart1 = carts[i];
    const cart2 = carts[i - 1];
    if (cart1.x === cart2.x && cart1.y === cart2.y) {
      return cart1.x + ',' + cart1.y;
    }
  }
};

const removeCrashedCarts = (passedCarts) => passedCarts.reduce((carts, oneCart) => {
  let nonDuplicatedCarts = [];
  let isDuplicate = false;
  if (carts.length === 0) {
    return [oneCart];
  }
  carts.forEach(compareCart => {
    if (compareCart.x === oneCart.x && compareCart.y === oneCart.y) {
      isDuplicate = true;
    } else {
      nonDuplicatedCarts.push(compareCart);
    }
  });
  if (!isDuplicate) {
    nonDuplicatedCarts.push(oneCart);
  }
  return nonDuplicatedCarts;
}, []);

const findFirstCrash = (passedString) => {
  let processedString = processInputString(passedString);
  let { grid, carts } = removeCartsFromGrid(processedString);
  const maxIterations = 50000;
  let i = 0;
  while (i < maxIterations) {
    i++;
    // put carts in order
    carts = sortCarts(carts);

    // Move each cart
    for (let j = 0; j < carts.length; j++) {
      const cart = carts[j];
      let targetX = cart.x;
      let targetY = cart.y;
      let newChar = cart.char;
      let nextTurn = cart.nextTurn;
      switch (cart.char) {
        case '>':
          targetX++;
          break;
        case '<':
          targetX--;
          break;
        case '^':
          targetY--;
          break;
        case 'v':
          targetY++;
          break;
        default:
          break;
      }
      // Get the target grid char
      let targetGridChar = grid[targetY][targetX];
      // Going straight
      if (targetGridChar === '|' || targetGridChar === '-') {
        // Do nothing
      }
      // curves
      if (targetGridChar === '\\' || targetGridChar === ')') {
        if (cart.char === '>') {
          newChar = 'v';
        }
        if (cart.char === '^') {
          newChar = '<';
        }
        if (cart.char === 'v') {
          newChar = '>';
        }
        if (cart.char === '<') {
          newChar = '^';
        }
      }
      if (targetGridChar === '/') {
        if (cart.char === '>') {
          newChar = '^';
        }
        if (cart.char === 'v') {
          newChar = '<';
        }
        if (cart.char === '^') {
          newChar = '>';
        }
        if (cart.char === '<') {
          newChar = 'v';
        }
      }
      // Intersections
      // Change char and update next turn
      if (targetGridChar === '+') {
        const arrowsByIndex = ['^', '>', 'v', '<'];
        // If the next turn is left
        const currentIndex = arrowsByIndex.indexOf(cart.char);
        let newIndex = currentIndex;
        switch (cart.nextTurn) {
          case 'left':
            newIndex = currentIndex === 0 ? 3 : newIndex - 1;
            break;
          case 'right':
            newIndex = currentIndex === 3 ? 0 : newIndex + 1;
            break;
          case 'straight':
            // Do nothing
            break;
          default:
            break;
        }
        newChar = arrowsByIndex[newIndex];
        if (nextTurn === 'left') {
          nextTurn = 'straight';
        } else if (nextTurn === 'straight') {
          nextTurn = 'right';
        } else if (nextTurn === 'right') {
          nextTurn = 'left';
        }
      }

      carts[j] = {
        x: targetX,
        y: targetY,
        char: newChar,
        nextTurn,
      };
      const isMatch = getCartMatch(carts);
      if (!!isMatch) {
        return isMatch;
      }
    }
  }
};

const printGrid = (passedGrid, passedCarts) => {
  let grid = JSON.parse(JSON.stringify(passedGrid));
  passedCarts.forEach(({ x, y, char }) => {
    grid[y][x] = char;
  });
  console.log();
  console.log(grid.map((oneLine) => oneLine.join('')).join('\n'));
  console.log();
};

const findLastCart = (passedString) => {
  let processedString = processInputString(passedString);
  let { grid, carts } = removeCartsFromGrid(processedString);
  const maxIterations = 50000;
  let i = 0;
  let newCarts = JSON.parse(JSON.stringify(carts));
  printGrid(grid, newCarts);
  while (i < maxIterations) {
    i++;
    // put carts in order
    carts = sortCarts(newCarts);
    newCarts = [];
    // Move each cart
    for (let j = 0; j < carts.length; j++) {
      const cart = carts[j];
      let targetX = cart.x;
      let targetY = cart.y;
      let newChar = cart.char;
      let nextTurn = cart.nextTurn;
      switch (cart.char) {
        case '>':
          targetX++;
          break;
        case '<':
          targetX--;
          break;
        case '^':
          targetY--;
          break;
        case 'v':
          targetY++;
          break;
        default:
          break;
      }
      // Get the target grid char
      let targetGridChar = grid[targetY][targetX];
      // Going straight
      if (targetGridChar === '|' || targetGridChar === '-') {
        // Do nothing
      }
      // curves
      if (targetGridChar === '\\' || targetGridChar === ')') {
        if (cart.char === '>') {
          newChar = 'v';
        }
        if (cart.char === '^') {
          newChar = '<';
        }
        if (cart.char === 'v') {
          newChar = '>';
        }
        if (cart.char === '<') {
          newChar = '^';
        }
      }
      if (targetGridChar === '/') {
        if (cart.char === '>') {
          newChar = '^';
        }
        if (cart.char === 'v') {
          newChar = '<';
        }
        if (cart.char === '^') {
          newChar = '>';
        }
        if (cart.char === '<') {
          newChar = 'v';
        }
      }
      // Intersections
      // Change char and update next turn
      if (targetGridChar === '+') {
        const arrowsByIndex = ['^', '>', 'v', '<'];
        // If the next turn is left
        const currentIndex = arrowsByIndex.indexOf(cart.char);
        let newIndex = currentIndex;
        switch (cart.nextTurn) {
          case 'left':
            newIndex = currentIndex === 0 ? 3 : newIndex - 1;
            break;
          case 'right':
            newIndex = currentIndex === 3 ? 0 : newIndex + 1;
            break;
          case 'straight':
            // Do nothing
            break;
          default:
            break;
        }
        newChar = arrowsByIndex[newIndex];
        if (nextTurn === 'left') {
          nextTurn = 'straight';
        } else if (nextTurn === 'straight') {
          nextTurn = 'right';
        } else if (nextTurn === 'right') {
          nextTurn = 'left';
        }
      }

      // If the cart is not crashed, add it to newCarts for the next tick
      if (newCarts.some(({ x, y }) => x === targetX && y === targetY)) {
        // crash; remove cart and don't add current cart
        newCarts = newCarts.filter(({ x, y }) => !(x === targetX && y === targetY));
      } else {
        newCarts.push({
          x: targetX,
          y: targetY,
          char: newChar,
          nextTurn,
        });
      }

      
    }
    printGrid(grid, newCarts);
    if (newCarts.length === 1) {
      // What is the location of the last cart at the end of the first tick where it is the only cart left?
      return `${newCarts[0].x},${newCarts[0].y}`;
    }
    console.log(newCarts.length);
  }
};

console.log(findLastCart(testInputStringPart2));
// console.log(findLastCart(inputString));
// not 112,116
// not 113,116