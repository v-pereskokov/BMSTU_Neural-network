# Лабораторная работа 3 (№4 по методичке)

## Исследование нейронных сетей с радиальными базисными функциями (RBF) на примере моделирования булевых выражений

### Цель
Исследовать функционирование нейронной сети (НС) с радиальными базисными функциями (RBF) и ее обучение по правилу Видроу-Хоффа.

### Данные
Функция: *(!x1 + !x2 + !x3)(!x2 + !x3 + !x4)*  

### Таблица истинности
```python
truth_table = [
    [[1, 1, 1, 1], [0]], 
    [[1, 1, 1, 0], [0]], 
    [[1, 1, 0, 1], [1]], 
    [[1, 1, 0, 0], [1]], 
    [[1, 0, 1, 1], [1]], 
    [[1, 0, 1, 0], [1]], 
    [[1, 0, 0, 1], [1]], 
    [[1, 0, 0, 0], [1]], 
    [[0, 1, 1, 1], [1]], 
    [[0, 1, 1, 0], [0]], 
    [[0, 1, 0, 1], [1]], 
    [[0, 1, 0, 0], [1]], 
    [[0, 0, 1, 1], [1]], 
    [[0, 0, 1, 0], [1]], 
    [[0, 0, 0, 1], [1]], 
    [[0, 0, 0, 0], [1]]
]
```

### Результаты
```python
result = {'error': 0, 'epochs': 6, 'weights': [0.7889265890373139, 0.29022987270033923, 0.08094013055899255, -0.3]}
```

### Графики
График суммарной квадратичной ошибки в зависимости от эпохи обучения.
![График 1](/plots/plot.png)

### Исходный код
- [Точка входа](/app/main.py)
- [Класс с обучением](/app/neural.py)
- [Графики](/app/plots.py)
- [Получение таблицы истинности по заданной функции](/app/z2.py)

#### main.py
```python
from neural import BooleanNeural
from z2 import Z2


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


if __name__ == "__main__":
    neural = BooleanNeural(Z2(4).truth_table(model), [1, 9, 15])
    print(neural.training())
```

#### neural.py
```python
from math import *
from activate_functions import activate_function


class BooleanNeural:
    truth_table = None
    rows = None

    def __init__(self, truth_table, center):
        self.truth_table = truth_table
        self.center = center
        self.__setup__()

    # метод обучения
    def training(self):
        error = 1  # задаем ошибку изначально 1
        epochs = 0
        info_data = []
        while error > 0:  # обучаем пока ошибка > 0
            error = self.__step__()  # шаг обучения (одна эпоха)
            info_data.append({
                "error": error,
                "epoch": epochs
            })  # сбор логов (ошибка и эпоха на кажжой итерации)
            epochs += 1

        return {
            "error": error,
            "epochs": epochs,
            "weights": self.vector,
            "info": info_data
        }

    # задаем дополнительные переменные для удобства (массив со строками и тд)
    def __setup__(self):
        rows = []
        [rows.append(row[0]) for row in self.truth_table]
        self.rows = list(reversed(rows))

        self.c_rows, c_numbers = self.find_min()
        self.vector = [0] * (len(self.c_rows) + 1)

    def __activate_function__(self, i, mat):
        summ = 0
        for j in range(4):
            summ += (mat[j] - self.c_rows[i][j]) ** 2
        return exp(-summ)

    # получаем net
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

    # поиск J = min{J0 , J1}
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
```

#### plots.py
```python
import matplotlib.pyplot as plt
from neural import BooleanNeural
from z2 import Z2


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


def get_training_plot():
    neural = BooleanNeural(Z2(4).truth_table(model), [1, 9, 15])
    result = neural.training()

    plt.plot([info["epoch"] for info in result["info"]], [info["error"] for info in result["info"]])
    plt.title("Training plot")
    plt.grid(True)
    plt.savefig("plots/plot.png")
    plt.show()


get_training_plot()
```

#### z2.py
```python
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
```

### Выполнял
Перескоков Владислав Андреевич,   
МГТУ им. Баумана,  
ИУ-8, 3 курс, 61 группа,  
Вариант 13  
