from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.services.analytics_service import (
    get_summary,
    get_monthly_sales,
    get_top_products
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/summary")
def dataset_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_summary(db, current_user.id)


@router.get("/monthly-sales")
def monthly_sales(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_monthly_sales(db, current_user.id)


@router.get("/top-products")
def top_products(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_top_products(db, current_user.id)