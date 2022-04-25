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
    Converts a list of phonemes (a word) into a list of Tunic runes

    :param phonemes:
    A list of phonemes from the CMUDict
    :return:
    A list of Tunic runes representing the word
    """
    ret = []

    has_vowel, has_consonant = False, False
    rune = set()

    for phoneme in phonemes:
        segments = get_segments(phoneme)
        if is_vowel(phoneme):
            if has_vowel:
                ret.append(rune)
                has_vowel, has_consonant = False, False
                rune = set() | segments
            else:
                has_vowel = True
                rune = rune | segments
        else:
            if has_consonant:
                ret.append(rune)
                has_vowel, has_consonant = False, False
                rune = set() | segments
            else:
                has_consonant = True
                rune = rune | segments
    ret.append(rune)

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
