import numpy as np


class NetworkHopfield:
    words = []
    weights = []
    y_n_1 = []

    def __init__(self, first, second, third):
        self.words = [first, second, third]
        self.init()

    def init(self):
        self.weights = sum([np.dot(np.array([word]).transpose(), np.array([word])) for word in self.words])
        for i in range(len(self.weights)):
            self.weights[i][i] = 0

        self.y_n_1 = []

    def net_count(self):
        result = []
        for i in range(len(self.y_n_1)):
            result.append(sum([self.weights[j][i] * self.y_n_1[j] for j in range(len(self.y_n_1))]))

        return result

    def out_function(self, net):
        out = []
        for i in range(len(self.y_n_1)):
            if net[i] > 0:
                cur = 1
            elif net[i] < 0:
                cur = -1
            else:
                cur = self.y_n_1[i]
            out.append(cur)

        return out

    def get_result(self, data):
        self.y_n_1 = data

        net = self.net_count()
        result = self.out_function(net)

        return result
