from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.models.dataset import SalesData

router = APIRouter()


@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    total_sales = db.query(func.sum(SalesData.sales_amount)).scalar() or 0
    total_quantity = db.query(func.sum(SalesData.quantity_sold)).scalar() or 0
    total_products = db.query(
        func.count(func.distinct(SalesData.product_name))
    ).scalar() or 0

    return {
        "total_sales": round(total_sales, 2),
        "total_quantity": total_quantity,
        "total_products": total_products,
    }


@router.get("/monthly-sales")
def monthly_sales(db: Session = Depends(get_db)):
    data = db.query(
        SalesData.date,
        func.sum(SalesData.sales_amount).label("total_sales"),
    ).group_by(SalesData.date).all()

    return [
        {
            "month": str(item[0]),
            "total_sales": round(item[1] or 0, 2),
        }
        for item in data
    ]


@router.get("/top-products")
def top_products(db: Session = Depends(get_db)):
    data = db.query(
        SalesData.product_name,
        func.sum(SalesData.sales_amount).label("total_sales"),
    ).group_by(SalesData.product_name).all()

    return [
        {
            "product_name": item[0],
            "total_sales": round(item[1] or 0, 2),
        }
        for item in data
    ]


@router.get("/category-sales")
def category_sales(db: Session = Depends(get_db)):
    data = db.query(
        SalesData.category,
        func.sum(SalesData.sales_amount).label("total_sales"),
    ).group_by(SalesData.category).all()

    return [
        {
            "category": item[0],
            "total_sales": round(item[1] or 0, 2),
        }
        for item in data
    ]


@router.get("/region-sales")
def region_sales(db: Session = Depends(get_db)):
    data = db.query(
        SalesData.region,
        func.sum(SalesData.sales_amount).label("total_sales"),
    ).group_by(SalesData.region).all()

    return [
        {
            "region": item[0],
            "total_sales": round(item[1] or 0, 2),
        }
        for item in data
    ]


@router.get("/revenue-prediction")
def revenue_prediction(db: Session = Depends(get_db)):
    data = db.query(
        SalesData.product_name,
        func.avg(SalesData.sales_amount).label("avg_sales"),
        func.avg(SalesData.quantity_sold).label("avg_quantity"),
    ).group_by(SalesData.product_name).all()

    result = []

    for product, avg_sales, avg_quantity in data:
        avg_sales = float(avg_sales or 0)
        avg_quantity = float(avg_quantity or 0)

        predicted_quantity = avg_quantity + 10
        predicted_revenue = predicted_quantity * (
            avg_sales / avg_quantity if avg_quantity > 0 else 0
        )

        result.append(
            {
                "product_name": product,
                "predicted_quantity": round(predicted_quantity, 2),
                "predicted_revenue": round(predicted_revenue, 2),
            }
        )

    return result


@router.get("/inventory-risk")
def inventory_risk(db: Session = Depends(get_db)):
    data = db.query(
        SalesData.product_name,
        func.avg(SalesData.quantity_sold).label("avg_quantity"),
    ).group_by(SalesData.product_name).all()

    result = []

    for product, avg_quantity in data:
        avg_quantity = float(avg_quantity or 0)

        if avg_quantity >= 100:
            risk = "High Demand - Restock Required"
        elif avg_quantity >= 50:
            risk = "Medium Risk - Maintain Stock"
        elif avg_quantity >= 20:
            risk = "Low Risk - Safe Inventory"
        else:
            risk = "Overstock Risk - Low Demand"

        result.append(
            {
                "product_name": product,
                "average_quantity": round(avg_quantity, 2),
                "inventory_risk": risk,
            }
        )

    return result