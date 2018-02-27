from math import fabs


def activate_function_simple(net):
    return 1 if net >= 0 else 0


def activate_function_hardly(net):
    return 0.5 * ((net / (1 + fabs(net))) + 1)
