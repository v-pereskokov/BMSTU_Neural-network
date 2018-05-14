# Лабораторная работа 4 (№6 по методичке)

## Изучение алгоритма обратного распространения ошибки (метод Back Propagation)

### Цель
Исследовать функционирование многослойной нейронной сети (МНС) прямого распространения и ее обучение методом обратного распространения ошибки (англ. Back Propagation – BP).

### Данные
Архитектура: *1–1–3*
x: *(1 –3)*
10t: *(–3 1 1)*

### Результаты
```
E(157) = 9.48954396826629e-05
[-2.9999051045603173, 0.9999999999999998, 0.9999999999999998]
```

### Исходный код
- [Точка входа](/app/main.py)
- [Класс с обучением](/app/neural.py)

#### main.py
```python
from neural import NeuralNetwork

if __name__ == "__main__":
    network = NeuralNetwork()
    print(network.train())
```

#### neural.py
```python
import math


class NeuralNetwork:
    def __init__(self):
        self.W00 = [0]
        self.W01 = [0]
        self.W10 = [0, 0, 0]
        self.W11 = [0, 0, 0]
        # Входной вектор
        self.X = [1, -3]
        # Задаем целевой вектор
        self.correct = [-3, 1, 1]
        # Норма обучения
        self.norm = 0.6
        self.out = []

    def set_weights(self, w00, w01, w10, w11):
        self.W00.extend([w00, w01])
        self.W01.extend([w10, w11])
    
    # Задаем ФА
    def activation_func(self, net):
        return (1 - math.exp(-net)) / (1 + math.exp(-net))
    
    # Задаем производную ФА
    def activation_func_df(self, net):
        return 0.5 * (1 - self.activation_func(net) ** 2)

    def train(self):
        counter = 0

        while True:
            # На первом этапе следует рассчитать по заданному входному сигналу xi , i=0,N,выходМНС ym(k)
            net0 = self.W00[0] + self.X[1] * self.W01[0]
            newX = [1, self.activation_func(net0)]
            Y = []
            delta2 = []
            delta1 = []
            for i in range(3):
                Y.append(self.W10[i] + newX[1] * self.W11[i])
                delta2.append(self.activation_func_df(Y[i]) * (self.correct[i] - Y[i]))
            
            delta1.append(self.activation_func_df(net0) * sum([delta2[i] * self.W11[i] for i in range(3)]))

            self.W00[0] += self.norm * 1 * delta1[0]
            self.W01[0] += self.norm * self.X[1] * delta1[0]

            for i in range(3):
                self.W10[i] += self.norm * 1 * delta2[i]
                self.W11[i] += self.norm * net0 * delta2[i]
            
            # Оцениваем ср квадратичную ошибку
            error = math.sqrt(sum([(self.correct[i] - Y[i]) ** 2 for i in range(3)]))
            print('Y = ', Y, '\n', 'E(', counter, ') = ', error)
            if error <= 0.0001:
                self.out = Y.copy()
                break
            counter += 1

        return self.out
```

### Выполнял
Перескоков Владислав Андреевич,   
МГТУ им. Баумана,  
ИУ-8, 3 курс, 61 группа,  
Вариант 13  
