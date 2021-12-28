const { puzzleInput } = require('./inputs/input16');

const binaryTable = {
  '0':'0000',
  '1':'0001',
  '2':'0010',
  '3':'0011',
  '4':'0100',
  '5':'0101',
  '6':'0110',
  '7':'0111',
  '8':'1000',
  '9':'1001',
  'A':'1010',
  'B':'1011',
  'C':'1100',
  'D':'1101',
  'E':'1110',
  'F':'1111',
};

const testCase1 = 'D2FE28';
const testCase2 = '38006F45291200';
const testCase3 = 'EE00D40C823060';

const binToHex = (number) => parseInt(number, 2).toString(16).toUpperCase();
const binToDec = (number) => parseInt(number, 2);

const convertInputToBinary = (inputString) =>
  inputString.split('')
  .map((char) => binaryTable[char])
  .join('');
console.assert(convertInputToBinary('D2FE28') === '110100101111111000101000');

const getPacketVersionSum = (arr, topLevelPacket = false, packetLength = -1, numberOfPackets = -1) => {

  var versionSum = 0;

  while (arr.length && packetLength !== 0 && numberOfPackets !== 0) {
    const v = shift(arr, 3);
    const t = shift(arr, 3);
    const version = binToDec(v);
    const type = binToDec(t);
    versionSum += version;
    packetLength -= 6;
    numberOfPackets--;

    // 4 is a literal value
    /*
    Packets with type ID 4 represent a literal value. Literal value packets encode a single binary number. To do this, the binary number is padded with leading zeroes until its length is a multiple of four bits, and then it is broken into groups of four bits. Each group is prefixed by a 1 bit except the last group, which is prefixed by a 0 bit. These groups of five bits immediately follow the packet header.
    */
    if (type === 4) {
      var totalBitsInThisPacket = 6;
      var keepGoing = true;
      var resultBin = [];

      // For debugging, get the packet contents to compare with the test cases
      var packetContents = v + t;

      while (keepGoing) {
        keepGoing = arr.shift() === '1';
        const next = shift(arr, 4);
        packetContents += next;
        resultBin.push(next);
        totalBitsInThisPacket += 5;
        packetLength -= 5;
      }
      const resultDec = binToDec(resultBin.join(''));

      if (topLevelPacket) {
        // Remove padding
        const remainingPadding = 4 - (totalBitsInThisPacket % 4);
        const padding = shift(arr, remainingPadding);
        packetContents += padding;
        packetLength -= remainingPadding;
      }

      console.log('breakpoint');

    } else {
      // If type is not 4, it's an operator packet
      // Operator packets have a length type ID
      const lengthTypeId = arr.shift();
      packetLength--;
      if (lengthTypeId === '0') {
        /* If the length type ID is 0, then the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet. */
        // Can I just ignore this info? Can I assume that type 4s will still work as usual and I can continue using this while loop?
        // Or should I recurse?
        // Try recursing so I can get the totals for this packet
        const subPacketTotalLength = binToDec(shift(arr, 15));
        packetLength -= 15;
        const subPackets = shift(arr, subPacketTotalLength).split('');
        versionSum += getPacketVersionSum(subPackets, false, subPacketTotalLength);

      } else if (lengthTypeId === '1') {
        /* If the length type ID is 1, then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet. */
        // I think this messes up my packetLength calculation because I'm not accounting for the length of these packets
        // So if the current packet is inside a packetLength calculation it'll get thrown off
        const numberOfSubPackets = binToDec(shift(arr, 11));
        packetLength -= 11;
        versionSum += getPacketVersionSum(arr, false, -1, numberOfSubPackets);
      }
    }

  }

  return versionSum;

}

// Shift multiple values
// Changes the array
const shift = (arr, num) => {
  var returnChars = [];
  for (let i = 0; i < num; i++) {
    returnChars.push(arr.shift());
  }
  return returnChars.join('');
}

// console.log(getPacketVersionSum(convertInputToBinary(testCase1).split(''), true));
// const testCase2Arr = convertInputToBinary(testCase2).split('');
// console.log(getPacketVersionSum(testCase2Arr, true));

// const testCase3Arr = convertInputToBinary(testCase3).split('');
// console.log(getPacketVersionSum(testCase3Arr, true));

const puzzleArr = convertInputToBinary(puzzleInput).split('');
console.log(getPacketVersionSum(puzzleArr, true));