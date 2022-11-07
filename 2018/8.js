const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const testInput = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(Number);
const input = fs.readFileSync(path.resolve(__dirname, './inputs/8.txt'), 'utf8').split(' ').map(Number);

// Peel one child off and return the remainder
// Recursive
const getValueOfChildren = (passedArr) => {
  let arr = JSON.parse(JSON.stringify(passedArr));
  // First number in array is number of child nodes
  // Second number is number of metadata numbers
  const numChildren = arr.shift();
  const numMetadata = arr.shift();
  let metaSum = 0;

  // No children
  if (numChildren === 0) {
    for (let i = 1; i <= numMetadata; i++) {
      metaSum += arr.shift();
    }
    return {
      sum: metaSum,
      remainingChildNodes: arr,
    };
  }

  // More than one child, so iterate
  for (let i = 0; i < numChildren; i++) {
    // Peel off one child
    const {
      sum,
      remainingChildNodes,
    } = getValueOfChildren(arr);
    metaSum += sum;
    arr = remainingChildNodes;
  }

  // Get meta of this element
  for (let i = 0; i < numMetadata; i++) {
    metaSum += arr.shift();
  }


  return {
    sum: metaSum,
    remainingChildNodes: arr,
  };
};

// console.log(getValueOfChildren(testInput).sum);
// console.log(getValueOfChildren(input).sum);

// Part 2: get value of root node based on indexes of children
const getValueOfRootNode = (passedArr) => {
  let arr = JSON.parse(JSON.stringify(passedArr));
  // First number in array is number of child nodes
  // Second number is number of metadata numbers
  const numChildren = arr.shift();
  const numMetadata = arr.shift();
  let metaSum = 0;

  // No children
  if (numChildren === 0) {
    for (let i = 1; i <= numMetadata; i++) {
      metaSum += arr.shift();
    }
    return {
      sum: metaSum,
      remainingChildNodes: arr,
    };
  }

  // More than one child, so iterate
  let childNodes = [];
  for (let i = 0; i < numChildren; i++) {
    // Peel off one child
    const {
      sum,
      remainingChildNodes,
    } = getValueOfRootNode(arr);
    childNodes.push(sum)
    arr = remainingChildNodes;
  }

  // Get meta of this element
  // its meta entries are the index of the child nodes to add to its value
  for (let i = 0; i < numMetadata; i++) {
    const metaIndex = arr.shift();
    if (childNodes[metaIndex - 1]) {
      metaSum += childNodes[metaIndex - 1];
    }
  }

  return {
    sum: metaSum,
    remainingChildNodes: arr,
  };
};
console.log(getValueOfRootNode(input).sum);