const iterate = (recipesStart, elf1Start, elf2Start, numRecipesbeforeScore) => {
  let elf1 = elf1Start;
  let elf2 = elf2Start;
  let recipes = JSON.parse(JSON.stringify(recipesStart));

  for (let i = 0; i < numRecipesbeforeScore + 10; i++) {
    // New recipes are the sum of the current recipes broken into digits
    const newRecipes = (recipes[elf1] + recipes[elf2]).toString().split('').map(Number);
    recipes.push(...newRecipes);

    elf1 = getNextElfIndex(recipes, elf1);
    elf2 = getNextElfIndex(recipes, elf2);
  }
  
  // return 10 recipes after initial run
 return Number(recipes.slice(numRecipesbeforeScore, numRecipesbeforeScore + 10).join(''));
  
}

const iteratePart2 = (recipesStart, elf1Start, elf2Start, targetScore) => {
  let elf1 = elf1Start;
  let elf2 = elf2Start;
  let recipes = JSON.parse(JSON.stringify(recipesStart));

  const targetLength = targetScore.length;
  const runningLast = [...recipesStart];

  let keepGoing = true;
  let i = 0;
  let tempNumber;
  while (keepGoing && i < 10000000000) {
    i++;
    // New recipes are the sum of the current recipes broken into digits
    const newRecipes = (recipes[elf1] + recipes[elf2]).toString().split('').map(Number);
    while (newRecipes.length > 0) {
      tempNumber = newRecipes.shift();
      recipes.push(tempNumber);
      runningLast.push(tempNumber);
      if (runningLast.length > targetLength) {
        runningLast.shift();
      }
      if (runningLast.join('') === targetScore) {
        return recipes.length - targetLength;
      }
    }

    elf1 = getNextElfIndex(recipes, elf1);
    elf2 = getNextElfIndex(recipes, elf2);
    // if (i % 1000 === 0) {
    //   console.log(i)
    // }
  }
  
}

// Check if the digits at the end of the recipes match the target score
const doRecipesMatch = (passedRecipes, passedTargetScore) => {
  const recipes = [...passedRecipes];
  const targetScore = passedTargetScore.toString().split('').map(Number);
  const targetLength = targetScore.length;
  if (targetLength > recipes.length) {
    return false;
  }
  for (let i = 0; i < targetLength; i++) {
    if (targetScore.pop() !== recipes.pop()) {
      return false;
    }
  }
  return true;
};
// const recipeMatchTestCase = [
//   '123456789'.split('').map(Number), 
//   '56789',
// ];
// if (!doRecipesMatch(recipeMatchTestCase[0], recipeMatchTestCase[1])) {
//   console.log('recipe match test case failed.')
// }

// New elf current recipes are 1 + current recipe score, with wraparound
const getNextElfIndex = (recipes, elfIndex) => {
  let newIndex = 1 + recipes[elfIndex] + elfIndex;
  // if (newIndex >= recipes.length) {
  //   console.log('wrap');
  // }
  while (newIndex >= recipes.length) {
    newIndex -= recipes.length;
  }
  return newIndex;
};

// const testsPart1 = [
//   [9, 5158916779],
//   [5, 0124515891],
//   [18, 9251071085],
//   [2018, 5941429882],
// ];

// testsPart1.forEach((oneTest) => {
//   const result = iterate([3, 7], 0, 1, oneTest[0]);
//   if (result !== oneTest[1]) {
//     console.log(oneTest, 'failed');
//   }
// });

const testsPart2 = [
  ['51589', 9],
  ['01245', 5],
  ['92510', 18],
  ['59414', 2018],
];

for (let i = 0; i < testsPart2.length; i++) {
  const thisTest = testsPart2[i];
  const result = iteratePart2([3, 7], 0, 1, thisTest[0]);
  if (result !== thisTest[1]) {
    console.log(thisTest, 'failed, got', result);
  } else {
    console.log('test ok');
  }
  
}

// part 1
// console.log(iterate([3, 7], 0, 1, 286051));

// part 2
console.log(iteratePart2([3, 7], 0, 1, '286051'));
