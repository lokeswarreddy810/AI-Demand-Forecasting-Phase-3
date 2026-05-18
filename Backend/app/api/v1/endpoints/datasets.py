from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
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
    if not file.filename.endswith((".csv", ".xlsx")):
        raise HTTPException(
            status_code=400,
            detail="Only CSV and Excel files are allowed"
        )

    return upload_dataset_service(file, db, current_user.id)


@router.get("/")
def get_datasets(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    product: str | None = None,
    category: str | None = None,
    region: str | None = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    query = db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id
    )

    if product:
        query = query.filter(SalesData.product_name.ilike(f"%{product}%"))

    if category:
        query = query.filter(SalesData.category.ilike(f"%{category}%"))

    if region:
        query = query.filter(SalesData.region.ilike(f"%{region}%"))

    total = query.count()

    data = query.offset((page - 1) * limit).limit(limit).all()

    return {
        "success": True,
        "message": "Datasets fetched successfully",
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit,
        "data": data
    }


@router.get("/search")
def search_datasets(
    keyword: str = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    data = db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id,
        SalesData.product_name.ilike(f"%{keyword}%")
    ).all()

    return {
        "success": True,
        "message": "Search completed",
        "data": data
    }