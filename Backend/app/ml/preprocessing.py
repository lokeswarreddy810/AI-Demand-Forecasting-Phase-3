import pandas as pd
from app.utils.validators import validate_columns
from app.utils.csv_handler import read_csv_file
from app.utils.excel_handler import read_excel_file


def clean_uploaded_file(file):
    if file.filename.endswith(".csv"):
        df = read_csv_file(file)
    else:
        df = read_excel_file(file)

    error = validate_columns(df.columns)

    if error:
        return None, error

    df = df.drop_duplicates()
    df = df.dropna()

    df["date"] = pd.to_datetime(df["date"]).dt.date
    df["quantity_sold"] = df["quantity_sold"].astype(int)
    df["sales_amount"] = df["sales_amount"].astype(float)

    return df, None