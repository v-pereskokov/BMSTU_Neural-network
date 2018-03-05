import unittest
from activate_functions import activate_function_hardly, activate_function_simple
from neural import BooleanNeural
from z2 import Z2


def model_simple(vars, AND, OR, NOT):
    return AND(vars[0], vars[1])


def model_13(vars, AND, OR, NOT):
    return AND(OR(NOT(vars[0]), OR(NOT(vars[1]), NOT(vars[2]))), OR(NOT(vars[1]), OR(NOT(vars[2]), vars[3])))


class TestTraining2Vars(unittest.TestCase):
    neural = None

    @classmethod
    def setUpClass(cls):
        cls.neural = cls.__training__(cls, 2, model_simple)

    def test_2_vars_true_1_1(self):
        self.assertTrue(self.neural.test([1, 1])["out"] > 0.8)

    def test_2_vars_false_1_0(self):
        self.assertTrue(self.neural.test([1, 0])["out"] < 0.2)

    def test_2_vars_false_0_1(self):
        self.assertTrue(self.neural.test([0, 1])["out"] < 0.2)

    def test_2_vars_false_0_0(self):
        self.assertTrue(self.neural.test([0, 0])["out"] < 0.2)

    def __training__(self, vars, model):
        neural = BooleanNeural(vars, Z2(vars).truth_table(model), activate_function_hardly, 0.3, 10000)
        neural.training()

        return neural


class TestTraining4Vars(unittest.TestCase):
    neural = None

    @classmethod
    def setUpClass(cls):
        cls.neural = cls.__training__(cls, 4, model_13)

    def test_4_vars_true_0_0_0_0(self):
        self.assertTrue(self.neural.test([0, 0, 0, 0])["out"] > 0.8)

    def test_4_vars_false_1_1_1_0(self):
        self.assertTrue(self.neural.test([1, 1, 1, 0])["out"] < 0.2)

    def test_4_vars_false_0_1_1_0(self):
        self.assertTrue(self.neural.test([0, 1, 1, 0])["out"] < 0.2)

    def __training__(self, vars, model):
        neural = BooleanNeural(vars, Z2(vars).truth_table(model), activate_function_hardly, 0.3, 10000)
        neural.training()

        return neural


if __name__ == "__main__":
    unittest.main()
