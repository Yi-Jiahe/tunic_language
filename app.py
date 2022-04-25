import json

from flask import Flask, make_response, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

from main import to_phoneme, to_runes


@app.route('/')
def hello_world():
    return 'Hello, Docker!'


@app.route('/to-runes', methods=['POST'])
def translate_to_runes():
    req_data = json.loads(request.data)
    str_input = req_data["input"]
    sentence_as_phonemes = to_phoneme(str_input)
    runes, rune_readings = [to_runes(x) if isinstance(x, list) else x for x in sentence_as_phonemes]

    return {
        'statusCode': 200,
        'body': {
            'runes': json.dumps(runes, default=lambda x: list(x) if isinstance(x, set) else x),
            'rune_readings': json.dumps(rune_readings),
        }
    }
