from itertools import product, tee


class Z2:
    vars_number = 0

    def __init__(self, vars_number=2):
        self.vars_number = vars_number

    def truth_table(self, model):
        data = self.__create_table__()
        vars = self.__regroup__(data)
        model_result = self.model(vars, model)
        result = []

        for row, result_cell in zip(data, model_result):
            result.append([[{True: 1, False: 0}[cell] for cell in row], [{True: 1, False: 0}[result_cell]]])

        return result

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
