from flask import Flask, request

app = Flask(__name__)


@app.route('/example/', methods=['GET', 'POST'])
def example():
    return {
        'request data': request.data
    }


if __name__ == "__main__":
    app.run()
