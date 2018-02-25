from flask import Flask, request

app = Flask(__name__)


@app.route('/magic', methods=['POST'])
def magic():
    return {
        'request data': request.data
    }


if __name__ == "__main__":
    app.run(port=3000)
