import matplotlib.pyplot as plt
import numpy as np
from neural import BooleanNeural
from z2 import Z2


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


def get_training_plot():
    x_vector = np.arange(0, 1, 1 / 16)
    neural = BooleanNeural(Z2(4).truth_table(model), [1, 9, 15])
    neural.training()

    neural = BooleanNeural(0, 1)
    neural.training()
    result = neural.test()["training_data"]

    plt.plot(x_vector, result)
    plt.title("Training plot")
    plt.grid(True)
    plt.savefig("plots/training.png")
    plt.show()
