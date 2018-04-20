import math


class GraphNeural:
    interval = 20
    norma = 0.01
    p = 4
    correct_data = []
    weights = [0, 0, 0, 0, 0]
    EPS = 0.001

    def __init__(self, a, b):
        self.a = a
        self.b = b
        self.__set_correct__()

    def __set_vector__(self, data_x):
        self.vector = [1]
        self.vector.extend(data_x)

    def __get_next_value__(self):
        next_value = 0
        for i in range(len(self.vector)):
            next_value += self.vector[i] * self.weights[i]

        return next_value

    def test(self):
        return self.epoch()

    def training(self):
        steps = 0
        while self.epoch()["error"] >= self.EPS:
            steps += 1

        return {
            **self.epoch(),
            "steps": steps
        }

    def epoch(self):
        counter = self.p
        update_weights = []
        current = []

        while counter < self.interval:
            vector = []
            for cycle in range(self.p):
                vector.append(self.correct_data[counter - self.p - cycle + 1])

            self.__set_vector__(vector)

            current_result = self.__get_next_value__()
            current.append(current_result)
            update_weights = self.weights

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

    def __calc_error__(self, training, correct):
        diff = []
        for i in range(len(training)):
            diff.append((training[i] - correct[i]) ** 2)

        return math.sqrt(sum(diff))
