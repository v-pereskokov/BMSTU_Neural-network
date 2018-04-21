# Лабораторная работа 2 (№3 по методичке)

## Применение однослойной нейронной сети с линейной функцией активации для прогнозирования временных рядов

### Цель
Изучение возможностей однослойных нейронных сетей в задачах прогнозирования временных рядов методом скользящего окна (авторегрессия).

### Выволнение работы 
Рассмотрим прогноз функции sin(0.1t^3 −0.2t^2 +t−1) по 20-ти равноотстоящим исходным значениям, заданным на интервале t ∈ [0, 1]. Выберем длину окна p = 6,
норму обучения η = 1.

### Результаты

Вектор весовых коэффициентов при M = 1303 равен, где M –– число эпох обучения. 
```
weights = (0.1686, 0.5470, 0.5250, 0.0119, -0.0159)
```

Остальные значения.
```
Error:  0.009957508447924727
Correct vector:  [-0.7223537420766529, -0.6896006760224201, -0.6558439151633223, -0.6211525351186067, -0.5855837454654647, -0.5491840008304752, -0.5119901155091822, -0.47403037975619305, -0.43532567814532425, -0.39589061234361356, -0.3557346323073308, -0.31486318131974517, -0.2732788614704473, -0.23098262713877987, -0.18797501479636106, -0.14425741798495267, -0.0998334166468279]
Training vector:  [-0.7171905242964245, -0.6963151939147324, -0.6519656755283704, -0.6188687061324736, -0.5845013954159466, -0.5489778868581149, -0.5123934494091966, -0.4748263949098615, -0.4363399474942051, -0.39698404535250964, -0.35679706627619906, -0.3158074765817008, -0.27403540896380435, -0.23149417912321438, -0.1881917541120116, -0.14413218761821514]
Epochs:  1303
```

### Графики
На графике 1 (ниже) приведен график исходной функции на отрезке [0, 1].  
![График 1](/plots/correct.png)

На графике 2 (ниже) приведен график функции, построенной уже по обученным коэффициентам, на отрезке также [0, 1].  
![График 2](/plots/training.png)

### Исходный код
- [Точка входа](/app/main.py)
- [Класс с обучением](/app/neural.py)
- [Графики](/app/plots.py)

#### main.py
```python
from neural import GraphNeural

if __name__ == "__main__":
    neural = GraphNeural(0, 1)

    result = neural.training()
    epoch = neural.test()

    print("weights: ", epoch["weights"])
    print("error: ", epoch["error"])
    print("correct: ", epoch["correct_data"])
    print("data: ", epoch["training_data"])
    print("steps: ", result["steps"])
```

#### neural.py
```python
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
```

#### plots.py
```python
import matplotlib.pyplot as plt
import numpy as np

from neural import GraphNeural

correct_func = lambda x: np.sin(0.1 * (x ** 3) - 0.2 * (x ** 2) + x - 1)


def get_correct_plot():
    x_vector = np.arange(0, 1, 0.05)
    y_vector = correct_func(x_vector)
    plt.plot(x_vector, y_vector)

    plt.title("Correct plot")
    plt.grid(True)
    plt.savefig("plots/correct.png")
    plt.show()


def get_training_plot():
    x_vector = np.arange(0, 1, 1 / 16)

    neural = GraphNeural(0, 1)
    neural.training()
    result = neural.test()["training_data"]

    plt.plot(x_vector, result)
    plt.title("Training plot")
    plt.grid(True)
    plt.savefig("plots/training.png")
    plt.show()


def get_error_epoch_plot():
    neural = GraphNeural(0, 1)
    training_result = neural.training()

    plt.plot(np.arange(0, training_result["steps"], 1), training_result["errors"])
    plt.title("Error(epoch)")
    plt.grid(True)
    plt.savefig("plots/error.png")
    plt.show()


# get_correct_plot()
# get_training_plot()
get_error_epoch_plot()
```

### Выполнял
Перескоков Владислав Андреевич,   
МГТУ им. Баумана,  
ИУ-8, 3 курс, 61 группа,  
Вариант 13  
