import pandas as pd
from datetime import timedelta

from app.models.dataset import SalesData
from app.models.forecast import ForecastResult
from app.ml.train_model import train_linear_regression
from app.ml.predict import predict_quantity


def generate_forecast_service(db, user_id, days):
    sales_data = db.query(SalesData).filter(
        SalesData.uploaded_by == user_id
    ).all()

    if not sales_data:
        return {
            "message": "No dataset found. Please upload dataset first.",
            "forecast": []
        }

    rows = []

    for item in sales_data:
        rows.append({
            "date": item.date,
            "product_name": item.product_name,
            "quantity_sold": item.quantity_sold
        })

    df = pd.DataFrame(rows)

    results = []

    # clear old forecast for same user
    db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == user_id
    ).delete()

    for product in df["product_name"].unique():
        product_df = df[df["product_name"] == product].copy()

        product_df = product_df.groupby("date")["quantity_sold"].sum().reset_index()

        product_df["date"] = pd.to_datetime(product_df["date"])

        product_df["day_number"] = (
            product_df["date"] - product_df["date"].min()
        ).dt.days

        # IMPORTANT: Linear Regression needs at least 2 rows
        if len(product_df) < 2:
            continue

        X = product_df[["day_number"]]
        y = product_df["quantity_sold"]

        model = train_linear_regression(X, y)

        last_date = product_df["date"].max()
        last_day = product_df["day_number"].max()

        for i in range(1, days + 1):
            future_day = last_day + i
            future_date = last_date + timedelta(days=i)

            prediction = predict_quantity(model, future_day)

            forecast = ForecastResult(
                product_name=product,
                forecast_date=future_date.date(),
                predicted_quantity=prediction,
                uploaded_by=user_id
            )

            db.add(forecast)

            results.append({
                "product_name": product,
                "forecast_date": str(future_date.date()),
                "predicted_quantity": prediction
            })

    db.commit()

    return {
        "message": "Forecast generated successfully",
        "forecast": results
    }