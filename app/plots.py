import matplotlib.pyplot as plt
import numpy as np

CORRECT_FUNC = lambda x: np.sin(0.1 * (x ** 3) - 0.2 * (x ** 2) + x - 1)

t = np.arange(0.0, 7.0, 0.01)
s = CORRECT_FUNC(t)
plt.plot(t, s)

plt.xlabel('time (s)')
plt.ylabel('voltage (mV)')
plt.title('Correct plot')
plt.grid(True)
plt.savefig("plots/correct.png")
plt.show()
