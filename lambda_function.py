import logging
import json

from main import to_phoneme, to_runes


logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    str_input = event["input"]
    logger.info('Input sentence', str_input)

    sentence_as_phonemes = to_phoneme(str_input)
    logger.info('Phonemes', sentence_as_phonemes)

    output = [to_runes(x) if isinstance(x, list) else x for x in sentence_as_phonemes]
    logger.info('Output', output)

    return {
        'statusCode': 200,
        'body': json.dumps(output)
    }