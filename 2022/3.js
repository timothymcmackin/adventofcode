const path = require('path');
const fs = require('fs');

const inputs = fs.readFileSync(path.resolve(__dirname, './inputs/3.txt'), 'utf8').split('');

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
    height:16,
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