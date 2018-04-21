import math


class GraphNeural:
    # интервал из 20ти равноотстоящих исходных значений
    interval = 20
    # норма обучения
    norma = 0.01
    # длина окна
    p = 4
    correct_data = []
    weights = [0, 0, 0, 0, 0]
    # максимально допустимая ошибка
    EPS = 0.01

    def __init__(self, a, b):
        self.a = a
        self.b = b
        # задаем правильные значения, высчитанные по исходной функции
        self.__set_correct__()

    def __set_vector__(self, data_x):
        # вес w0 = 1 (по правилу Видроу-Хоффа)
        self.vector = [1]
        self.vector.extend(data_x)

    # получаем следующее прогнозируемое значение ряда
    def __get_next_value__(self):
        next_value = 0
        for i in range(len(self.vector)):
            next_value += self.vector[i] * self.weights[i]

        return next_value

    # запуск теста
    def test(self):
        return self.epoch()

    # обучение
    def training(self):
        errors = []

        steps = 0
        error = 1
        while error >= self.EPS:
            epoch = self.epoch()
            error = epoch["error"]

            errors.append(error)
            steps += 1

        """
            деструктурируем значения, полученные при прохождении через эпоху и число шагов, 
            после которых ошибка стала меньше минимальной
        """
        return {
            **self.epoch(),
            "steps": steps,
            "errors": errors
        }

    def epoch(self):
        counter = self.p
        update_weights = []
        current = []

        while counter < self.interval:
            vector = []
            # получаем значения x[n−p+k−1]
            for k in range(self.p):
                vector.append(self.correct_data[counter - self.p - k + 1])

            self.__set_vector__(vector)

            current_result = self.__get_next_value__()
            current.append(current_result)
            update_weights = self.weights

            # обновляем веса
            for i in range(len(self.weights)):
                update_weights[i] += self.norma * (self.correct_data[counter] - current_result) * self.vector[i]

            counter += 1
        self.weights = update_weights

        return {
            "weights": self.weights,
            "error": self.__calc_error__(current, self.correct_data[self.p::]),
            "correct_data": self.correct_data[self.p::],
            "training_data": current
        }

    def __func_activate__(self, x):
        return math.sin(0.1 * (x ** 3) - 0.2 * (x ** 2) + x - 1)

    def __set_correct__(self):
        step = (self.b - self.a) / 20

        for i in range(1, 22):
            self.correct_data.append(self.__func_activate__(self.a))
            self.a += step

    # суммарная среднеквадратичная ошибка
    def __calc_error__(self, training, correct):
        diff = []
        for i in range(len(training)):
            diff.append((training[i] - correct[i]) ** 2)

        return math.sqrt(sum(diff))
