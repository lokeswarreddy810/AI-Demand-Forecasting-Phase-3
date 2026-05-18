from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.forecast import ForecastResult
from app.services.report_service import (
    generate_excel_report,
    generate_pdf_report,
    get_report_preview,
    get_analytics_summary
)

router = APIRouter(prefix="/reports", tags=["Reports"])


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

    reports = query.offset((page - 1) * limit).limit(limit).all()

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


@router.get("/export-excel")
def export_excel(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    preview = get_report_preview(db, current_user.id)

    if not preview:
        raise HTTPException(
            status_code=404,
            detail="No forecast data available to export"
        )

    file_path = generate_excel_report(db, current_user.id)

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
    preview = get_report_preview(db, current_user.id)

    if not preview:
        raise HTTPException(
            status_code=404,
            detail="No forecast data available to export"
        )

    file_path = generate_pdf_report(db, current_user.id)

    return FileResponse(
        file_path,
        filename="forecast_report.pdf",
        media_type="application/pdf"
    )