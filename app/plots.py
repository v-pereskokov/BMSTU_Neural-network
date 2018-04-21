import matplotlib.pyplot as plt
import numpy as np

from neural import GraphNeural

correct_func = lambda x: np.sin(0.1 * (x ** 3) - 0.2 * (x ** 2) + x - 1)


def get_correct_plot():
    x_vector = np.arange(0, 1, 0.05)
    y_vector = correct_func(x_vector)
    plt.plot(x_vector, y_vector)

    plt.title("Correct plot")
    plt.grid(True)
    plt.savefig("plots/correct.png")
    plt.show()


def get_training_plot():
    x_vector = np.arange(0, 1, 1 / 16)

    neural = GraphNeural(0, 1)
    neural.training()
    result = neural.test()["training_data"]

    plt.plot(x_vector, result)
    plt.title("Training plot")
    plt.grid(True)
    plt.savefig("plots/training.png")
    plt.show()


def get_error_epoch_plot():
    neural = GraphNeural(0, 1)
    training_result = neural.training()

    plt.plot(np.arange(0, training_result["steps"], 1), training_result["errors"])
    plt.title("Error(epoch)")
    plt.grid(True)
    plt.savefig("plots/error.png")
    plt.show()


# get_correct_plot()
# get_training_plot()
get_error_epoch_plot()
