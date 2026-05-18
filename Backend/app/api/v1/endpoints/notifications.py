from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.core.dependencies import (
    get_current_user
)

from app.models.notification import Notification

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get("/")
def get_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    notifications = db.query(
        Notification
    ).filter(
        Notification.user_id == current_user.id
    ).order_by(
        Notification.created_at.desc()
    ).all()

    return notifications


@router.put("/read/{notification_id}")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    notification = db.query(
        Notification
    ).filter(
        Notification.id == notification_id
    ).first()

    if notification:

        notification.is_read = True

        db.commit()

    return {
        "message": "Notification updated"
    }