testCases = [
  ['{}', 1, '{}'],
  ['{{{}}}', 6, '{{{}}}'],
  ['{{},{}}', 5, '{{}{}}'],
  ['{{{},{},{{}}}}', 16, '{{{}{}{{}}}}'],
  ['{<a>,<a>,<a>,<a>}', 1, '{}'],
  ['{{<ab>},{<ab>},{<ab>},{<ab>}}', 9, '{{}{}{}{}}'],
  ['{{<!!>},{<!!>},{<!!>},{<!!>}}', 9, '{{}{}{}{}}'],
  ['{{<a!>},{<a!>},{<a!>},{<ab>}}', 3, '{{}}'],
]

with open('./2017/input/9.txt', encoding="utf-8") as f:
    inputString = f.read()

def removeGarbage(str):
    chars = list(str)
    result = ''
    inGarbage = False
    # Garbage sections start with < and end with >
    while len(chars) > 0:
        char = chars.pop(0)
        if inGarbage:
            if char == '>':
                inGarbage = False
            elif char == '!':
                # ! escapes the next character
                chars.pop(0)
        else:
            if char == '<':
                inGarbage = True
            elif char != ',':
                # Commas are superfluous
                result += char

    return result

def testRemoveGarbage():
    for testCase in testCases:
        if removeGarbage(testCase[0]) != testCase[2]:
            print("removeGarbage test case failed: " + testCase[0])
testRemoveGarbage()

# Your goal is to find the total score for all groups in your input. Each group is assigned a score which is one more than the score of the group that immediately contains it. (The outermost group gets a score of 1.)
def countScore(str):
    level = 0
    score = 0
    processedString = list(removeGarbage(str))
    while len(processedString) > 0:
        char = processedString.pop(0)
        if char == '}':
            score += level
            level -= 1
        elif char == '{':
            level += 1
    return score

def testCountScore():
    for testCase in testCases:
        processedString = removeGarbage(testCase[0])
        if countScore(processedString) != testCase[1]:
            print("testCountScore test case failed: " + testCase[0] + ' came out as ' + str(countScore(processedString)))
testCountScore()

# print("Part 1: " + str(countScore(inputString)))

# count all of the characters within the garbage. The leading and trailing < and > don't count, nor do any canceled characters or the ! doing the canceling.
def countGarbage(str):
    chars = list(str)
    count = 0
    inGarbage = False
    # Garbage sections start with < and end with >
    while len(chars) > 0:
        char = chars.pop(0)
        if inGarbage:
            if char == '>':
                inGarbage = False
            elif char == '!':
                # ! escapes the next character
                chars.pop(0)
            else:
                count += 1
        else:
            if char == '<':
                inGarbage = True

    return count

print("Part 2: " + str(countGarbage(inputString)))