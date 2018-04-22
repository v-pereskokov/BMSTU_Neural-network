import math


def activate_function(i, row, y_numbers):
    summ = 0
    for j in range(len(row)):
        summ += (row[j] - y_numbers[i][j]) ** 2

    return math.exp(-summ)
