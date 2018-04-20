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
