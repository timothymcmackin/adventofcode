const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const parseClaim = (claimString) => {
  const claimBySpaces = claimString.split(' ');
  const claimNo = Number(claimBySpaces[0].substring(1));
  const xy = claimBySpaces[2].split(':')[0].split(',').map(Number);
  const x = xy[0];
  const y = xy[1];
  const width = Number(claimBySpaces[3].split('x')[0]);
  const height = Number(claimBySpaces[3].split('x')[1]);
  return {
    claimNo,
    x,
    y,
    width,
    height,
  };
}
// Test parseClaim
const parseClaimTest = () => {
  const parseClaimTestVal = parseClaim('#1 @ 56,249: 24x16');
  const parseClaimTestResult = {
    claimNo: 1,
    x: 56,
    y: 249,
    width: 24,
    height: 16,
  };
  const {
    claimNo,
    x,
    y,
    width,
    height,
  } = parseClaimTestVal;
  if (claimNo !== parseClaimTestResult.claimNo) {
    console.log('Claim number fail');
    process.exit(1);
  }
  if (x !== parseClaimTestResult.x) {
    console.log('Claim x fail');
    process.exit(1);
  }
  if (y !== parseClaimTestResult.y) {
    console.log('Claim y fail');
    process.exit(1);
  }
  if (width !== parseClaimTestResult.width) {
    console.log('Claim width fail');
    process.exit(1);
  }
  if (height !== parseClaimTestResult.height) {
    console.log('Claim height fail');
    process.exit(1);
  }
}
parseClaimTest();

const claims = fs.readFileSync(path.resolve(__dirname, './inputs/3.txt'), 'utf8')
  .split('\n')
  .map(parseClaim);

// Get max width and height
const maxWidth = _.max(_.map(claims, ({ x, width }) => x + width));
const maxHeight = _.max(_.map(claims, ({ y, height }) => y + height));

let cloth = [];
const starterRow = [];
for (let i = 1; i <= maxWidth + 1; i++) {
  starterRow.push([0]);
}
for (let i = 1; i <= maxHeight + 1; i++) {
  cloth.push(starterRow);
}

const processClaim = (claim, passedCloth) => {
  const returnCloth = JSON.parse(JSON.stringify(passedCloth));
  const {
    claimNo,
    x,
    y,
    width,
    height,
  } = claim;
  console.log(`Processing claim ${claimNo} of ${claims.length}.`);
  for (let xCounter = x; xCounter < x + width; xCounter++) {
    for (let yCounter = y; yCounter < y + height; yCounter++) {
      returnCloth[xCounter][yCounter]++;
    }
  }
  return returnCloth;
};

const testCloth = [[0,0,0,2], [0,0,3,2]];

const countHigherThan = (passedCloth, higherThan) => _.flatten(passedCloth).filter((v) => v > higherThan).length
// tests
if (countHigherThan(testCloth, 1) !== 3) {
  console.log('countHigherThan failed');
  process.exit(1);
}

const finishedCloth = claims.reduce((updatedCloth, oneClaim) =>
  processClaim(oneClaim, updatedCloth)
, cloth);

console.log(countHigherThan(finishedCloth, 1));