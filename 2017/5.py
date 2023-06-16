testCode = '''0
3
0
1
-3'''

with open('./input/5.txt', encoding="utf-8") as f:
    inputString = f.read()

def processLine(oneLineString):
    return int(oneLineString)

def processInput(multiLineString):
    byLines = multiLineString.split('\n')
    return list(map(processLine, byLines))

# In addition, these instructions are a little strange; after each jump, the offset of that instruction increases by 1. So, if you come across an offset of 3, you would move three instructions forward, but change it to a 4 for the next time it is encountered.

def getEscapePart1(inputList):
    index = 0
    steps = 0
    while index < len(inputList):
        steps += 1
        inputList[index] += 1
        index += inputList[index] - 1
    return steps

if getEscapePart1(processInput(testCode)) != 5:
    print('Test case part 1 failed; got ' + str(getEscapePart1(processInput(testCode))))

print('Part 1: ' + str(getEscapePart1(processInput(inputString))))

# Now, the jumps are even stranger: after each jump, if the offset was three or more, instead decrease it by 1. Otherwise, increase it by 1 as before.

def getEscapePart2(inputList):
    index = 0
    steps = 0
    while index < len(inputList):
        steps += 1
        offset = inputList[index]
        if offset >= 3:
          inputList[index] -= 1
        else:
          inputList[index] += 1
        index += offset
    return steps

if getEscapePart2(processInput(testCode)) != 10:
    print('Test case part 1 failed; got ' + str(getEscapePart2(processInput(testCode))))

print('Part 2: ' + str(getEscapePart2(processInput(inputString))))