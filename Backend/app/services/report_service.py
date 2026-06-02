import os
import pandas as pd
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

from app.models.forecast_history import ForecastHistory
from app.models.dataset import SalesData


REPORT_DIR = "reports"
os.makedirs(REPORT_DIR, exist_ok=True)


def get_report_preview(db, user_id):
    forecasts = db.query(ForecastHistory).filter(
        ForecastHistory.user_id == user_id
    ).order_by(
        ForecastHistory.created_at.desc()
    ).all()

    return [
        {
            "product_name": item.product_name,
            "forecast_date": str(item.forecast_date),
            "predicted_quantity": item.predicted_quantity,
            "predicted_revenue": item.predicted_revenue,
            "accuracy": item.accuracy,
            "model_used": item.model_used,
            "inventory_recommendation": item.inventory_recommendation,
            "created_at": str(item.created_at),
        }
        for item in forecasts
    ]


def get_analytics_summary(db, user_id):
    sales = db.query(SalesData).filter(
        SalesData.uploaded_by == user_id
    ).all()

    total_sales = sum(item.sales_amount or 0 for item in sales)
    total_quantity = sum(item.quantity_sold or 0 for item in sales)
    total_products = len(set(item.product_name for item in sales))

    forecasts = db.query(ForecastHistory).filter(
        ForecastHistory.user_id == user_id
    ).all()

    accuracies = [
        item.accuracy for item in forecasts
        if item.accuracy is not None
    ]

    avg_accuracy = (
        round(sum(accuracies) / len(accuracies), 2)
        if accuracies
        else 0
    )

    return {
        "total_sales": total_sales,
        "total_quantity": total_quantity,
        "total_products": total_products,
        "forecast_accuracy": f"{avg_accuracy}%",
        "total_forecasts": len(forecasts),
    }


def generate_excel_report(db, user_id):
    preview = get_report_preview(db, user_id)
    summary = get_analytics_summary(db, user_id)

    if not preview:
        raise ValueError("No forecast data available to export")

    file_path = os.path.join(REPORT_DIR, f"forecast_report_user_{user_id}.xlsx")

    with pd.ExcelWriter(file_path, engine="openpyxl") as writer:
        pd.DataFrame([summary]).to_excel(
            writer,
            sheet_name="Analytics Summary",
            index=False
        )

        pd.DataFrame(preview).to_excel(
            writer,
            sheet_name="Forecast Report",
            index=False
        )

    return file_path


def generate_pdf_report(db, user_id):
    preview = get_report_preview(db, user_id)
    summary = get_analytics_summary(db, user_id)

    if not preview:
        raise ValueError("No forecast data available to export")

    file_path = os.path.join(REPORT_DIR, f"forecast_report_user_{user_id}.pdf")

    pdf = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    y = height - 50

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(50, y, "Advanced AI Demand Forecasting Report")

    y -= 40

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Analytics Summary")

    y -= 25

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, y, f"Total Sales: Rs. {summary['total_sales']}")
    y -= 20
    pdf.drawString(50, y, f"Total Quantity: {summary['total_quantity']}")
    y -= 20
    pdf.drawString(50, y, f"Total Products: {summary['total_products']}")
    y -= 20
    pdf.drawString(50, y, f"Forecast Accuracy: {summary['forecast_accuracy']}")
    y -= 20
    pdf.drawString(50, y, f"Total Forecasts: {summary['total_forecasts']}")

    y -= 40

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Forecast Details")

    y -= 25

    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(40, y, "Product")
    pdf.drawString(150, y, "Date")
    pdf.drawString(250, y, "Qty")
    pdf.drawString(320, y, "Revenue")
    pdf.drawString(410, y, "Accuracy")
    pdf.drawString(480, y, "Model")

    y -= 20
    pdf.setFont("Helvetica", 9)

    for item in preview:
        if y < 60:
            pdf.showPage()
            y = height - 50
            pdf.setFont("Helvetica", 9)

        pdf.drawString(40, y, str(item["product_name"])[:18])
        pdf.drawString(150, y, str(item["forecast_date"])[:12])
        pdf.drawString(250, y, str(item["predicted_quantity"]))
        pdf.drawString(320, y, str(item["predicted_revenue"]))
        pdf.drawString(410, y, str(item["accuracy"]))
        pdf.drawString(480, y, str(item["model_used"])[:14])

        y -= 18

    pdf.save()

    return file_path