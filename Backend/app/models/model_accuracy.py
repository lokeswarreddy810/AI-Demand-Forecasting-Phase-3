from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.core.database import Base


class ModelAccuracy(Base):
    __tablename__ = "model_accuracy"

    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String(100))
    accuracy = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)