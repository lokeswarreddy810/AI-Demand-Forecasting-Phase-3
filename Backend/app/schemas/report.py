from pydantic import BaseModel


class ReportResponse(BaseModel):
    report_type: str
    file_path: str