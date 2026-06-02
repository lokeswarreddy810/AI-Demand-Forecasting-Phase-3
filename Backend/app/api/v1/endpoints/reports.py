from fastapi import APIRouter, Depends, Query, HTTPException, Request
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.utils.rate_limiter import limiter
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.forecast_history import ForecastHistory

from app.services.report_service import (
    generate_excel_report,
    generate_pdf_report,
    get_analytics_summary,
    get_report_preview,
)

from app.services.insight_service import generate_business_insights
from app.services.alert_service import create_alert

router = APIRouter()


@router.get("/preview")
def report_preview(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    all_data = get_report_preview(db, current_user.id)

    total = len(all_data)
    start = (page - 1) * limit
    end = start + limit

    return {
        "success": True,
        "message": "Reports fetched successfully",
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit,
        "data": all_data[start:end],
    }


@router.get("/analytics-summary")
def analytics_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return {
        "success": True,
        "message": "Analytics summary fetched successfully",
        "data": get_analytics_summary(db, current_user.id),
    }


@router.get("/business-insights")
def business_insights(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    insights = generate_business_insights(db, current_user.id)

    return {
        "success": True,
        "insights": insights,
    }


@router.get("/forecast-comparison")
def forecast_comparison_report(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    forecasts = db.query(ForecastHistory).filter(
        ForecastHistory.user_id == current_user.id
    ).all()

    result = {}

    for item in forecasts:
        if item.product_name not in result:
            result[item.product_name] = {
                "product_name": item.product_name,
                "total_predicted_quantity": 0,
                "forecast_count": 0,
            }

        result[item.product_name]["total_predicted_quantity"] += (
            item.predicted_quantity or 0
        )
        result[item.product_name]["forecast_count"] += 1

    return list(result.values())


@router.get("/export-excel")
@limiter.limit("5/minute")
def export_excel(
    request: Request,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        forecasts = db.query(ForecastHistory).filter(
            ForecastHistory.user_id == current_user.id
        ).all()

        if not forecasts:
            create_alert(
                db=db,
                alert_type="Report Failure",
                message="Excel report generation failed: No forecast data available",
                email=getattr(current_user, "email", None),
            )

            raise HTTPException(
                status_code=404,
                detail="No forecast data available to export",
            )

        file_path = generate_excel_report(db, current_user.id)

        create_alert(
            db=db,
            alert_type="Report Completed",
            message="Excel report generated successfully",
            email=getattr(current_user, "email", None),
        )

        return FileResponse(
            path=file_path,
            filename="forecast_report.xlsx",
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()

        create_alert(
            db=db,
            alert_type="Report Failure",
            message=f"Excel report generation failed: {str(e)}",
            email=getattr(current_user, "email", None),
        )

        raise HTTPException(
            status_code=500,
            detail=f"Excel report generation failed: {str(e)}",
        )


@router.get("/export-pdf")
@limiter.limit("5/minute")
def export_pdf(
    request: Request,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        forecasts = db.query(ForecastHistory).filter(
            ForecastHistory.user_id == current_user.id
        ).all()

        if not forecasts:
            create_alert(
                db=db,
                alert_type="Report Failure",
                message="PDF report generation failed: No forecast data available",
                email=getattr(current_user, "email", None),
            )

            raise HTTPException(
                status_code=404,
                detail="No forecast data available to export",
            )

        file_path = generate_pdf_report(db, current_user.id)

        create_alert(
            db=db,
            alert_type="Report Completed",
            message="PDF report generated successfully",
            email=getattr(current_user, "email", None),
        )

        return FileResponse(
            path=file_path,
            filename="forecast_report.pdf",
            media_type="application/pdf",
        )

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()

        create_alert(
            db=db,
            alert_type="Report Failure",
            message=f"PDF report generation failed: {str(e)}",
            email=getattr(current_user, "email", None),
        )

        raise HTTPException(
            status_code=500,
            detail=f"PDF report generation failed: {str(e)}",
        )