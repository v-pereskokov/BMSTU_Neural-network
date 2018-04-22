from activate_functions import activate_function
from neural import BooleanNeural
from z2 import Z2


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


if __name__ == "__main__":
    neural = BooleanNeural(Z2(4).truth_table(model), [1, 9, 15])
    print(neural.training())
