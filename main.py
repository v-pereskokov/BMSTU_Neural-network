from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/magic', methods=['POST'])
def magic():
    return jsonify({
        "hello": "test"
    })


if __name__ == "__main__":
    app.run(port=3000)
