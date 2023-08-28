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

with open('./input/7.txt', encoding="utf-8") as f:
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
