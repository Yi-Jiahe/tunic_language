import json

from flask import Flask, request
app = Flask(__name__)

from main import to_phoneme, to_runes


@app.route('/')
def hello_world():
    return 'Hello, Docker!'


@app.route('/to_runes', methods=['POST'])
def translate_to_runes():
    print(request)
    str_input = request.form["input"]
    sentence_as_phonemes = to_phoneme(str_input)
    output = [to_runes(x) if isinstance(x, list) else x for x in sentence_as_phonemes]
    print(output)

    return {
        'statusCode': 200,
        'body': json.dumps(output, default=lambda x: list(x) if isinstance(x, set) else x)
    }