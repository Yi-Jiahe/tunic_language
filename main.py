import nltk

from mappings.mappings import characters


arpabet = nltk.corpus.cmudict.dict()


def to_phoneme(strInput):
    """
    Converts a space separated sentence of words to a list of list of phonemes

    :param strInput:
    Sentence to translate to phonemes
    :return:
    A list of lists of phonemes for each word in the sentence
    """
    ret = []

    nltk_tokens = nltk.word_tokenize(strInput)
    # print(nltk_tokens)

    for word in nltk_tokens:
        if word.isalpha():
            try:
                ret.append(arpabet[word.lower()][0])
            except KeyError:
                ret.append("-")
        else:
            ret.append(word)
    return ret


def to_runes(phonemes):
    """
    Converts a list of phonemes (a word) into a list of Tunic runes with a list of their associated readings

    :param phonemes:
    A list of phonemes from the CMUDict
    :return:
    A list of Tunic runes representing the word and a list of readings for each rune
    """
    ret = [[], []]

    has_vowel, has_consonant = False, False
    rune = set()
    rune_reading = []

    for phoneme in phonemes:
        segments = get_segments(phoneme)
        if is_vowel(phoneme):
            if has_vowel:
                ret[0].append(rune)
                ret[1].append(rune_reading)
                has_vowel, has_consonant = True, False
                rune = set() | segments
                rune_reading = [phoneme]
            else:
                has_vowel = True
                rune = rune | segments
                rune_reading.append(phoneme)
        else:
            if has_consonant:
                ret[0].append(rune)
                ret[1].append(rune_reading)
                has_vowel, has_consonant = False, True
                rune = set() | segments
                rune_reading = [phoneme]
            else:
                if has_vowel:
                    # If the rune already has a vowel it means that the vowel comes first and segment 12 is present
                    rune = rune | segments | {12}
                    # Furthermore it also means that the rune is complete and can be pushed
                    has_vowel, has_consonant = False, False
                    ret[0].append(rune)
                    ret[1].append(rune_reading[::-1])
                    rune = set()
                    rune_reading = []
                else:
                    has_consonant = True
                    rune = rune | segments
                    rune_reading.append(phoneme)
    if rune:
        ret[0].append(rune)
        ret[1].append(rune_reading)

    return ret


def get_segments(phoneme):
    """
    Returns a set of segments used to represent a phoneme

    :param phoneme:
    :return:
    A set of segments representing the phoneme
    """

    # Remove the stress markings from the characters because they are not represented by Tunic runes
    phoneme = ''.join(i for i in phoneme if not i.isdigit())
    return characters[phoneme]["segments"]


def is_vowel(phoneme):
    phoneme = ''.join(i for i in phoneme if not i.isdigit())
    return characters[phoneme]["type"] == "vowel"


if __name__ == '__main__':
    while True:
        str_input = input("Sentence to convert to Tunic script: ")
        sentence_as_phonemes = to_phoneme(str_input)
        # print(sentence_as_phonemes)
        output = [to_runes(x) if isinstance(x, list) else x for x in sentence_as_phonemes]

        print(output)
