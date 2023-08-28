import re

testInput = '''pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)'''

with open('./2017/input/7.txt', encoding="utf-8") as f:
    inputString = f.read()

inputLineRegex = "(\w*)\s*\((\d*)\)(.*)"

class Node:
    def __init__(self, name, score, children):
        self.name = name
        self.score = score
        self.children = children

# function to sort nodes according to how many children they have to speed up constructing the tree
def nodeSortByChildren(node):
    return len(node.children)

def processLine(oneLineString):
    x = re.split(inputLineRegex, oneLineString)
    # print(x)
    base = x[1]
    score = int(x[2])
    predicate = x[3]
    children = re.findall("\w+", predicate)
    # print(children)
    return Node(base, score, children)

def processInput(multiLineString):
    byLines = multiLineString.split('\n')
    nodeList = list(map(processLine, byLines))
    # print(nodeList[0].children.__len__)
    nodeList.sort(key=nodeSortByChildren)
    return nodeList

# Part 1: identify the top node
# For this part, no need to make them into a tree, just find the one that's not a child
def getTopNode(nodeList):
    names = list(map(lambda n: n.name, nodeList))
    for oneNode in nodeList:
        for oneChild in oneNode.children:
            names.remove(oneChild)
    return names[0]

def testPart1():
    nodeList = processInput(testInput)
    topNode = getTopNode(nodeList)
    if topNode != "tknk":
        print("Test 1 failed")
        print(topNode)

def part1():
    nodeList = processInput(inputString)
    topNode = getTopNode(nodeList)
    print("Part 1: " + topNode)

testPart1()
part1()

# Part 2: Subtree weights must be balanced

# Couldn't find a JS-style find() function in py
def getNodeFromList(nodeList, nodeName):
    for oneNode in nodeList:
        if oneNode.name == nodeName:
            return oneNode

def getWeightOfSubtreeRecursive(nodeList, topNodeName):
    topNode = getNodeFromList(nodeList, topNodeName)
    total = topNode.score
    for oneNodeName in topNode.children:
        total += getWeightOfSubtreeRecursive(nodeList, oneNodeName)
    return total

def testGetWeight():
    nodeList = processInput(testInput)
    ugml = getWeightOfSubtreeRecursive(nodeList, "ugml")
    padx = getWeightOfSubtreeRecursive(nodeList, "padx")
    fwft = getWeightOfSubtreeRecursive(nodeList, "fwft")
    if ugml != 251:
        print("ugml is wrong")
    if padx != 243:
        print("padx is wrong")
    if fwft != 243:
        print("fwft is wrong")

# return true if all ints in the array are the same
def isListBalanced(numList):
    newArray = []
    for oneInt in numList:
        if oneInt not in newArray:
            newArray.append(oneInt)
    return len(newArray) == 1

def testIsListBalanced():
    if isListBalanced([1, 1, 2]):
        print("isListBalanced failed")
    if isListBalanced([1, 1, 1]) == False:
        print("isListBalanced failed")

def getUnbalanced(numList):
    for oneInt in numList:
        if numList.count(oneInt) == 1:
            return oneInt

def getBalancedScore(numList):
    for oneInt in numList:
        if numList.count(oneInt) > 1:
            return oneInt

def findUnbalanced(nodeList, parentNodeName):
    parentNode = getNodeFromList(nodeList, parentNodeName)
    if parentNode.children:
        # still don't have a handle on python map()
        weights = []
        for oneChild in parentNode.children:
            weights.append(getWeightOfSubtreeRecursive(nodeList, oneChild))
        if isListBalanced(weights) is False:
            # Create a map of item's current weight to its subtree's weight
            weightStack = []
            for oneOtherChild in parentNode.children:
                oneSubtreeWeight = getWeightOfSubtreeRecursive(nodeList, oneOtherChild)
                oneOtherChildNode = getNodeFromList(nodeList, oneOtherChild)
                subtreeMinusTop = oneSubtreeWeight - oneOtherChildNode.score
                weightStack.append([oneSubtreeWeight, oneOtherChildNode.score, subtreeMinusTop, oneOtherChild])

            balancedScore = getBalancedScore(weights)
            # find the weightStack element with a different subtree score
            for oneWeightStack in weightStack:
                if oneWeightStack[0] != balancedScore:
                    # Subtract the sub-stack without the top part from the balanced score to find out what the top should be to be balanced
                    # TODO this works for the test input but is wrong for part 2
                    print(balancedScore - oneWeightStack[2])

        for oneName in parentNode.children:
            findUnbalanced(nodeList, oneName)

def testPart2():
    nodeList = processInput(testInput)
    topNode = getTopNode(nodeList)
    print("Test part 2 should be 60: ")
    findUnbalanced(nodeList, topNode)

def part2():
    nodeList = processInput(inputString)
    topNode = getTopNode(nodeList)
    print("Part 2: ")
    findUnbalanced(nodeList, topNode)


testGetWeight()
testIsListBalanced()
testPart2()
part2()
# 64507 too high
# 38505 too high