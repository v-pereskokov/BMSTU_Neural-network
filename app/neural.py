class BooleanNeural:
    vars = 2
    truth_table = None
    activate_function = None
    training_nu = None
    epoch_number = None
    weights = []
    info = {
        "epoch": [],
        "error": [],
        "data": [],
        "out": [],
        "net": [],
        "weights": []
    }

    '''
        Конструктор для инициализации полей
    '''
    def __init__(self, vars, truth_table, activate_function, training_nu=1.0, epoch_number=100):
        self.truth_table = truth_table
        self.activate_function = activate_function
        self.training_nu = training_nu
        self.epoch_number = epoch_number
        self.weights = [0] * (vars + 1)

    '''
        Проведение теста над переменными
    '''
    def test(self, vars):
        reality = None
        for row in self.truth_table:
            if row[0] == vars:
                reality = row[1][0]

        return {
            "out": self.activate_function(self.__calculate_net__(vars)),
            "reality": reality
        }

    '''
        Проведение обучения на полной таблице истинности.
        Таблица истинности генерируется под определенное число переменных 
        и под нужную булеву функцию
    '''
    def training(self, debug=False, simple=False):
        for epoch in range(self.epoch_number):
            for i in range(len(self.truth_table)):
                row = self.truth_table[i]
                data = row[0]

                net = self.__calculate_net__(data)
                out = self.activate_function(net)
                error = row[1][0] - out

                self.__update_weights__(data, net, out, error, simple)

            error = self.__calculate_error__()
            if debug:
                self.info["error"].append(error)
                self.info["epoch"].append(epoch)

            if error == 0:
                return self.info if debug else None

        return self.info if debug else None

    def get_info(self):
        return self.info

    '''
        Вычисление net
    '''
    def __calculate_net__(self, data):
        net = 0
        for j in range(len(data)):
            net = net + data[j] * self.weights[j]

        return net + self.weights[len(data)]

    '''
        Обновление весов
    '''
    def __update_weights__(self, data, net, out, error, simple):
        for index_weight in range(len(self.weights)):
            self.weights[index_weight] = self.weights[index_weight] + self.training_nu * error * (
                1 if simple else self.__df__(net)) * (
                                             data[index_weight] if index_weight != len(data) else 1)

    '''
        Вычисление расстояния Хэмминга
    '''
    def __calculate_error__(self):
        truth_table = []
        for index in range(len(self.truth_table)):
            row = self.truth_table[index]
            out, _, _ = self.__local_test__(row[0])
            truth_table.append([row[0], row[1], [out]])

        error = 0
        for row in truth_table:
            if row[1] != row[2]:
                error += 1

        return error

    '''
        Проверка на значение результата по Y(net)
    '''
    def __local_test__(self, vars):
        result = self.test(vars)
        y = result["out"]

        reality = result["reality"]
        except_result = 1 if y > 0.8 else 0

        return [except_result, y, reality]

    '''
        Производная (добавил в этот класс)
    '''
    def __df__(self, net):
        return 0.5 * (1 / ((abs(net) + 1) ** 2))
