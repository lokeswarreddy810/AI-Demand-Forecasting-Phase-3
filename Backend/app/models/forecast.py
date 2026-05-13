from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from app.core.database import Base


class ForecastResult(Base):
    __tablename__ = "forecast_results"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(100), nullable=False)
    forecast_date = Column(Date, nullable=False)
    predicted_quantity = Column(Float, nullable=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"))