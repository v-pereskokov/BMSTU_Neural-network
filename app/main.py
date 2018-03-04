from flask import Flask, request, jsonify
import json
import os
from activate_functions import activate_function_hardly, activate_function_simple
from neural import BooleanNeural
from z2 import Z2

app = Flask(__name__)


def get_send_pack(truth_table_real, except_result, y_out, reality, vars, error):
    return {
        "result": except_result,
        "probability": y_out,
        "reality_result": reality,
        "vars": vars,
        "error": error,
        "reality_truth_table": truth_table_real
    }


def test(neural_impl, vars):
    result = neural_impl.test(vars)
    y = result["out"]

    reality = result["reality"]
    except_result = 1 if y > 0.8 else 0

    return [except_result, y, reality]


def calculate_error(truth_table):
    error = 0
    for row in truth_table:
        if row[1] != row[2]:
            error += 1

    return error


@app.route("/api/v1/lab_01/lazy_magic", methods=["POST"])
def magic_simple():
    data = json.loads(request.data)
    vars = data["vars"]

    truth_table = []
    for index in range(len(truth_table_real)):
        row = truth_table_real[index]
        out, _, _ = test(neural_simple, row[0])
        truth_table.append([row[0], row[1], [out]])

    except_result, y, reality = test(neural_simple, vars)
    return jsonify(get_send_pack(truth_table, except_result, y, reality, data["vars"], calculate_error(truth_table)))


@app.route("/api/v1/lab_01/real_magic", methods=["POST"])
def magic():
    data = json.loads(request.data)
    vars = data["vars"]

    truth_table = []
    for index in range(len(truth_table_real)):
        row = truth_table_real[index]
        out, _, _ = test(neural, row[0])
        truth_table.append([row[0], row[1], [out]])

    except_result, y, reality = test(neural, vars)
    return jsonify(get_send_pack(truth_table, except_result, y, reality, data["vars"], calculate_error(truth_table)))


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


if __name__ == "__main__":
    truth_table_real = Z2(4).truth_table(model)

    neural_simple = BooleanNeural(4, truth_table_real, activate_function_simple, 0.3, 5000)
    neural_simple.training()

    neural = BooleanNeural(4, truth_table_real, activate_function_hardly, 0.3, 5000)
    neural.training()

    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
