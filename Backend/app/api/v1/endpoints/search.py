from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.dataset import SalesData
from app.models.forecast import ForecastResult
from app.models.user import User

router = APIRouter()


@router.get("/")
def global_search(
    keyword: str = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    dataset_results = db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id,
        SalesData.product_name.ilike(f"%{keyword}%")
    ).all()

    forecast_results = db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == current_user.id,
        ForecastResult.product_name.ilike(f"%{keyword}%")
    ).all()

    return {
        "keyword": keyword,
        "datasets": dataset_results,
        "forecasts": forecast_results
    }


@router.get("/admin")
def admin_global_search(
    keyword: str = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.role != "Super Admin":
        return {
            "success": False,
            "message": "Permission denied"
        }

    users = db.query(User).filter(
        User.email.ilike(f"%{keyword}%")
    ).all()

    datasets = db.query(SalesData).filter(
        SalesData.product_name.ilike(f"%{keyword}%")
    ).all()

    forecasts = db.query(ForecastResult).filter(
        ForecastResult.product_name.ilike(f"%{keyword}%")
    ).all()

    return {
        "keyword": keyword,
        "users": users,
        "datasets": datasets,
        "forecasts": forecasts
    }