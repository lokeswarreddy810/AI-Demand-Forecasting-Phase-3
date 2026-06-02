from pydantic import BaseModel


class AutomationCreate(BaseModel):
    job_name: str
    interval_type: str = "daily"
    interval_value: int = 1