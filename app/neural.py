from activate_functions import activate_function_hardly, activate_function_simple

x = [[0, 0], [0, 1], [1, 0], [1, 1]]
y = [0, 0, 0, 1]

train_data_x = x[1:4]
# print(train_data_x)
train_answers = y[1:4]


class BooleanNeural:
    variables = None
    model_function = None
    activate_function = None
    training_nu = None
    epoch_number = None
    truth_table = [[]]
    weights = []

    def __init__(self, variables, activate_function, training_nu=1.0, epoch_number=100):
        self.variables = variables
        self.activate_function = activate_function
        self.training_nu = training_nu
        self.epoch_number = epoch_number

    def __model__(self, vars):
        return (not vars[0] or not vars[1] or not vars[2]) and (not vars[1] or not vars[2] or vars[3])

    def training(self):
        result = []
        result[0] = [0] * self.variables

        for step in range(2 ** self.variables):
            result = 0
            for vars in result[step]:
                result[step] = self.__model__(vars)
                print(result[step])

        # return self.__training__()

    def __training__(self):
        for epoch in range(self.epoch_number):
            for i in range(3):
                net = train_data_x[i][0] * self.w1 + train_data_x[i][1] * self.w2 + self.w3
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
