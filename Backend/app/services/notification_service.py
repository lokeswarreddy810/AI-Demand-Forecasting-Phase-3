from app.models.notification import Notification


def create_notification(
    db,
    user_id,
    message,
    type="info"
):

    notification = Notification(
        user_id=user_id,
        message=message,
        type=type
    )

    db.add(notification)

    db.commit()

    db.refresh(notification)

    return notification