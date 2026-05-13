from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from app.core.database import Base


class SalesData(Base):
    __tablename__ = "sales_data"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    product_name = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    quantity_sold = Column(Integer, nullable=False)
    sales_amount = Column(Float, nullable=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"))