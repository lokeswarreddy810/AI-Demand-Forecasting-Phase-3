import os
import pandas as pd
import asyncio

from fastapi import HTTPException
from app.utils.activity_logger import log_activity
from app.models.dataset import SalesData, Dataset
from app.services.notification_service import create_notification
from app.services.activity_log_service import create_activity_log
from app.websocket.manager import manager
from app.core.cache import clear_cache


UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def upload_dataset_service(file, db, user_id):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file_path)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file_path)
        else:
            raise HTTPException(
                status_code=400,
                detail="Only CSV and Excel files are allowed"
            )
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid dataset file"
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

    df = df.dropna(subset=[
        "date",
        "product_name",
        "category",
        "region",
        "quantity_sold",
        "sales_amount"
    ])

    if df.empty:
        raise HTTPException(
            status_code=400,
            detail="Dataset file has no valid rows"
        )

    dataset = Dataset(
        file_name=file.filename,
        uploaded_by=user_id,
        total_records=len(df),
        status="uploaded"
    )

    db.add(dataset)
    db.commit()
    db.refresh(dataset)

    inserted_count = 0

    try:
        for _, row in df.iterrows():

            sales = SalesData(
                dataset_id=dataset.id,
                date=pd.to_datetime(row["date"]).date(),
                product_name=str(row["product_name"]),
                category=str(row["category"]),
                region=str(row["region"]),
                quantity_sold=int(float(row["quantity_sold"])),
                sales_amount=float(row["sales_amount"]),
                uploaded_by=user_id
            )

            db.add(sales)
            inserted_count += 1

        db.commit()

        create_notification(
            db=db,
            user_id=user_id,
            message="Dataset uploaded successfully",
            type="upload"
        )

        create_activity_log(
            db=db,
            user_id=user_id,
            activity="Dataset Uploaded",
            details=f"{inserted_count} records uploaded"
        )

        try:
            asyncio.run(
                manager.broadcast({
                    "type": "dataset_upload",
                    "message": "Dataset uploaded successfully",
                    "records_inserted": inserted_count
                    })
                    )
        except RuntimeError:
            pass

        clear_cache()
        log_activity(db, user_id=user_id, activity="Dataset Uploaded")

        return {
            "success": True,
            "message": "Dataset uploaded successfully",
            "dataset_id": dataset.id,
            "records_inserted": inserted_count
        }

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Dataset upload failed: {str(e)}"
        )
    
