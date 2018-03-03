import unittest
from activate_functions import activate_function_hardly, activate_function_simple
from neural import BooleanNeural
from z2 import Z2


def model(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


neural = BooleanNeural(4, Z2(4).truth_table(model), activate_function_hardly, 0.3, 100000)

print('Training...')
neural.training()
print('Done')

print('Test')
print(neural.test([0, 0, 0, 0]))
