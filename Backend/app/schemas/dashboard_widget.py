from pydantic import BaseModel


class DashboardWidgetCreate(BaseModel):
    widget_name: str
    widget_type: str