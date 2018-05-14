from neural import NetworkHopfield

"""
 1  1  1
-1 -1  1
 1  1  1
 1 -1 -1
 1  1  1
"""
WORD_2 = [1, -1, 1, 1, 1, 1, -1, 1, -1, 1, 1, 1, 1, -1, 1]

"""
 1 -1  1
 1 -1  1
 1  1  1
-1 -1  1
-1 -1  1
"""
WORD_4 = [1, 1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1]

"""
 1  1  1
 1 -1  1
 1  1  1
 1 -1  1
 1  1  1
"""
WORD_8 = [1, 1, 1, 1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1, 1]

ERROR_WORD_8 = [-1, 1, 1, 1, -1, 1, -1, 1, -1, 1, 1, 1, 1, 1, 1]

if __name__ == "__main__":
    network = NetworkHopfield(WORD_2, WORD_4, WORD_8)

    print(network.execute(WORD_8))
    print(network.execute(ERROR_WORD_8))
