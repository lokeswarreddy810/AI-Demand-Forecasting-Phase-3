from fastapi import HTTPException
from app.ml.preprocessing import clean_uploaded_file
from app.models.dataset import SalesData


def upload_dataset_service(file, db, user_id):
    if not file.filename.endswith((".csv", ".xlsx")):
        raise HTTPException(status_code=400, detail="Only CSV and Excel files allowed")

    df, error = clean_uploaded_file(file)

    if error:
        raise HTTPException(status_code=400, detail=error)

    for _, row in df.iterrows():
        sales = SalesData(
            date=row["date"],
            product_name=row["product_name"],
            category=row["category"],
            quantity_sold=row["quantity_sold"],
            sales_amount=row["sales_amount"],
            uploaded_by=user_id
        )
        db.add(sales)

    db.commit()

    return {
        "message": "Dataset uploaded successfully",
        "records_inserted": len(df)
    }