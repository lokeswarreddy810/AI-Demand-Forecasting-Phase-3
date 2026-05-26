from app.models.activity_log import ActivityLog


def create_activity_log(
    db,
    user_id=None,
    username="Unknown",
    activity="Activity recorded",
    details=None,
    module=None,
    action=None
):
    final_activity = activity

    if action:
        final_activity = action

    if details:
        final_activity = f"{final_activity} - {details}"

    log = ActivityLog(
        user_id=user_id,
        username=username,
        activity=final_activity
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return log