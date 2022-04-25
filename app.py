import json

from flask import Flask, make_response, request
app = Flask(__name__)

from main import to_phoneme, to_runes


@app.after_request
def after_request(response):
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    else:
        response.headers.add("Access-Control-Allow-Origin", "*")

    return response


@app.route('/')
def hello_world():
    return 'Hello, Docker!'


@app.route('/to-runes', methods=['POST'])
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