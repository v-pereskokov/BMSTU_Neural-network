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

    # neural_simple = BooleanNeural(4, truth_table_real, activate_function_simple, 0.3, 25)
    # info_simple = neural_simple.training(debug=True)

    neural = BooleanNeural(4, truth_table_real, activate_function_hardly, 0.3, 850)
    info = neural.training(debug=True)

    # plt.plot(info_simple["epoch"], info_simple["error"], 'o-')
    # plt.ylabel('E(k)')
    # plt.xlabel('Epoch')
    # plt.title('E(k)[Epoch]')
    # plt.show()

    plt.plot(info["epoch"], info["error"], '.-')
    plt.ylabel('E(k)')
    plt.xlabel('Epoch')
    plt.title('E(k)[Epoch]')
    plt.show()
