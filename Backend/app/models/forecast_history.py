from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from datetime import datetime

from app.core.database import Base


class ForecastHistory(Base):

    __tablename__ = "forecast_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(Integer)

    product_name = Column(
        String(255)
    )

    model_used = Column(
        String(255)
    )

    accuracy = Column(Float)

    forecast_date = Column(
        String(100)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )