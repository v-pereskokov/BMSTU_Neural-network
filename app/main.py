from flask import Flask, request, jsonify
import json
from activate_functions import activate_function_hardly, activate_function_simple
from neural import BooleanNeural
from z2 import Z2

app = Flask(__name__)


@app.route("/magic", methods=["POST"])
def magic():
    data = json.loads(request.data)

    return jsonify({
        "result": 1 if neural.test(data["vars"]) > 0.8 else 0
    })


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


if __name__ == "__main__":
    neural = BooleanNeural(4, Z2(4).truth_table(model), activate_function_hardly, 0.3, 100000)
    neural.training()

    app.run(port=3001)
