from math import *
from activate_functions import activate_function


class BooleanNeural:
    truth_table = None
    rows = None

    def __init__(self, truth_table, center):
        self.truth_table = truth_table
        self.center = center
        self.__setup__()

    def training(self):
        error = 1
        epochs = 0
        info_data = []
        while error > 0:
            error = self.__step__()
            info_data.append({
                "error": error,
                "epoch": epochs
            })
            epochs += 1

        return {
            "error": error,
            "epochs": epochs,
            "weights": self.vector,
            "info": info_data
        }

    def __setup__(self):
        rows = []
        [rows.append(row[0]) for row in self.truth_table]
        self.rows = list(reversed(rows))

        self.c_rows, c_numbers = self.find_min()
        self.vector = [0] * (len(self.c_rows) + 1)

    def __net__(self, vector, row, y_vector):
        net = 0

        for i in range(len(vector) - 1):
            net += vector[i] * activate_function(i, row, y_vector)

        return net + vector[-1]

    def __activate_function__(self, i, mat):
        summ = 0
        for j in range(4):
            summ += (mat[j] - self.c_rows[i][j]) ** 2
        return exp(-summ)

    def __get_net__(self, vector, mat):
        net = 0
        for i in range(len(vector) - 1):
            net += vector[i] * self.__activate_function__(i, mat)
        net += vector[-1]

        return net

    def __step__(self):
        update_vector = []
        for i in range(len(self.vector)):
            update_vector.append(self.vector[i])
        y_vector = [-1] * len(self.truth_table)
        e = 0
        for i in self.center:
            if self.__get_net__(self.vector, self.rows[i]) >= 0:
                y_vector[i] = 1
            else:
                y_vector[i] = 0

            if y_vector[i] != self.truth_table[i][1][0]:
                e += 1

                for j in range(len(self.vector) - 1):
                    update_vector[j] += - 0.3 * (y_vector[i] - self.truth_table[i][1][0]) * self.__activate_function__(
                        j, self.rows[i])
                update_vector[len(self.vector) - 1] += - 0.3 * (y_vector[i] - self.truth_table[i][1][0])
        if e > 0:
            for i in range(len(self.vector)):
                self.vector[i] = update_vector[i]
        return e

    def find_min(self):
        c_vector = []
        numbers_vector = []
        true_count = 0
        for row in self.truth_table:
            if row[1][0] == 1:
                true_count += 1

        cmp = 1 if true_count <= len(self.truth_table) / 2 else 0

        for i in range(len(self.truth_table)):
            [row, f] = self.truth_table[i]
            if f[0] == cmp:
                numbers_vector.append(i)
                c_vector.append(row)
        return c_vector, numbers_vector
