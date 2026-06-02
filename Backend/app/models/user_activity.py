from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.core.database import Base


class UserActivity(Base):
    __tablename__ = "user_activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    activity = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)