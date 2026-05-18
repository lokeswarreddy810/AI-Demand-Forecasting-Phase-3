import pandas as pd

from datetime import timedelta

from app.models.dataset import SalesData
from app.models.forecast import ForecastResult
from app.models.forecast_history import ForecastHistory

from app.ml.predict import predict_quantity
from app.ml.metrics import calculate_metrics
from app.ml.compare_models import get_best_model

from app.services.notification_service import (
    create_notification
)


def generate_forecast_service(
    db,
    user_id,
    days
):

    sales_data = db.query(
        SalesData
    ).filter(
        SalesData.uploaded_by == user_id
    ).all()

    if not sales_data:

        return {
            "message": "No dataset found",
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

    for product in df["product_name"].unique():

        product_df = df[
            df["product_name"] == product
        ].copy()

        product_df = product_df.groupby(
            "date"
        )["quantity_sold"].sum().reset_index()

        product_df["date"] = pd.to_datetime(
            product_df["date"]
        )

        product_df["day_number"] = (
            product_df["date"]
            - product_df["date"].min()
        ).dt.days

        if len(product_df) < 2:
            continue

        X = product_df[["day_number"]]

        y = product_df["quantity_sold"]

        best_model = get_best_model(X, y)

        model = best_model["model"]

        model_name = best_model["name"]

        predictions = model.predict(X)

        metrics = calculate_metrics(
            y,
            predictions
        )

        last_date = product_df[
            "date"
        ].max()

        last_day = product_df[
            "day_number"
        ].max()

        for i in range(1, days + 1):

            future_day = last_day + i

            future_date = (
                last_date
                + timedelta(days=i)
            )

            prediction = predict_quantity(
                model,
                future_day
            )

            forecast = ForecastResult(
                product_name=product,

                forecast_date=future_date.date(),

                predicted_quantity=prediction,

                uploaded_by=user_id
            )

            db.add(forecast)

            history = ForecastHistory(
                user_id=user_id,

                product_name=product,

                model_used=model_name,

                accuracy=metrics["accuracy"],

                forecast_date=str(
                    future_date.date()
                )
            )

            db.add(history)

            results.append({

                "product_name": product,

                "forecast_date": str(
                    future_date.date()
                ),

                "predicted_quantity": prediction,

                "accuracy": metrics[
                    "accuracy"
                ],

                "model_used": model_name
            })

    db.commit()

    create_notification(
        db=db,
        user_id=user_id,
        message="Forecast generated successfully",
        type="forecast"
    )

    return {
        "message": "Forecast generated successfully",
        "forecast": results
    }