from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_roles

from app.models.user import User
from app.models.dataset import SalesData
from app.models.forecast import ForecastResult
from app.models.forecast_history import ForecastHistory
from app.models.report import Report


router = APIRouter()

@router.get("/users")
def get_users(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    return db.query(User).all()


@router.put("/user/{user_id}/disable")
def disable_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.is_active = False

    db.commit()

    return {
        "success": True,
        "message": "User disabled successfully"
    }


@router.put("/user/{user_id}/enable")
def enable_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.is_active = True

    db.commit()

    return {
        "success": True,
        "message": "User enabled successfully"
    }


@router.delete("/user/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)

    db.commit()

    return {
        "success": True,
        "message": "User deleted successfully"
    }


@router.get("/datasets")
def get_all_datasets(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    return db.query(SalesData).all()


@router.delete("/dataset/{dataset_id}")
def delete_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    dataset = db.query(SalesData).filter(
        SalesData.id == dataset_id
    ).first()

    if not dataset:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )

    db.delete(dataset)

    db.commit()

    return {
        "success": True,
        "message": "Dataset deleted successfully"
    }


@router.get("/reports")
def get_all_reports(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    return db.query(Report).all()


@router.get("/forecast-activities")
def get_forecast_activities(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    return db.query(ForecastHistory).all()


@router.get("/analytics")
def admin_analytics(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    total_users = db.query(User).count()

    total_datasets = db.query(SalesData).count()

    total_forecasts = db.query(ForecastResult).count()

    total_reports = db.query(Report).count()

    total_activities = db.query(ForecastHistory).count()

    return {
        "success": True,
        "total_users": total_users,
        "total_datasets": total_datasets,
        "total_forecasts": total_forecasts,
        "total_reports": total_reports,
        "total_forecast_activities": total_activities
    }