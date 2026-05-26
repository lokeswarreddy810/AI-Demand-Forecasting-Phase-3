from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.activity_log import ActivityLog

router = APIRouter()


@router.get("/logs")
def get_activity_logs(db: Session = Depends(get_db)):
    logs = db.query(ActivityLog).order_by(
        ActivityLog.timestamp.desc()
    ).all()

    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "username": log.username,
            "activity": log.activity,
            "timestamp": log.timestamp
        }
        for log in logs
    ]