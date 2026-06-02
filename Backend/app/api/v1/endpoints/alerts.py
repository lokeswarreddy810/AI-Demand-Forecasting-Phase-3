from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.alert import Alert
from app.utils.email_sender import send_email

router = APIRouter()

email_alert_settings = {
    "email_notifications": True,
    "forecast_failure_alerts": True,
    "report_completion_alerts": True,
    "threshold_alerts": True,
    "low_stock_alerts": True,
    "demand_spike_alerts": True,
}


@router.post("/create")
def create_alert(
    alert_type: str,
    message: str,
    threshold_value: int = 0,
    db: Session = Depends(get_db)
):
    alert = Alert(
        alert_type=alert_type,
        message=message,
        threshold_value=threshold_value,
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return {
        "message": "Alert created successfully",
        "data": {
            "id": alert.id,
            "alert_type": alert.alert_type,
            "message": alert.message,
            "threshold_value": alert.threshold_value,
        },
    }


@router.get("/")
def get_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).order_by(Alert.created_at.desc()).all()

    return [
        {
            "id": alert.id,
            "alert_type": alert.alert_type,
            "message": alert.message,
            "threshold_value": alert.threshold_value,
            "is_read": alert.is_read,
            "created_at": alert.created_at,
        }
        for alert in alerts
    ]


@router.patch("/mark-read/{alert_id}")
def mark_read(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()

    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    alert.is_read = True
    db.commit()

    return {"message": "Alert marked as read"}


@router.post("/threshold-alert")
def threshold_alert(
    product_name: str,
    threshold_value: int,
    db: Session = Depends(get_db)
):
    if not email_alert_settings["threshold_alerts"]:
        return {"message": "Threshold alerts are disabled"}

    alert = Alert(
        alert_type="Threshold Alert",
        message=f"{product_name} reached threshold value {threshold_value}",
        threshold_value=threshold_value,
    )

    db.add(alert)
    db.commit()

    return {
        "message": "Threshold-based alert created",
        "product_name": product_name,
        "threshold_value": threshold_value,
    }


@router.post("/low-stock")
def low_stock_alert(
    product_name: str,
    current_stock: int,
    minimum_stock: int,
    db: Session = Depends(get_db)
):
    if not email_alert_settings["low_stock_alerts"]:
        return {"message": "Low stock alerts are disabled"}

    if current_stock > minimum_stock:
        return {"message": "Stock level is normal"}

    alert = Alert(
        alert_type="Low Stock Alert",
        message=f"{product_name} stock is low. Current stock: {current_stock}, Minimum stock: {minimum_stock}",
        threshold_value=minimum_stock,
    )

    db.add(alert)
    db.commit()

    return {
        "message": "Low stock alert created",
        "product_name": product_name,
        "current_stock": current_stock,
        "minimum_stock": minimum_stock,
    }


@router.post("/demand-spike")
def demand_spike_alert(
    product_name: str,
    predicted_demand: int,
    normal_demand: int,
    db: Session = Depends(get_db)
):
    if not email_alert_settings["demand_spike_alerts"]:
        return {"message": "Demand spike alerts are disabled"}

    if predicted_demand <= normal_demand:
        return {"message": "No demand spike detected"}

    alert = Alert(
        alert_type="Demand Spike Alert",
        message=f"Demand spike detected for {product_name}. Predicted demand: {predicted_demand}, Normal demand: {normal_demand}",
        threshold_value=predicted_demand,
    )

    db.add(alert)
    db.commit()

    return {
        "message": "Demand spike alert created",
        "product_name": product_name,
        "predicted_demand": predicted_demand,
        "normal_demand": normal_demand,
    }


@router.post("/forecast-failure")
def forecast_failure_alert(
    error_message: str = "Forecast generation failed",
    db: Session = Depends(get_db)
):
    if not email_alert_settings["forecast_failure_alerts"]:
        return {"message": "Forecast failure alerts are disabled"}

    alert = Alert(
        alert_type="Forecast Failure",
        message=error_message,
        threshold_value=0,
    )

    db.add(alert)
    db.commit()

    return {
        "message": "Forecast failure notification generated",
        "error": error_message,
    }


@router.post("/report-completion")
def report_completion_alert(
    report_name: str = "Forecast Report",
    db: Session = Depends(get_db)
):
    if not email_alert_settings["report_completion_alerts"]:
        return {"message": "Report completion alerts are disabled"}

    alert = Alert(
        alert_type="Report Completion",
        message=f"{report_name} generated successfully",
        threshold_value=0,
    )

    db.add(alert)
    db.commit()

    return {
        "message": "Report completion alert generated",
        "report_name": report_name,
    }


@router.get("/settings")
def get_alert_settings():
    return email_alert_settings


@router.patch("/settings")
def update_alert_settings(
    email_notifications: bool,
    forecast_failure_alerts: bool,
    report_completion_alerts: bool,
    threshold_alerts: bool,
    low_stock_alerts: bool,
    demand_spike_alerts: bool,
):
    email_alert_settings["email_notifications"] = email_notifications
    email_alert_settings["forecast_failure_alerts"] = forecast_failure_alerts
    email_alert_settings["report_completion_alerts"] = report_completion_alerts
    email_alert_settings["threshold_alerts"] = threshold_alerts
    email_alert_settings["low_stock_alerts"] = low_stock_alerts
    email_alert_settings["demand_spike_alerts"] = demand_spike_alerts

    return {
        "message": "Alert settings updated successfully",
        "settings": email_alert_settings,
    }


@router.post("/send-email")
def send_email_notification(
    to_email: str,
    subject: str,
    body: str,
):
    if not email_alert_settings["email_notifications"]:
        return {"message": "Email notifications are disabled"}

    result = send_email(
        to_email=to_email,
        subject=subject,
        body=body,
    )

    return result