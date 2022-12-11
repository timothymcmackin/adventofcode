const testInputString = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

const inputString = `Monkey 0:
Starting items: 63, 84, 80, 83, 84, 53, 88, 72
Operation: new = old * 11
Test: divisible by 13
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 1:
Starting items: 67, 56, 92, 88, 84
Operation: new = old + 4
Test: divisible by 11
  If true: throw to monkey 5
  If false: throw to monkey 3

Monkey 2:
Starting items: 52
Operation: new = old * old
Test: divisible by 2
  If true: throw to monkey 3
  If false: throw to monkey 1

Monkey 3:
Starting items: 59, 53, 60, 92, 69, 72
Operation: new = old + 2
Test: divisible by 5
  If true: throw to monkey 5
  If false: throw to monkey 6

Monkey 4:
Starting items: 61, 52, 55, 61
Operation: new = old + 3
Test: divisible by 7
  If true: throw to monkey 7
  If false: throw to monkey 2

Monkey 5:
Starting items: 79, 53
Operation: new = old + 1
Test: divisible by 3
  If true: throw to monkey 0
  If false: throw to monkey 6

Monkey 6:
Starting items: 59, 86, 67, 95, 92, 77, 91
Operation: new = old + 5
Test: divisible by 19
  If true: throw to monkey 4
  If false: throw to monkey 0

Monkey 7:
Starting items: 58, 83, 89
Operation: new = old * 19
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 1`;

const oneMonkeyRegex = /^Monkey \d+:\n\s*Starting items: .*\n\s*Operation: .*\n\s*Test: .*\n\s*If true: .*\n\s*If false: .*/gm;
const startingItemsRegex = /Starting items: (.*)\n/;
const operationRegex = /Operation: new = old ([\+*]) (.*)\n/;
const testRegex = /Test: divisible by (\d+)\n/;
const ifTrueRegex = /If true: throw to monkey (\d+)\n/;
const ifFalseRegex = /If false: throw to monkey (\d+)/;

const getMonkeys = (str) => {
  let monkeyStrings = [];
  let oneMonkeyString;
  // Split the string into one string for each monkey
  while(null != (oneMonkeyString = oneMonkeyRegex.exec(str))) {
    monkeyStrings.push(oneMonkeyString[0]);
  }

  // Use regexes to get the info about each monkey from the strings
  let monkeys = monkeyStrings.map((oneStr) => {
    const startingItemsStr = startingItemsRegex.exec(oneStr)[1];
    const startingItems = startingItemsStr.split(',').map(Number);
    const operationResult = operationRegex.exec(oneStr);
    const operationSymbol = operationResult[1];
    const operationValue = operationResult[2];
    let operation;
    let value;
    if (operationValue === 'old' && operationSymbol === '*') {
      operation = 'square';
    } else {
      operation = operationSymbol;
      value = Number(operationValue);
    }



    const testStr = testRegex.exec(oneStr)[1];
    const test = Number(testStr);
    const ifTrueStr = ifTrueRegex.exec(oneStr)[1];
    const ifTrue = Number(ifTrueStr);
    const ifFalseStr = ifFalseRegex.exec(oneStr)[1];
    const ifFalse = Number(ifFalseStr);

    return {
      startingItems,
      test,
      operation,
      value,
      ifTrue,
      ifFalse,
    }
  });
  return monkeys;
};

const testMonkeys = getMonkeys(testInputString);
const inputMonkeys = getMonkeys(inputString);
console.log('test monkeys: ', testMonkeys.length)
console.log('input monkeys:', inputMonkeys.length);