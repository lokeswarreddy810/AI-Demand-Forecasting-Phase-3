from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.core.database import Base


class AdminAuditLog(Base):
    __tablename__ = "admin_audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    admin_user = Column(String(100))
    action = Column(String(255))
    module = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)