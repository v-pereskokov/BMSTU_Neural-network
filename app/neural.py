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

    def training(self):
        self.__training__()

    def test(self, x1, x2, x3, x4):
        print(self.weights)
        net = self.__calculate_net__([x1, x2])
        return self.activate_function(net)

    def __training__(self):
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


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


def tesr_model(vars, AND, OR, NOT):
    return AND(vars[0], vars[1])


neural = BooleanNeural(2, Z2(2).truth_table(tesr_model), activate_function_hardly, 0.3, 100000)

print('Training...')
neural.training()
print('Done')

print('Test')
print(neural.test(1, 0, 1, 1))
