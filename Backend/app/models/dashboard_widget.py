from sqlalchemy import Column, Integer, String, Boolean

from app.core.database import Base


class DashboardWidget(Base):
    __tablename__ = "dashboard_widgets"

    id = Column(Integer, primary_key=True, index=True)
    widget_name = Column(String(100), nullable=False)
    widget_type = Column(String(100), nullable=False)
    is_visible = Column(Boolean, default=True)