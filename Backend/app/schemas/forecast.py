from pydantic import BaseModel
from datetime import date


class ForecastResponse(BaseModel):
    product_name: str
    forecast_date: date
    predicted_quantity: float

    class Config:
        from_attributes = True