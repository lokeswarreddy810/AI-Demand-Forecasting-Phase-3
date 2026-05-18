from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from datetime import datetime

from app.core.database import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String(255))
    uploaded_by = Column(Integer)
    total_records = Column(Integer, default=0)
    status = Column(String(50), default="uploaded")
    created_at = Column(DateTime, default=datetime.utcnow)


class SalesData(Base):
    __tablename__ = "sales_data"

    id = Column(Integer, primary_key=True, index=True)

    dataset_id = Column(Integer, ForeignKey("datasets.id"), nullable=True)

    date = Column(Date)
    product_name = Column(String(255), index=True)
    category = Column(String(100), index=True)
    region = Column(String(100), index=True)
    quantity_sold = Column(Integer)
    sales_amount = Column(Float)
    uploaded_by = Column(Integer, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)