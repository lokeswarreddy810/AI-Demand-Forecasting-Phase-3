from pydantic import BaseModel


class AlertCreate(BaseModel):
    alert_type: str
    message: str
    threshold_value: int = 0