import matplotlib.pyplot as plt
from neural import BooleanNeural
from z2 import Z2


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


def get_training_plot():
    neural = BooleanNeural(Z2(4).truth_table(model), [1, 9, 15])
    result = neural.training()

    plt.plot([info["epoch"] for info in result["info"]], [info["error"] for info in result["info"]])
    plt.title("Training plot")
    plt.grid(True)
    plt.savefig("plots/plot.png")
    plt.show()


get_training_plot()
