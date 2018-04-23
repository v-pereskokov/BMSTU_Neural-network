from math import *
import random as rnd


class Perceptron:
    norma = 0
    number_of_inputs = 0
    weights = []

    def __init__(self, number_of_inputs, norma):
        self.number_of_inputs = number_of_inputs
        self.norma = norma

        for i in range(number_of_inputs):
            self.weights.append(float('{:.3f}'.format(rnd.uniform(0, 100) * 0.01)))

        print("weights: ", self.weights)

    def net(self, x_vector):
        net = 0
        for i in range(self.number_of_inputs):
            net += self.weights[i] * x_vector[i]

        return net

    def out(self, net):
        return (1 - exp(-net)) / (1 + exp(-net))

    def delta(self, out, layer):
        return 0.5 * (1 - out ** 2) * layer

    def weights_update(self, x_vector, delta):
        for i in range(self.number_of_inputs):
            self.weights[i] += self.norma * delta * x_vector[i]

    def get_weight(self, index):
        return self.weights[index]


class Neural:
    pass


Perceptron(2, 1)
