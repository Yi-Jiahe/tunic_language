import re

characters = {}

with open("./mappings/cmudict.phones") as f:
    for line in f:
        symbol, type = line.split()
        characters[symbol] = {"type": type}

with open("./mappings/cmudict.characters") as f:
    prog = re.compile("([A-Z]+).*\((.*)\)")
    for line in f:
        result = prog.match(line)
        if result:
            symbol = result.group(1)
            segments = frozenset([int(x) for x in result.group(2).split()])
            # print(f"{symbol}: {segments}")
            characters[symbol]["segments"] = segments

# for character in characters.items():
#     print(character)
