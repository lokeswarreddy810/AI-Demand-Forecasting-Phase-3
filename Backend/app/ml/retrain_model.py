import pandas as pd

from app.models.dataset import SalesData
from app.ml.ensemble_models import train_ensemble_models


def retrain_forecasting_model(db, user_id):
    sales_data = db.query(SalesData).filter(
        SalesData.uploaded_by == user_id
    ).all()

    if not sales_data:
        return {
            "success": False,
            "message": "No dataset available for retraining"
        }

    rows = []

    for item in sales_data:
        rows.append({
            "date": item.date,
            "quantity_sold": item.quantity_sold
        })

    df = pd.DataFrame(rows)

    df["date"] = pd.to_datetime(df["date"])

    df["day_number"] = (
        df["date"] - df["date"].min()
    ).dt.days

    if len(df) < 3:
        return {
            "success": False,
            "message": "At least 3 records required for retraining"
        }

    X = df[["day_number"]]
    y = df["quantity_sold"]

    best_model = train_ensemble_models(X, y)

    return {
        "success": True,
        "message": "Model retrained successfully",
        "best_model": best_model["name"],
        "score": round(best_model["score"], 4),
        "all_model_scores": best_model["all_scores"]
    }