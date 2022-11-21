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

// New elf current recipes are 1 + current recipe score, with wraparound
const getNextElfIndex = (recipes, elfIndex) => {
  let newIndex = 1 + recipes[elfIndex] + elfIndex;
  while (newIndex >= recipes.length) {
    newIndex -= recipes.length;
  }
  return newIndex;
};

const tests = [
  [9, 5158916779],
  [5, 0124515891],
  [18, 9251071085],
  [2018, 5941429882],
];

tests.forEach((oneTest) => {
  const result = iterate([3, 7], 0, 1, oneTest[0]);
  if (result !== oneTest[1]) {
    console.log(oneTest, 'failed');
  }
})

console.log(iterate([3, 7], 0, 1, 286051));
