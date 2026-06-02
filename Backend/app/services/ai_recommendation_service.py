from sqlalchemy import func
from app.models.dataset import SalesData


def get_product_demand_recommendations(db, user_id=None):
    query = db.query(
        SalesData.product_name,
        func.avg(SalesData.quantity_sold)
    )

    if user_id:
        query = query.filter(SalesData.uploaded_by == user_id)

    data = query.group_by(SalesData.product_name).all()

    result = []

    for product, avg_qty in data:
        avg_qty = float(avg_qty or 0)

        if avg_qty >= 100:
            recommendation = "High Demand Product"
        elif avg_qty >= 50:
            recommendation = "Medium Demand Product"
        else:
            recommendation = "Low Demand Product"

        result.append({
            "product_name": product,
            "average_quantity": round(avg_qty, 2),
            "recommendation": recommendation
        })

    return result


def get_customer_buying_behavior(db, user_id=None):
    top_products_query = db.query(
        SalesData.product_name,
        func.sum(SalesData.quantity_sold).label("total_quantity")
    )

    frequent_categories_query = db.query(
        SalesData.category,
        func.count(SalesData.id).label("purchase_count")
    )

    region_trends_query = db.query(
        SalesData.region,
        func.sum(SalesData.sales_amount).label("total_sales")
    )

    monthly_patterns_query = db.query(
        func.strftime("%Y-%m", SalesData.date).label("month"),
        func.sum(SalesData.quantity_sold).label("total_quantity"),
        func.sum(SalesData.sales_amount).label("total_sales")
    )

    if user_id:
        top_products_query = top_products_query.filter(
            SalesData.uploaded_by == user_id
        )

        frequent_categories_query = frequent_categories_query.filter(
            SalesData.uploaded_by == user_id
        )

        region_trends_query = region_trends_query.filter(
            SalesData.uploaded_by == user_id
        )

        monthly_patterns_query = monthly_patterns_query.filter(
            SalesData.uploaded_by == user_id
        )

    top_products = top_products_query.group_by(
        SalesData.product_name
    ).order_by(
        func.sum(SalesData.quantity_sold).desc()
    ).limit(5).all()

    frequent_categories = frequent_categories_query.group_by(
        SalesData.category
    ).order_by(
        func.count(SalesData.id).desc()
    ).all()

    region_trends = region_trends_query.group_by(
        SalesData.region
    ).order_by(
        func.sum(SalesData.sales_amount).desc()
    ).all()

    monthly_patterns = monthly_patterns_query.group_by(
        func.strftime("%Y-%m", SalesData.date)
    ).order_by(
        func.strftime("%Y-%m", SalesData.date)
    ).all()

    return {
        "top_purchased_products": [
            {
                "product_name": item.product_name,
                "total_quantity": int(item.total_quantity or 0)
            }
            for item in top_products
        ],
        "most_frequent_categories": [
            {
                "category": item.category,
                "purchase_count": int(item.purchase_count or 0)
            }
            for item in frequent_categories
        ],
        "region_wise_buying_trends": [
            {
                "region": item.region,
                "total_sales": float(item.total_sales or 0)
            }
            for item in region_trends
        ],
        "monthly_purchase_patterns": [
            {
                "month": item.month,
                "total_quantity": int(item.total_quantity or 0),
                "total_sales": float(item.total_sales or 0)
            }
            for item in monthly_patterns
        ]
    }


def get_demand_spikes(db, user_id=None):
    query = db.query(SalesData)

    if user_id:
        query = query.filter(SalesData.uploaded_by == user_id)

    data = query.all()

    result = []

    for item in data:
        if item.quantity_sold >= 200:
            result.append({
                "product_name": item.product_name,
                "quantity_sold": item.quantity_sold,
                "message": "Demand spike detected"
            })

    return result


def get_low_stock_predictions(db, user_id=None):
    query = db.query(
        SalesData.product_name,
        func.avg(SalesData.quantity_sold)
    )

    if user_id:
        query = query.filter(SalesData.uploaded_by == user_id)

    data = query.group_by(SalesData.product_name).all()

    result = []

    for product, avg_qty in data:
        avg_qty = float(avg_qty or 0)

        if avg_qty < 30:
            prediction = "High Low-Stock Risk"
        elif avg_qty < 70:
            prediction = "Medium Low-Stock Risk"
        else:
            prediction = "Low Low-Stock Risk"

        result.append({
            "product_name": product,
            "average_quantity": round(avg_qty, 2),
            "prediction": prediction
        })

    return result


def get_inventory_optimization(db, user_id=None):
    query = db.query(
        SalesData.product_name,
        func.avg(SalesData.quantity_sold)
    )

    if user_id:
        query = query.filter(SalesData.uploaded_by == user_id)

    data = query.group_by(SalesData.product_name).all()

    result = []

    for product, avg_qty in data:
        avg_qty = float(avg_qty or 0)

        if avg_qty >= 100:
            suggestion = "Increase inventory"
        elif avg_qty >= 50:
            suggestion = "Maintain current stock"
        else:
            suggestion = "Reduce overstock"

        result.append({
            "product_name": product,
            "average_quantity": round(avg_qty, 2),
            "optimization_suggestion": suggestion
        })

    return result