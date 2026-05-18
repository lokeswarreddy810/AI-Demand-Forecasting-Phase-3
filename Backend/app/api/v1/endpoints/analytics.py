from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.dataset import SalesData
from app.services.analytics_service import (
    get_summary,
    get_monthly_sales,
    get_top_products
)

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/summary")
def summary(
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


@router.get("/category-sales")
def category_sales(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    data = db.query(
        SalesData.category,
        func.sum(SalesData.sales_amount).label("total_sales"),
        func.sum(SalesData.quantity_sold).label("total_quantity")
    ).filter(
        SalesData.uploaded_by == current_user.id
    ).group_by(SalesData.category).all()

    return [
        {
            "category": row.category,
            "total_sales": row.total_sales,
            "total_quantity": row.total_quantity
        }
        for row in data
    ]


@router.get("/region-sales")
def region_sales(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    data = db.query(
        SalesData.region,
        func.sum(SalesData.sales_amount).label("total_sales"),
        func.sum(SalesData.quantity_sold).label("total_quantity")
    ).filter(
        SalesData.uploaded_by == current_user.id
    ).group_by(SalesData.region).all()

    return [
        {
            "region": row.region,
            "total_sales": row.total_sales,
            "total_quantity": row.total_quantity
        }
        for row in data
    ]


@router.get("/date-range")
def date_range_analytics(
    start_date: date = Query(...),
    end_date: date = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if start_date > end_date:
        return {
            "success": False,
            "message": "start_date cannot be greater than end_date"
        }

    data = db.query(
        func.sum(SalesData.sales_amount).label("total_sales"),
        func.sum(SalesData.quantity_sold).label("total_quantity"),
        func.count(SalesData.id).label("total_records")
    ).filter(
        SalesData.uploaded_by == current_user.id,
        SalesData.date >= start_date,
        SalesData.date <= end_date
    ).first()

    return {
        "success": True,
        "start_date": start_date,
        "end_date": end_date,
        "total_sales": data.total_sales or 0,
        "total_quantity": data.total_quantity or 0,
        "total_records": data.total_records or 0
    }


@router.get("/filter")
def filter_analytics(
    category: str | None = None,
    region: str | None = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    query = db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id
    )

    if category:
        query = query.filter(SalesData.category.ilike(f"%{category}%"))

    if region:
        query = query.filter(SalesData.region.ilike(f"%{region}%"))

    total_sales = query.with_entities(
        func.sum(SalesData.sales_amount)
    ).scalar()

    total_quantity = query.with_entities(
        func.sum(SalesData.quantity_sold)
    ).scalar()

    return {
        "success": True,
        "total_sales": total_sales or 0,
        "total_quantity": total_quantity or 0
    }