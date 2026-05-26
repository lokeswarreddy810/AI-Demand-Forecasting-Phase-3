from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.forecast_history import ForecastHistory
from app.services.forecasting_service import generate_forecast_service
from app.utils.activity_logger import log_activity

router = APIRouter()


@router.post("/generate")
def generate_forecast(
    days: int = Query(7, ge=1, le=365),
    model: str = Query("linear_regression"),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = generate_forecast_service(
        db=db,
        user_id=current_user.id,
        days=days,
        selected_model=model,
    )

    log_activity(
        db=db,
        user=current_user,
        activity=f"Forecast Generated using {model}",
    )

    return result


@router.get("/history")
def forecast_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    records = db.query(ForecastHistory).filter(
        ForecastHistory.user_id == current_user.id
    ).order_by(
        ForecastHistory.created_at.desc()
    ).all()

    return [
        {
            "id": item.id,
            "product_name": item.product_name,
            "forecast_date": item.forecast_date,
            "predicted_quantity": item.predicted_quantity,
            "predicted_revenue": item.predicted_revenue,
            "accuracy": item.accuracy,
            "model_used": item.model_used,
            "inventory_recommendation": item.inventory_recommendation,
            "created_at": item.created_at,
        }
        for item in records
    ]


@router.get("/{forecast_id}")
def get_forecast_by_id(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    item = db.query(ForecastHistory).filter(
        ForecastHistory.id == forecast_id,
        ForecastHistory.user_id == current_user.id,
    ).first()

    if not item:
        return {"message": "Forecast not found"}

    return item