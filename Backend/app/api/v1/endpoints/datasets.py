from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException,
    Request
)
from sqlalchemy.orm import Session
import pandas as pd
import io

from app.utils.rate_limiter import limiter
from app.models.alert import Alert
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.dataset import SalesData
from app.utils.file_validator import (
    validate_upload_file,
    validate_file_size
)
from app.services.audit_service import create_audit_log

router = APIRouter()


@router.post("/upload")
@limiter.limit("10/minute")
def upload_dataset(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        validate_upload_file(file)

        file_content = file.file.read()
        validate_file_size(file_content)

        if file.filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(file_content))

        elif file.filename.endswith((".xlsx", ".xls")):
            df = pd.read_excel(io.BytesIO(file_content))

        else:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type"
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

        alert = Alert(
            alert_type="Dataset Upload",
            message=f"Dataset uploaded successfully with {len(df)} records",
            threshold_value=0,
            is_read=False
        )

        db.add(alert)
        db.commit()

        create_audit_log(
            db=db,
            admin_user=getattr(current_user, "email", "User"),
            action=f"Uploaded dataset with {len(df)} records",
            module="Datasets"
        )

        return {
            "success": True,
            "message": f"Dataset uploaded successfully. {len(df)} records added."
        }

    except HTTPException:
        db.rollback()
        raise

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


@router.get("/database")
def get_database(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    records = db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id
    ).all()

    return {
        "total_records": len(records),
        "data": [
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
    }


@router.delete("/database")
def delete_database(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted_count = db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id
    ).count()

    db.query(SalesData).filter(
        SalesData.uploaded_by == current_user.id
    ).delete()

    db.commit()

    return {
        "message": "Database records deleted successfully",
        "deleted_records": deleted_count
    }