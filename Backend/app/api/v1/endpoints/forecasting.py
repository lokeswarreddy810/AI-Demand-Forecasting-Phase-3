from fastapi import (
    APIRouter,
    Depends,
    Query,
    HTTPException,
    Request
)
from sqlalchemy.orm import Session

from app.utils.rate_limiter import limiter
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.forecast_history import ForecastHistory
from app.services.forecasting_service import generate_forecast_service
from app.utils.activity_logger import log_activity
from app.services.alert_service import create_alert

router = APIRouter()


@router.post("/generate")
@limiter.limit("5/minute")
def generate_forecast(
    request: Request,
    days: int = Query(7, ge=1, le=365),
    model: str = Query("linear_regression"),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        result = generate_forecast_service(
            db=db,
            user_id=current_user.id,
            days=days,
            selected_model=model,
        )

        log_activity(
            db=db,
            user=current_user,
            activity=f"Forecast Generated using {model}",
        )

        create_alert(
            db=db,
            alert_type="Forecast Generated",
            message=f"Forecast generated successfully using {model}",
            email=getattr(current_user, "email", None),
        )

        return result

    except Exception as e:
        db.rollback()

        create_alert(
            db=db,
            alert_type="Forecast Failure",
            message=f"Forecast generation failed using {model}: {str(e)}",
            email=getattr(current_user, "email", None),
        )

        raise HTTPException(
            status_code=500,
            detail=f"Forecast generation failed: {str(e)}",
        )


@router.get("/history")
def forecast_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        records = db.query(ForecastHistory).filter(
            ForecastHistory.user_id == current_user.id
        ).order_by(
            ForecastHistory.created_at.desc()
        ).all()

        return [
            {
                "id": item.id,
                "product_name": item.product_name,
                "forecast_date": str(item.forecast_date),
                "predicted_quantity": float(item.predicted_quantity or 0),
                "predicted_revenue": float(item.predicted_revenue or 0),
                "accuracy": float(item.accuracy or 0),
                "model_used": item.model_used or "linear_regression",
                "inventory_recommendation": item.inventory_recommendation
                or "No recommendation",
                "created_at": str(item.created_at),
            }
            for item in records
        ]

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch forecast history: {str(e)}",
        )


@router.get("/{forecast_id}")
def get_forecast_by_id(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        item = db.query(ForecastHistory).filter(
            ForecastHistory.id == forecast_id,
            ForecastHistory.user_id == current_user.id,
        ).first()

        if not item:
            raise HTTPException(
                status_code=404,
                detail="Forecast not found"
            )

        return {
            "id": item.id,
            "product_name": item.product_name,
            "forecast_date": str(item.forecast_date),
            "predicted_quantity": float(item.predicted_quantity or 0),
            "predicted_revenue": float(item.predicted_revenue or 0),
            "accuracy": float(item.accuracy or 0),
            "model_used": item.model_used or "linear_regression",
            "inventory_recommendation": item.inventory_recommendation
            or "No recommendation",
            "created_at": str(item.created_at),
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch forecast: {str(e)}",
        )