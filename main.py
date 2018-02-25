from flask import Flask, request
import json

app = Flask(__name__)


@app.route('/magic', methods=['POST'])
def magic():
    return json.dumps({
        "hello": "test"
    })


if __name__ == "__main__":
    app.run(port=3000)
