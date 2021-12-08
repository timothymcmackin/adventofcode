const { puzzleInput } = require('./inputs/input8');

// The image you received is 25 pixels wide and 6 pixels tall.
const pixelsPerLayer = 25 * 6;

// find the layer that contains the fewest 0 digits.
const findLayerWithFewestZeroes = (input, layerLength) => {
  var currentLayer;
  var place = 0;
  var layerWithFewestZeroes;
  var numberOfZeroes = 999999;
  while(place < input.length) {
    currentLayer = input.substring(place, place + layerLength);
    const zeroesInThisLayer = countChars(currentLayer, '0');
    if (zeroesInThisLayer < numberOfZeroes) {
      layerWithFewestZeroes = currentLayer;
      numberOfZeroes = zeroesInThisLayer;
    }
    place += layerLength;
  }
  return {
    layer: layerWithFewestZeroes,
    numberOfZeroes,
    onesTimesTwos: get1sTimes2s(layerWithFewestZeroes),
  };
}

// On that layer, what is the number of 1 digits multiplied by the number of 2 digits?
const get1sTimes2s = (input) => {
  const ones = countChars(input, '1');
  const twos = countChars(input, '2');
  return ones * twos;
}

const countChars = (input, char) => input && input.length > 0 ? input.split(char).length - 1 : null;

// Part 2: get the image by getting the top pixel of each layer
// 0 is black, 1 is white, and 2 is transparent

const getResultingImage = (input, layerHeight, layerWidth) => {
  const layerLength = layerHeight * layerWidth;
  var layerCounter = 0;
  var inputByLayers = [];
  while(layerCounter < input.length) {
    inputByLayers.push(input.substring(layerCounter, layerCounter + layerLength));
    layerCounter += layerLength;
  }

  // Get the visible pixels
  var visibleLayerCharacters = [];
  for (let i = 0; i < layerLength; i++) {
    var visiblePixel = '2';
    var currentLayerIndex = 0;
    while(visiblePixel === '2') {
      // If the pixel is transparent, go down a layer
      visiblePixel = inputByLayers[currentLayerIndex][i];
      currentLayerIndex++;
    }
    visibleLayerCharacters.push(visiblePixel);
  }
  const visibleLayer = visibleLayerCharacters.join('');

  // Assemble the visible pixels into a picture
  var outputRowCounter = 0;
  var outputByLines = [];
  while(outputRowCounter < visibleLayer.length) {
    outputByLines.push(visibleLayer.substring(outputRowCounter, outputRowCounter + layerWidth));
    outputRowCounter += layerWidth;
  }
  return outputByLines.join('\n');
}


console.assert(findLayerWithFewestZeroes('123456789012', 6).onesTimesTwos === 1, 'test case failed');
console.assert(countChars('aaabbbaaabbbaaababababa', 'a') === 13, 'countChars failed');
console.assert(get1sTimes2s('1112222') === 12, 'get1sTimes2s failed');
// console.log(findLayerWithFewestZeroes(puzzleInput, 25 * 6));
const testCase = '0222112222120000';
console.assert(getResultingImage(testCase, 2, 2) === '01\n10', 'test case failed');
console.log(getResultingImage(puzzleInput, 6, 25))
/*
0110000110111101000011100
1001000010000101000010010
1000000010001001000010010
1000000010010001000011100
1001010010100001000010000
0110001100111101111010000
*/
// CJZLP