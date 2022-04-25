import re

import mappings.mappings


def character_coverage_test():
    with open("./mappings/characters.txt") as f:
        prog = re.compile("([A-Z]+).*\((.*)\)")
        for line in f:
            result = prog.match(line)
            if result:
                # To-do: Implement test
                pass
