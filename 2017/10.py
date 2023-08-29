# Complicated wraparound function described in prompt
# To handle wraparounds, move elements from the beginning to the end of the list so the wraparound doesn't reach the end
# Then put the elements back at the front
def swapList(l, passedPos, length):
    pos = passedPos
    elementsWrapped = 0
    if pos + length > len(l):
        elementsWrapped = abs(len(l) - pos - length)
        pos -= elementsWrapped
        for i in range(elementsWrapped):
            # remove elements from the front
            temp = l.pop(0)
            # add to the back
            l.append(temp)

    # swap the number of elements in the length
    tempList = []
    for i in range(length):
        elementToPop = min(pos, len(l) - 1)
        tempList.append(l.pop(elementToPop))
    for i in range(length):
        l.insert(pos, tempList.pop(0))

    # If we wrapped elements, reverse them back
    for i in range(elementsWrapped):
        temp = l.pop()
        l.insert(0, temp)

    return l

def getListScore(listMax, lengths):
    l = []
    pos = 0
    skipSize = 0

    # Initialize list
    for number in range(listMax + 1):
        l.append(number)

    # print(l)
    for length in lengths:
        l = swapList(l, pos, length)
        pos += length + skipSize
        if pos > len(l):
            pos -= len(l)
        skipSize += 1
        print(l)

    return l[0] * l[1]

test1 = getListScore(4, [3, 4, 1, 5])
if test1 != 12:
    print("test 1 failed")

input = [147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70]
print("Part 1: " + str(getListScore(255, input)))
