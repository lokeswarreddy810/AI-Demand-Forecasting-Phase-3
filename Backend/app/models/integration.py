from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime

from app.core.database import Base


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True, index=True)
    integration_name = Column(String(100), nullable=False)
    integration_type = Column(String(100), nullable=False)
    api_url = Column(String(255), nullable=False)
    status = Column(String(50), default="Active")
    is_enabled = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)