from activate_functions import activate_function_hardly, activate_function_simple
from neural import BooleanNeural
from z2 import Z2


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


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


if __name__ == "__main__":
    truth_table_real = Z2(4).truth_table(model)

    neural_simple = BooleanNeural(4, truth_table_real, activate_function_simple, 0.3, 35)
    neural_simple.training(simple=True)

    neural = BooleanNeural(4, truth_table_real, activate_function_hardly, 0.3, 10000)
    neural.training()
