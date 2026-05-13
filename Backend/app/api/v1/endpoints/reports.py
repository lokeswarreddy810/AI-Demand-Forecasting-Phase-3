from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.services.report_service import generate_excel_report, generate_pdf_report

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/export-excel")
def export_excel(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    file_path = generate_excel_report(db, current_user.id)
    return FileResponse(file_path, filename="forecast_report.xlsx")


@router.get("/export-pdf")
def export_pdf(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    file_path = generate_pdf_report(db, current_user.id)
    return FileResponse(file_path, filename="forecast_report.pdf")