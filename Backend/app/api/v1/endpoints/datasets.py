from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import pandas as pd

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.dataset import SalesData
from app.utils.activity_logger import log_activity

router = APIRouter()


@router.post("/upload")
def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        elif file.filename.endswith((".xlsx", ".xls")):
            df = pd.read_excel(file.file)
        else:
            raise HTTPException(
                status_code=400,
                detail="Only CSV or Excel files are allowed"
            )

        required_columns = [
            "date",
            "product_name",
            "category",
            "region",
            "quantity_sold",
            "sales_amount"
        ]

        for col in required_columns:
            if col not in df.columns:
                raise HTTPException(
                    status_code=400,
                    detail=f"Missing column: {col}"
                )

        for _, row in df.iterrows():
            data = SalesData(
                date=row["date"],
                product_name=row["product_name"],
                category=row["category"],
                region=row["region"],
                quantity_sold=int(row["quantity_sold"]),
                sales_amount=float(row["sales_amount"]),
                uploaded_by=current_user.id
            )

            db.add(data)

        db.commit()

        log_activity(
            db=db,
            user=current_user,
            activity=f"Dataset Uploaded - {len(df)} records uploaded"
        )

        return {
            "success": True,
            "message": f"Dataset uploaded successfully. {len(df)} records added."
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Dataset upload failed: {str(e)}"
        )


@router.get("/")
def get_datasets(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    records = db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id
    ).all()

    return [
        {
            "id": item.id,
            "date": str(item.date),
            "product_name": item.product_name,
            "category": item.category,
            "region": item.region,
            "quantity_sold": item.quantity_sold,
            "sales_amount": item.sales_amount
        }
        for item in records
    ]


@router.delete("/{dataset_id}")
def delete_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    record = db.query(SalesData).filter(
        SalesData.id == dataset_id,
        SalesData.uploaded_by == current_user.id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Dataset record not found"
        )

    db.delete(record)
    db.commit()

    return {
        "success": True,
        "message": "Dataset deleted successfully"
    }