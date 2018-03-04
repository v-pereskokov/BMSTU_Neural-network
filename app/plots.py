import matplotlib.pyplot as plt
from activate_functions import activate_function_hardly, activate_function_simple
from neural import BooleanNeural
from z2 import Z2


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


if __name__ == "__main__":
    truth_table_real = Z2(4).truth_table(model)

    neural_simple = BooleanNeural(4, truth_table_real, activate_function_simple, 0.3, 30000)
    neural_simple.training()

    neural = BooleanNeural(4, truth_table_real, activate_function_hardly, 0.3, 30000)
    neural.training()

    plt.plot([1, 2, 3, 4])
    plt.ylabel('some numbers')
    plt.show()
