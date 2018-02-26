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


def training(w1, w2, w3):
    coef = 0.3

    for epoch in range(num_epoch):
        for i in range(3):
            print(epoch, i)
            net = train_data_x[i][0] * w1 + train_data_x[i][1] * w2 + w3
            y = activate_function_hardly(net)
            print('data', train_data_x[i], y)
            # TODO: check error
            w1 = w1 + coef * (train_answers[i] - y) * y * (1 - y) * train_data_x[i][0]
            w2 = w2 + coef * (train_answers[i] - y) * y * (1 - y) * train_data_x[i][1]
            w3 = w3 + coef * (train_answers[i] - y) * y * (1 - y)
            print('weights', w1, w2, w3)


print('Training...')
training(0, 0, 0, )
print('Done')

print('Test')
net = x[3][0] * w1 + x[3][1] * w2 + w3
print(activate_function_hardly(net))
