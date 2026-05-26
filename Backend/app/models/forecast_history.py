from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.core.database import Base


class ForecastHistory(Base):
    __tablename__ = "forecast_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    product_name = Column(String(100))
    forecast_date = Column(String(50))
    predicted_quantity = Column(Float)
    predicted_revenue = Column(Float)
    accuracy = Column(Float)
    model_used = Column(String(100))
    inventory_recommendation = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)