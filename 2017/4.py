testCases = [
    ['aa', 'bb', 'cc', 'dd', 'ee'],
    ['aa', 'bb', 'cc', 'dd', 'aa'],
    ['aa', 'bb', 'cc', 'dd', 'aaa'],
]
testCaseResults = [True, False, True]

with open('./input/4.txt', encoding="utf-8") as f:
    inputString = f.read()

# Seems to work
# def isPasswordValidPart1(password):
#     deduped = list(dict.fromkeys(password))
#     return len(password) == len(deduped)

def isPasswordValidPart1(passedPassword):
    password = []
    for oneCode in passedPassword:
        password.append(oneCode)
    while len(password) > 1:
        oneCode = password.pop()
        if oneCode in password:
            # print(str(passedPassword))
            # print('Two instances of ' + oneCode)
            return False
    # print('Valid: ' + str(passedPassword))
    return True

for index, pwd in enumerate(testCases):
    if isPasswordValidPart1(pwd) != testCaseResults[index]:
        print('Test case ', + str(pwd) + 'failed.')

def processLine(oneLineString):
    return list(oneLineString.split())

def processInput(multiLineString):
    byLines = multiLineString.split('\n')
    return list(map(processLine, byLines))

# To ensure security, a valid passphrase must contain no duplicate words.
# How many passphrases are valid?

def getValidPasswordCountPart1(passwordLists):
    valid = 0
    for oneList in passwordLists:
        if isPasswordValidPart1(oneList):
            valid += 1
    return valid

print('Part 1: ' + str(getValidPasswordCountPart1(processInput(inputString))))
# 325

# Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

testCaseStringsPart2 = [
    ['abcde' 'fghij'],
    ['abcde' 'xyz' 'ecdab'],
    ['a' 'ab' 'abc' 'abd' 'abf' 'abj'],
    ['iiii' 'oiii' 'ooii' 'oooi' 'oooo'],
    ['oiii' 'ioii' 'iioi' 'iiio'],
]
testCasePart2Results = [True, False, True, True, False]

def isPasswordValidPart2(passedPassword):
    # Just sort everything and check for duplicates again
    password = []
    for oneCode in passedPassword:
        oneCodeList = list(oneCode)
        oneCodeList.sort()
        # print(str(oneCodeList))
        password.append(str(oneCodeList))
    return isPasswordValidPart1(password)

def getValidPasswordCountPart2(passwordLists):
    valid = 0
    for oneList in passwordLists:
        if isPasswordValidPart2(oneList):
            valid += 1
    return valid

def getValidPasswordCountPart2(passwordLists):
    valid = 0
    for oneList in passwordLists:
        if isPasswordValidPart2(oneList):
            valid += 1
    return valid

print('Part 2: ' + str(getValidPasswordCountPart2(processInput(inputString))))