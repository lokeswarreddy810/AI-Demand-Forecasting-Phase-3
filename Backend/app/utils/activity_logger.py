from app.models.activity_log import ActivityLog


def log_activity(
    db,
    user=None,
    user_id=None,
    username="Unknown",
    activity="Activity recorded"
):

    if user:
        user_id = getattr(user, "id", None)

        username = (
            getattr(user, "name", None)
            or getattr(user, "email", None)
            or "Unknown"
        )

    log = ActivityLog(
        user_id=user_id,
        username=username,
        activity=activity
    )

    db.add(log)
    db.commit()