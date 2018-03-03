from itertools import product, tee


class Z2:
    vars_number = 0

    def __init__(self, vars_number=2):
        self.vars_number = vars_number

    def truth_table(self, model):
        data = self.__create_table__()
        print(data)
        x1, x2 = self.__regroup__(data)
        result = self.model([x1, x2], model)

        for row, result_cell in zip(data, result):
            print(
                ''.join({True: 'T', False: 'F'}[cell] for cell in row) + '|' + '  ' + {True: 'T', False: 'F'}[
                    result_cell])

    def AND(self, a, b):
        for p, q in zip(a, b):
            yield p and q

    def OR(self, a, b):
        for p, q in zip(a, b):
            yield p or q

    def NOT(self, a):
        for p in a:
            yield not p

    def model(self, vars, model_function):
        return model_function(vars, self.AND, self.OR, self.NOT)

    def __create_table__(self):
        return list(product([True, False], repeat=self.vars_number))

    def __regroup__(self, data):
        return [[elem[i] for elem in lst] for i, lst in enumerate(tee(data, len(data[0])))]


def test_model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


def test(vars, AND, OR, NOT):
    return AND(vars[0], vars[1])


z2 = Z2(2)
z2.truth_table(test)
