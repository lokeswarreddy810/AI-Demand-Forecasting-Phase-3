from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.dataset import SalesData
from app.services.dataset_service import upload_dataset_service

router = APIRouter(prefix="/dataset", tags=["Dataset"])


@router.post("/upload")
def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return upload_dataset_service(file, db, current_user.id)


@router.get("/")
def get_dataset(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id
    ).all()