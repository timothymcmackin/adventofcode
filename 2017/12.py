testString = '''0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5'''

with open('./2017/input/12.txt', encoding="utf-8") as f:
    inputString = f.read()

def processLine(str):
    components = str.split()
    a = int(components[0])
    connectionsString = str.split('<->')[1]
    connections = list(map(int, connectionsString.split(',')))
    return [a, connections]

def processInput(str):
    byLines = str.split('\n')
    return list(map(processLine, byLines))

def findConnectionsToZero(l):
    allConnections = [0]
    keepGoing = True
    while keepGoing:
        keepGoing = False
        # find all connections from existing connections
        for oneLine in l:
            if oneLine[0] in allConnections:
                for oneNum in oneLine[1]:
                    if oneNum not in allConnections:
                        keepGoing = True
                        allConnections.append(oneNum)
    return len(allConnections)

def getNumberOfGroups(l):
    groups = []

    # Get a list of all numbers
    allNumbers = []
    for oneLine in l:
        if oneLine[0] not in allNumbers:
            allNumbers.append(oneLine[0])
        for oneNum in oneLine[1]:
            if oneNum not in allNumbers:
                allNumbers.append(oneNum)
    allNumbers.sort()

    while len(allNumbers) > 0:
        # get a number's group
        oneGroup = [allNumbers.pop(0)]
        keepGoing = True
        while keepGoing:
            keepGoing = False
            # find all connections from existing connections
            for oneLine in l:
                if oneLine[0] in oneGroup:
                    for oneNum in oneLine[1]:
                        if oneNum not in oneGroup:
                            keepGoing = True
                            oneGroup.append(oneNum)
                            allNumbers.remove(oneNum)
        groups.append(oneGroup)

    return len(groups)

testInput = processInput(testString)
input = processInput(inputString)
print('Part 1 test should be 6: ', str(findConnectionsToZero(testInput)))
print('Part 1: ', str(findConnectionsToZero(input)))
print('Part 2 test should be 2: ', str(getNumberOfGroups(testInput)))
print('Part 2: ', str(getNumberOfGroups(input)))

