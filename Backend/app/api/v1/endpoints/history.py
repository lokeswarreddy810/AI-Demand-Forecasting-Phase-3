from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.forecast_history import ForecastHistory

router = APIRouter()


@router.get("/")
def get_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    history = db.query(
        ForecastHistory
    ).filter(
        ForecastHistory.user_id == current_user.id
    ).all()

    return history