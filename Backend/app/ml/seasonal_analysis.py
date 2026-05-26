import pandas as pd


def detect_seasonal_trends(df):
    if df is None or df.empty:
        return []

    required_columns = ["date", "sales_amount", "quantity_sold"]

    for col in required_columns:
        if col not in df.columns:
            return []

    df = df.copy()

    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df["sales_amount"] = pd.to_numeric(df["sales_amount"], errors="coerce")
    df["quantity_sold"] = pd.to_numeric(df["quantity_sold"], errors="coerce")

    df = df.dropna(subset=["date", "sales_amount", "quantity_sold"])

    if df.empty:
        return []

    df["month"] = df["date"].dt.month_name()

    monthly_data = df.groupby("month").agg({
        "sales_amount": "sum",
        "quantity_sold": "sum"
    }).reset_index()

    monthly_data = monthly_data.sort_values(
        by="sales_amount",
        ascending=False
    )

    return [
        {
            "month": row["month"],
            "total_sales": round(float(row["sales_amount"]), 2),
            "total_quantity": int(row["quantity_sold"])
        }
        for _, row in monthly_data.iterrows()
    ]