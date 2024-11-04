import pandas as pd


def read_file():

    dataframe = pd.read_csv('ejemplo.csv', sep=',')
    print(dataframe)

if __name__ == '__main__':
    read_file()
