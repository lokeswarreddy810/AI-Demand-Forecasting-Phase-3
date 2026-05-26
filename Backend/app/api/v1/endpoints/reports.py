from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.forecast import ForecastResult

from app.services.report_service import (
    generate_excel_report,
    generate_pdf_report,
    get_analytics_summary
)

from app.services.insight_service import generate_business_insights

router = APIRouter()


@router.get("/preview")
def report_preview(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    query = db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == current_user.id
    )

    total = query.count()

    reports = query.offset(
        (page - 1) * limit
    ).limit(limit).all()

    data = [
        {
            "id": item.id,
            "product_name": item.product_name,
            "forecast_date": str(item.forecast_date),
            "predicted_quantity": item.predicted_quantity
        }
        for item in reports
    ]

    return {
        "success": True,
        "message": "Reports fetched successfully",
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit,
        "data": data
    }


@router.get("/analytics-summary")
def analytics_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return {
        "success": True,
        "message": "Analytics summary fetched successfully",
        "data": get_analytics_summary(db, current_user.id)
    }


@router.get("/business-insights")
def business_insights(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    insights = generate_business_insights(
        db,
        current_user.id
    )

    return {
        "success": True,
        "insights": insights
    }


@router.get("/forecast-comparison")
def forecast_comparison_report(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    forecasts = db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == current_user.id
    ).all()

    result = {}

    for item in forecasts:
        if item.product_name not in result:
            result[item.product_name] = {
                "product_name": item.product_name,
                "total_predicted_quantity": 0,
                "forecast_count": 0
            }

        result[item.product_name]["total_predicted_quantity"] += (
            item.predicted_quantity
        )
        result[item.product_name]["forecast_count"] += 1

    return list(result.values())


@router.get("/export-excel")
def export_excel(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    forecasts = db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == current_user.id
    ).all()

    if not forecasts:
        raise HTTPException(
            status_code=404,
            detail="No forecast data available to export"
        )

    file_path = generate_excel_report(
        db,
        current_user.id
    )

    return FileResponse(
        file_path,
        filename="forecast_report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


@router.get("/export-pdf")
def export_pdf(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    forecasts = db.query(ForecastResult).filter(
        ForecastResult.uploaded_by == current_user.id
    ).all()

    if not forecasts:
        raise HTTPException(
            status_code=404,
            detail="No forecast data available to export"
        )

    file_path = generate_pdf_report(
        db,
        current_user.id
    )

    return FileResponse(
        file_path,
        filename="forecast_report.pdf",
        media_type="application/pdf"
    )