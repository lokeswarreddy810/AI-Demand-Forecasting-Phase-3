from sqlalchemy import func

from app.models.dataset import SalesData


def get_summary(db, user_id):
    total_sales = db.query(
        func.sum(SalesData.sales_amount)
    ).filter(
        SalesData.uploaded_by == user_id
    ).scalar() or 0

    total_products = db.query(
        func.count(func.distinct(SalesData.product_name))
    ).filter(
        SalesData.uploaded_by == user_id
    ).scalar() or 0

    total_quantity = db.query(
        func.sum(SalesData.quantity_sold)
    ).filter(
        SalesData.uploaded_by == user_id
    ).scalar() or 0

    return {
        "total_sales": total_sales,
        "total_products": total_products,
        "total_quantity": total_quantity,
        "forecast_accuracy": "92%"
    }


def get_monthly_sales(db, user_id):
    data = db.query(
        func.date_format(
            SalesData.date,
            "%Y-%m"
        ).label("month"),

        func.sum(
            SalesData.sales_amount
        ).label("sales")

    ).filter(
        SalesData.uploaded_by == user_id
    ).group_by(
        "month"
    ).all()

    return [
        {
            "month": row.month,
            "sales": row.sales
        }
        for row in data
    ]


def get_top_products(db, user_id):
    data = db.query(
        SalesData.product_name,

        func.sum(
            SalesData.quantity_sold
        ).label("quantity")

    ).filter(
        SalesData.uploaded_by == user_id
    ).group_by(
        SalesData.product_name
    ).order_by(
        func.sum(
            SalesData.quantity_sold
        ).desc()
    ).limit(5).all()

    return [
        {
            "product_name": row.product_name,
            "quantity": row.quantity
        }
        for row in data
    ]