import math


def activate_function(x, c, i, J):
    summ = 0
    for j in range(J):
        summ += (x[j] - c[i][j]) ** 2

    return math.exp(-summ)
