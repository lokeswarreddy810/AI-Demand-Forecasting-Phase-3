from app.models.dataset import SalesData
from app.models.forecast import ForecastResult


def generate_business_insights(db, user_id):
    sales = db.query(SalesData).filter(
        SalesData.uploaded_by == user_id
    ).all()

    forecasts = db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == user_id
    ).all()

    insights = []

    if not sales:
        return [
            "No sales data available. Upload a dataset to generate insights."
        ]

    total_sales = sum(item.sales_amount for item in sales)
    total_quantity = sum(item.quantity_sold for item in sales)

    if total_sales > 1000000:
        insights.append(
            "Sales performance is strong. Total revenue has crossed ₹10,00,000."
        )
    else:
        insights.append(
            "Sales revenue is moderate. More marketing focus may improve growth."
        )

    product_sales = {}

    for item in sales:
        product_sales[item.product_name] = product_sales.get(
            item.product_name,
            0
        ) + item.sales_amount

    top_product = max(product_sales, key=product_sales.get)

    insights.append(
        f"{top_product} is the top performing product based on sales revenue."
    )

    if forecasts:
        high_demand = [
            item.product_name
            for item in forecasts
            if item.predicted_quantity >= 80
        ]

        if high_demand:
            insights.append(
                f"High demand expected for: {', '.join(set(high_demand))}."
            )
        else:
            insights.append(
                "Forecast demand is stable. No major demand spikes detected."
            )

    if total_quantity < 100:
        insights.append(
            "Overall quantity sold is low. Inventory planning should be reviewed."
        )
    else:
        insights.append(
            "Sales quantity trend looks healthy for current business scale."
        )

    return insights