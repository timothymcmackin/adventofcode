const fs = require('fs');
const path = require('path');

const testInputString = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const inputString = fs.readFileSync(path.resolve(__dirname, './input/5.txt'), 'utf8');

const checkBook = (passedBook, requirements) => {
  const includedPages = [];
  const book = JSON.parse(JSON.stringify(passedBook));
  while (book.length > 0) {
    const currentPage = book.shift();
    const currentPageRequirements = requirements[currentPage] || [];
    for (let i = 0; i < currentPageRequirements.length; i++) {
      // If the page is in the book, it must be before the page that requires it
      // If it's not in the book, you're OK
      if (passedBook.includes(currentPageRequirements[i]) && !includedPages.includes(currentPageRequirements[i])) {
        return false;
      }
    }
    includedPages.push(currentPage);
  }
  return true;
}

const getBookScore = (passedBook) => {
  // This assumes an odd number of pages
  const book = JSON.parse(JSON.stringify(passedBook));
  while (book.length > 1) {
    book.shift();
    book.pop();
  }
  return book[0];
}

const partOne = (inputString) => {
  // Numbers with the pages that must come before them
  let requirements = {};
  let currentLine = '*';
  let lines = inputString.split('\n');

  while (currentLine !== '') {
    currentLine = lines.shift();
    if (currentLine === '') {
      break;
    }
    let [a, b] = currentLine.split('|').map((s) => parseInt(s));
    if (!requirements[b]) {
      requirements[b] = [];
    }
    if (!requirements[b].includes(a)) {
      requirements[b].push(a);
    }
  }

  const books = lines.map((oneLine) => oneLine.split(',').map((s) => parseInt(s)));
  const booksThatPass = books.filter((oneBook) => checkBook(oneBook, requirements));
  return booksThatPass.reduce((total, oneBook) => total + getBookScore(oneBook), 0);
}

const part1TestScore = partOne(testInputString);
if (part1TestScore != 143) {
  console.log('Part 1 test failed, got ', part1TestScore);
} else {
  console.log('Part 1:', partOne(inputString));
}