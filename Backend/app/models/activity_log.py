from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.core.database import Base


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    username = Column(String(100), default="Unknown")
    activity = Column(String(255), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)