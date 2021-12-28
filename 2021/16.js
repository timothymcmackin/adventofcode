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

// Part 2: get packet value

const getPacketValue = (arr, topLevelPacket = false, packetGroupMode = 0, packetLength = -1, numberOfPackets = -1) => {

  var packetValues = [];

  while (arr.length && packetLength !== 0 && numberOfPackets !== 0) {
    const v = shift(arr, 3);
    const t = shift(arr, 3);
    const version = binToDec(v);
    const packetType = binToDec(t);
    packetLength -= 6;
    numberOfPackets--;

    // 4 is a literal value
    /*
    Packets with type ID 4 represent a literal value. Literal value packets encode a single binary number. To do this, the binary number is padded with leading zeroes until its length is a multiple of four bits, and then it is broken into groups of four bits. Each group is prefixed by a 1 bit except the last group, which is prefixed by a 0 bit. These groups of five bits immediately follow the packet header.
    */
    if (packetType === 4) {
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

      packetValues.push(resultDec);

      if (topLevelPacket) {
        // Remove padding
        const remainingPadding = 4 - (totalBitsInThisPacket % 4);
        const padding = shift(arr, remainingPadding);
        packetContents += padding;
        packetLength -= remainingPadding;
      }

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
        packetValues.push(getPacketValue(subPackets, false, packetType, subPacketTotalLength));

      } else if (lengthTypeId === '1') {
        /* If the length type ID is 1, then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet. */
        // I think this messes up my packetLength calculation because I'm not accounting for the length of these packets
        // So if the current packet is inside a packetLength calculation it'll get thrown off
        const numberOfSubPackets = binToDec(shift(arr, 11));
        packetLength -= 11;
        packetValues.push(getPacketValue(arr, false, packetType, -1, numberOfSubPackets));
      }
    }

  }

  if (packetValues.length === 1) {
    return packetValues[0];
  }

  /*
  Packets with type ID 0 are sum packets - their value is the sum of the values of their sub-packets. If they only have a single sub-packet, their value is the value of the sub-packet.
  Packets with type ID 1 are product packets - their value is the result of multiplying together the values of their sub-packets. If they only have a single sub-packet, their value is the value of the sub-packet.
  Packets with type ID 2 are minimum packets - their value is the minimum of the values of their sub-packets.
  Packets with type ID 3 are maximum packets - their value is the maximum of the values of their sub-packets.
  Packets with type ID 5 are greater than packets - their value is 1 if the value of the first sub-packet is greater than the value of the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
  Packets with type ID 6 are less than packets - their value is 1 if the value of the first sub-packet is less than the value of the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
  Packets with type ID 7 are equal to packets - their value is 1 if the value of the first sub-packet is equal to the value of the second sub-packet; otherwise, their value is 0. These packets always have exactly two sub-packets.
  */
  switch (packetGroupMode) {
    case 0:
      return packetValues.reduce((sum, val) => sum + val, 0);
      break;
    case 1:
      return packetValues.reduce((sum, val) => sum * val, 1);
      break;
    case 2:
      return Math.min(...packetValues);
      break;
    case 3:
      return Math.max(...packetValues);
      break;
    case 5:
      if (packetValues[0] > packetValues[1]) {
        return 1;
      } else {
        return 0;
      }
      break;
    case 6:
      if (packetValues[0] < packetValues[1]) {
        return 1;
      } else {
        return 0;
      }
      break;
    case 7:
      if (packetValues[0] === packetValues[1]) {
        return 1;
      } else {
        return 0;
      }
      break;
    default:
      break;
  }

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
// console.log(getPacketVersionSum(puzzleArr, true));

console.assert(getPacketValue(convertInputToBinary('C200B40A82').split(''), true) === 3, 'test case 1');
console.assert(getPacketValue(convertInputToBinary('04005AC33890').split(''), true) === 54, 'test case 2');
console.assert(getPacketValue(convertInputToBinary('880086C3E88112').split(''), true) === 7, 'test case 3');
console.assert(getPacketValue(convertInputToBinary('CE00C43D881120').split(''), true) === 9, 'test case 4');
console.assert(getPacketValue(convertInputToBinary('D8005AC2A8F0').split(''), true) === 1, 'test case 5');
console.assert(getPacketValue(convertInputToBinary('F600BC2D8F').split(''), true) === 0, 'test case 6');
console.assert(getPacketValue(convertInputToBinary('F600BC2D8F').split(''), true) === 0, 'test case 7');
console.assert(getPacketValue(convertInputToBinary('9C0141080250320F1802104A08').split(''), true) === 1, 'test case 8');
console.log(getPacketValue(puzzleArr, true));