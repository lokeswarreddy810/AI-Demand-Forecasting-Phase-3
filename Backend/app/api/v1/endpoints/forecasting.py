from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.services.forecasting_service import generate_forecast_service

router = APIRouter(prefix="/forecast", tags=["Forecast"])


@router.get("/predict")
def predict_future_sales(
    days: int = 7,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return generate_forecast_service(db, current_user.id, days)