from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.core.database import Base


class ForecastConfidence(Base):
    __tablename__ = "forecast_confidence"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(100))
    model_name = Column(String(100))
    confidence_score = Column(Float)
    forecast_date = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)