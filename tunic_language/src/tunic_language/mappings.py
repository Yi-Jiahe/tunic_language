from importlib import resources
import re


characters = {}

# Create a dictionary of phones from the CMUDict
with resources.open_text("tunic_language", "cmudict.phones") as f:
    for line in f:

        symbol, type = line.split()
        characters[symbol] = {"type": type}


with resources.open_text("tunic_language", "cmudict.IPA") as f:
    prog = re.compile("([A-Z]+)\s*([A-Z]+)")
    for line in f:
        result = prog.match(line)
        if result:
            symbol, IPA = result.group(1), result.group(2)
            characters[symbol]["IPA"] = IPA

runes = {}

with resources.open_text("tunic_language", "IPA.runes") as f:
    prog = re.compile("([A-Z]+).*\((.*)\)")

    character_type = "vowel"
    for line in f:
        result = prog.match(line)

        if result:
            symbol = result.group(1)
            segments = frozenset([int(x) for x in filter(lambda x: x.isdigit(), result.group(2).split())])
            runes[symbol] = {
                "type": character_type,
                "segments": segments
            }
        elif line.startswith("# Consonants"):
            character_type = "consonant"


if __name__ == "__main__":
    print("CMUDict Phones")
    for character in characters.items():
        print(character)
    print()

    print("Tunic Runes")
    for rune in runes.items():
        print(rune)
