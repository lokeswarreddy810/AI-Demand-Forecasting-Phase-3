import pandas as pd

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.dataset import SalesData
from app.ml.anomaly_detection import detect_sales_anomalies
from app.ml.seasonal_analysis import detect_seasonal_trends
from app.ml.retrain_model import retrain_forecasting_model

router = APIRouter()

def get_user_sales_dataframe(db, user_id):
    sales_data = db.query(SalesData).filter(
        SalesData.uploaded_by == user_id
    ).all()

    rows = []

    for item in sales_data:
        rows.append({
            "date": item.date,
            "product_name": item.product_name,
            "category": item.category,
            "region": item.region,
            "quantity_sold": item.quantity_sold,
            "sales_amount": item.sales_amount
        })

    return pd.DataFrame(rows)


@router.get("/anomalies")
def get_anomalies(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    df = get_user_sales_dataframe(db, current_user.id)

    anomalies = detect_sales_anomalies(df)

    return {
        "success": True,
        "total_anomalies": len(anomalies),
        "anomalies": anomalies
    }


@router.get("/seasonal-trends")
def get_seasonal_trends(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    df = get_user_sales_dataframe(db, current_user.id)

    trends = detect_seasonal_trends(df)

    return {
        "success": True,
        "seasonal_trends": trends
    }


@router.post("/retrain")
def retrain_model(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return retrain_forecasting_model(
        db,
        current_user.id
    )