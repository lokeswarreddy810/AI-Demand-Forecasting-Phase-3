import os
import pandas as pd

from app.models.forecast import ForecastResult
from app.models.report import Report
from app.utils.pdf_generator import create_pdf

REPORT_DIR = "app/reports"
os.makedirs(REPORT_DIR, exist_ok=True)


def generate_excel_report(db, user_id):
    results = db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == user_id
    ).all()

    data = []

    for item in results:
        data.append({
            "Product Name": item.product_name,
            "Forecast Date": item.forecast_date,
            "Predicted Quantity": item.predicted_quantity
        })

    file_path = os.path.join(REPORT_DIR, "forecast_report.xlsx")
    df = pd.DataFrame(data)
    df.to_excel(file_path, index=False)

    report = Report(
        report_type="Excel",
        file_path=file_path,
        generated_by=user_id
    )

    db.add(report)
    db.commit()

    return file_path


def generate_pdf_report(db, user_id):
    results = db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == user_id
    ).all()

    data = []

    for item in results:
        data.append({
            "Product Name": item.product_name,
            "Forecast Date": item.forecast_date,
            "Predicted Quantity": item.predicted_quantity
        })

    file_path = os.path.join(REPORT_DIR, "forecast_report.pdf")
    create_pdf(file_path, data)

    report = Report(
        report_type="PDF",
        file_path=file_path,
        generated_by=user_id
    )

    db.add(report)
    db.commit()

    return file_path