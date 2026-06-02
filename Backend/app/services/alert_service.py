from app.models.alert import Alert
from app.utils.email_sender import send_email


def create_alert(
    db,
    alert_type: str,
    message: str,
    email: str = None
):
    alert = Alert(
        alert_type=alert_type,
        message=message,
        threshold_value=0,
        is_read=False
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    if email:
        send_email(
            to_email=email,
            subject=alert_type,
            body=message
        )

    return alert