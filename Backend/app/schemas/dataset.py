from pydantic import BaseModel
from datetime import date


class DatasetResponse(BaseModel):
    id: int
    date: date
    product_name: str
    category: str
    quantity_sold: int
    sales_amount: float

    class Config:
        from_attributes = True