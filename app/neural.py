from activate_functions import activate_function_hardly, activate_function_simple

x = [[0, 0], [0, 1], [1, 0], [1, 1]]
y = [0, 0, 0, 1]

train_data_x = x[1:4]
# print(train_data_x)
train_answers = y[1:4]


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
        pass

    def __training__(self):
        for epoch in range(self.epoch_number):
            for i in range(3):
                net = 0
                data = self.truth_table[i][0]
                for j in range(len(data)):
                    net = net + data[j] * self.weights[j]
                net = net + self.weights[len(data)]
                out = self.activate_function(net)

                # TODO: check error
                self.w1 = self.w1 + self.training_nu * (train_answers[i] - out) * out * (1 - out) * \
                          train_data_x[i][0]
                self.w2 = self.w2 + self.training_nu * (train_answers[i] - out) * out * (1 - out) * \
                          train_data_x[i][1]
                self.w3 = self.w3 + self.training_nu * (train_answers[i] - out) * out * (1 - out)

    def test(self):
        return self.activate_function(x[0][0] * self.w1 + x[0][1] * self.w2 + self.w3)


neural = BooleanNeural(4, activate_function_hardly, 0.3, 25000)

print('Training...')
neural.training()
print('Done')

print('Test')
print(neural.test())
