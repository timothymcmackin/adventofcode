testString = '''b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10'''

with open('./2017/input/8.txt', encoding="utf-8") as f:
    inputString = f.read()

def processLine(oneLineStr):
    splitUp = oneLineStr.split(' ')
    lineArray = []
    for oneSegment in splitUp:
        try:
            lineArray.append(int(oneSegment))
        except:
            lineArray.append(oneSegment)
    return lineArray

def processInput(inputStr):
    byLines = inputStr.split('\n')
    return list(map(processLine, byLines))

def getBiggestRegisterPart1(instructions):
    registers = {}
    while len(instructions) > 0:
        line = instructions.pop(0)

        # operation:
        a = line[0] # starting register
        b = line[2] # amount to change the value by
        operand = line[1] # operand for the operation, such as 'inc' for increase
        # get the values for the operation, referencing and initializing registers if necessary
        # registers start at 0
        if a not in registers:
            registers[a] = 0
        if type(b) is not int:
            if b in registers:
                b = registers[b]
            else:
                registers[b] = 0
                b = 0

        # run the operation only if this condition is met
        condA = line[4]
        condB = line[6]
        ifCompare = line[5]

        # get the values for the conditions, referencing registers if necessary
        if type(condA) is not int:
            if condA not in registers:
                registers[condA] = 0
            condA = registers[condA]
        if type(condB) is not int:
            if condB not in registers:
                registers[condB] = 0
            condB = registers[condB]

        runCondition = False

        # match requires python 3.10 and I'm on 3.8

        if ifCompare == ">":
            runCondition = condA > condB
        elif ifCompare == "<":
            runCondition = condA < condB
        elif ifCompare == "==":
            runCondition = condA == condB
        elif ifCompare == ">=":
            runCondition = condA >= condB
        elif ifCompare == "<=":
            runCondition = condA <= condB
        elif ifCompare == "!=":
            runCondition = condA != condB
        else:
            print("Did not recognize comparison: " + ifCompare)

        # run the operation
        if runCondition:
            if operand == "inc":
                registers[a] += b
            elif operand == "dec":
                registers[a] -= b

    # end of while loop
    largestRegister = None
    for oneVal in registers.values():
        if largestRegister is None or oneVal > largestRegister:
            largestRegister = oneVal

    return largestRegister


testInput = processInput(testString)
input = processInput(inputString)
# print(testInput)
print("Test part 1 should be 1: " + str(getBiggestRegisterPart1(testInput)))
print("Part 1: " + str(getBiggestRegisterPart1(input)))