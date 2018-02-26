from math import fabs

x = [[0, 0], [0, 1], [1, 0], [1, 1]]
y = [0, 0, 0, 1]

train_data_x = x[1:4]
print(train_data_x)
train_answers = y[1:4]
num_epoch = 100


def activate_function_simple(net):
    return 1 if net >= 0 else 0


def activate_function_hardly(net):
    return 0.5 * ((net / (1 + fabs(net))) + 1)


class Neural:
    activate_function = None
    training_nu = None
    w1, w2, w3 = 0, 0, 0

    def __init__(self, activate_function, training_nu=1.0):
        self.activate_function = activate_function
        self.training_nu = training_nu

    def training(self):
        for epoch in range(num_epoch):
            for i in range(3):
                net = train_data_x[i][0] * self.w1 + train_data_x[i][1] * self.w2 + self.w3
                out = self.activate_function(net)

                # TODO: check error
                self.w1 = self.w1 + self.training_nu * (train_answers[i] - out) * out * (1 - out) * \
                          train_data_x[i][0]
                self.w2 = self.w2 + self.training_nu * (train_answers[i] - out) * out * (1 - out) * \
                          train_data_x[i][1]
                self.w3 = self.w3 + self.training_nu * (train_answers[i] - out) * out * (1 - out)

        return self.w1, self.w2, self.w3


neural = Neural(activate_function_simple, 0.3)
print('Training...')
tr_w1, tr_w2, tr_w3 = neural.training()
print('Done')

print('Test')
result_net = x[3][0] * tr_w1 + x[3][1] * tr_w2 + tr_w3
print(activate_function_hardly(result_net))
