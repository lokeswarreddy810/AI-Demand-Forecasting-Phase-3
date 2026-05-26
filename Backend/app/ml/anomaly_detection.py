import pandas as pd


def detect_sales_anomalies(df):

    if df is None or df.empty:
        return []

    required_columns = ["date", "product_name", "quantity_sold"]

    for col in required_columns:
        if col not in df.columns:
            return []

    df = df.copy()

    df["quantity_sold"] = pd.to_numeric(
        df["quantity_sold"],
        errors="coerce"
    )

    df = df.dropna(subset=["quantity_sold"])

    if df.empty:
        return []

    anomalies = []

    for product in df["product_name"].unique():
        product_df = df[df["product_name"] == product].copy()

        if len(product_df) < 3:
            continue

        mean_qty = product_df["quantity_sold"].mean()
        std_qty = product_df["quantity_sold"].std()

        if pd.isna(std_qty) or std_qty == 0:
            continue

        product_df["z_score"] = (
            product_df["quantity_sold"] - mean_qty
        ) / std_qty

        abnormal_rows = product_df[
            product_df["z_score"].abs() > 2
        ]

        for _, row in abnormal_rows.iterrows():
            anomalies.append({
                "date": str(row["date"]),
                "product_name": str(row["product_name"]),
                "quantity_sold": float(row["quantity_sold"]),
                "anomaly_type": "Unusual sales pattern",
                "z_score": round(float(row["z_score"]), 2)
            })

    return anomalies