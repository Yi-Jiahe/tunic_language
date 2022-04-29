import json
import logging

from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

import google.cloud.logging
client = google.cloud.logging.Client()
client.setup_logging()

from tunic_language import to_phoneme, to_runes


@app.route('/')
def hello_world():
    return 'Hello, Docker!'


@app.route('/to-runes', methods=['POST'])
def translate_to_runes():
    try:
        req_data = json.loads(request.data)
        str_input = req_data["input"]
        logging.info(str_input)
        sentence_as_phonemes = to_phoneme(str_input)
        runes = [to_runes(x) if isinstance(x, list) else x for x in sentence_as_phonemes]

        return {
            'statusCode': 200,
            'body': {
                'runes': json.dumps(runes, default=lambda x: list(x) if isinstance(x, set) else x),
            }
        }
    except Exception as e:
        logging.error(e)


if __name__ == "__main__":
    import os

    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
