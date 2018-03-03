from activate_functions import activate_function_hardly, activate_function_simple

from z2 import Z2


class BooleanNeural:
    vars = 2
    truth_table = None
    activate_function = None
    training_nu = None
    epoch_number = None
    weights = []

    def __init__(self, vars, truth_table, activate_function, training_nu=1.0, epoch_number=100):
        self.truth_table = truth_table
        self.activate_function = activate_function
        self.training_nu = training_nu
        self.epoch_number = epoch_number
        self.weights = [0] * (vars + 1)

    def test(self, vars):
        return self.activate_function(self.__calculate_net__(vars))

    def training(self):
        for epoch in range(self.epoch_number):
            for i in range(len(self.truth_table)):
                row = self.truth_table[i]
                data = row[0]

                net = self.__calculate_net__(data)
                out = self.activate_function(net)

                error = row[1][0] - out

                self.__update_weights__(data, out, error)

    def __calculate_net__(self, data):
        net = 0
        for j in range(len(data)):
            net = net + data[j] * self.weights[j]

        return net + self.weights[len(data)]

    def __update_weights__(self, data, out, error):
        for index_weight in range(len(self.weights)):
            self.weights[index_weight] = self.weights[index_weight] + self.training_nu * error * out * (
                    1 - out) * (data[index_weight] if index_weight != len(data) else 1)
