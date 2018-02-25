from math import exp

x = [[0, 0], [0, 1], [1, 0], [1, 1]]
y = [0, 0, 0, 1]

train_data_x = x[1:4]
print(train_data_x)
train_answers = y[1:4]
num_epoch = 100
w1, w2, w3 = 0, 0, 0
coef = 1


def sigmoid(a):
    return 1 / (1 + exp(-a))


for epoch in range(num_epoch):
    for i in range(3):
        print(epoch, i)
        a = train_data_x[i][0] * w1 + train_data_x[i][1] * w2 + w3
        y = sigmoid(a)
        print('data', train_data_x[i], y)
        w1 = w1 + coef * (train_answers[i] - y) * y * (1 - y) * train_data_x[i][0]
        w2 = w2 + coef * (train_answers[i] - y) * y * (1 - y) * train_data_x[i][1]
        w3 = w3 + coef * (train_answers[i] - y) * y * (1 - y)
        print('weights', w1, w2, w3)

print('Done')

print('Test')
a = x[0][0] * w1 + x[0][1] * w2 + w3
print(sigmoid(a))
