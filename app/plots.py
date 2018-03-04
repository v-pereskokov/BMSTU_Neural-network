import matplotlib.pyplot as plt
from activate_functions import activate_function_hardly, activate_function_simple
from neural import BooleanNeural
from z2 import Z2


def test(neural_impl, vars):
    result = neural_impl.test(vars)
    y = result["out"]

    reality = result["reality"]
    except_result = 1 if y > 0.8 else 0

    return [except_result, y, reality]


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


if __name__ == "__main__":
    truth_table_real = Z2(4).truth_table(model)

    # neural_simple = BooleanNeural(4, truth_table_real, activate_function_simple, 0.3, 30000)
    # neural_simple.training()

    neural = BooleanNeural(4, truth_table_real, activate_function_hardly, 0.3, 850)
    info = neural.training(debug=True)

    truth_table = []
    for index in range(len(truth_table_real)):
        row = truth_table_real[index]
        out, _, _ = test(neural, row[0])
        truth_table.append([row[0], row[1], [out]])

    plt.plot(info["epoch"], info["error"], '.-')
    plt.ylabel('E(k)')
    plt.xlabel('Epoch')
    plt.show()
