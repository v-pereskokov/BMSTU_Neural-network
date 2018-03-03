from itertools import product, tee


class Z2:
    vars_number = 0

    def __init__(self, vars_number=2):
        self.vars_number = vars_number

    def truth_table(self):
        data = self.__create_table__()
        print(data)
        x1, x2 = self.__regroup__(data)
        result = self.AND(x1, x2)

        for row, result_cell in zip(data, result):
            print(row, result_cell)
            print(
                ''.join({True: 'T', False: 'F'}[cell] for cell in row) + '|' + '  ' + {True: 'T', False: 'F'}[
                    result_cell])

    def AND(self, a, b):
        for p, q in zip(a, b):
            yield p and q

    def __create_table__(self):
        return list(product([True, False], repeat=self.vars_number))

    def __regroup__(self, data):
        return [[elem[i] for elem in lst] for i, lst in enumerate(tee(data, len(data[0])))]


z2 = Z2(2)
z2.truth_table()
