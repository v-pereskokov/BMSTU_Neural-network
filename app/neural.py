from math import *
from activate_functions import activate_function
from z2 import Z2


class BooleanNeural:
    truth_table = None

    def __init__(self, truth_table):
        self.truth_table = truth_table

    def __min_f_values_(self):
        y_numbers = []
        true_count = 0

        for row in self.truth_table:
            if row[1] == 1:
                true_count += 1

        cmp = 1 if true_count <= len(self.truth_table) / 2 else 0

        for i in range(len(self.truth_table)):
            if self.truth_table[i][1] == cmp:
                y_numbers.append(i)

        return y_numbers

    def __net__(self, vector, row, y_vector):
        net = 0

        for i in range(len(vector) - 1):
            net += vector[i] * activate_function(i, row, y_vector)

        return net + vector[-1]

    def __activate_function__(self, i, mat):
        summ = 0
        for j in range(4):
            summ += (mat[j] - C[i][j]) ** 2
        return exp(-summ)

    def __get_net__(self, V, mat):
        net = 0
        for i in range(len(V) - 1):
            net += V[i] * self.__activate_function__(i, mat)
        net += V[len(V) - 1]
        return net

    def train(self):
        new_V = []
        for i in range(len(V)):
            new_V.append(V[i])
        Y = [-1] * 16
        E = 0
        for i in N2:
            if self.__get_net__(V, sett[i]) >= 0:
                Y[i] = 1
            else:
                Y[i] = 0
            if Y[i] != F[i]:
                E += 1
                for j in range(len(V) - 1):
                    new_V[j] += - 0.3 * (Y[i] - F[i]) * self.__activate_function__(j, sett[i])
                new_V[len(V) - 1] += - 0.3 * (Y[i] - F[i])
        if E > 0:
            for i in range(len(V)):
                V[i] = new_V[i]
        return E

    def CeC(self):
        C = []
        N = []
        kol = 0
        for i in F:
            if (i == 1):
                kol += 1
        if (kol <= 8):
            m = 1
        else:
            m = 0
        for i in range(16):
            if (F[i] == m):
                N.append(i)
                C.append(sett[i][:])
        return C, N


# def Fe(i, mat):
#     summ = 0
#     for j in range(4):
#         summ += (mat[j] - C[i][j]) * (mat[j] - C[i][j])
#     return exp(-summ)
#
#
# def NET(V, mat):
#     net = 0
#     for i in range(len(V) - 1):
#         net += V[i] * Fe(i, mat)
#     net += V[len(V) - 1]
#     return net
#
#
# def train():
#     new_V = []
#     for i in range(len(V)):
#         new_V.append(V[i])
#     Y = [-1] * 16
#     E = 0
#     for i in N2:
#         if (NET(V, sett[i]) >= 0):
#             Y[i] = 1
#         else:
#             Y[i] = 0
#         if (Y[i] != F[i]):
#             E += 1
#             for j in range(len(V) - 1):
#                 new_V[j] += - 0.3 * (Y[i] - F[i]) * Fe(j, sett[i])
#             new_V[len(V) - 1] += - 0.3 * (Y[i] - F[i])
#     if (E > 0):
#         for i in range(len(V)):
#             V[i] = new_V[i]
#     return E

def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


neural = BooleanNeural(Z2(4).truth_table(model))
sett = [[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0],
        [0, 0, 1, 1], [0, 1, 0, 0], [0, 1, 0, 1],
        [0, 1, 1, 0], [0, 1, 1, 1], [1, 0, 0, 0],
        [1, 0, 0, 1], [1, 0, 1, 0], [1, 0, 1, 1],
        [1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 1, 0],
        [1, 1, 1, 1]]
F = [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]
C, N = neural.CeC()
print("C: ", C, "\n")
print("N: ", N, "\n")
N2 = [2, 13, 15]
V = [0] * (len(C) + 1)
error = neural.train()
kol = 1
while error > 0:
    error = neural.train()
    kol += 1

print(V, '\n', kol)
