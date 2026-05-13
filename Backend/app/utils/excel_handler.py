import pandas as pd


def read_excel_file(file):
    return pd.read_excel(file.file)