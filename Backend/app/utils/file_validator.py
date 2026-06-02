from fastapi import HTTPException

ALLOWED_EXTENSIONS = ["csv", "xlsx", "xls"]
MAX_FILE_SIZE = 10 * 1024 * 1024


def validate_upload_file(file):
    filename = file.filename

    if "." not in filename:
        raise HTTPException(
            status_code=400,
            detail="Invalid file name"
        )

    extension = filename.split(".")[-1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only CSV and Excel files are allowed"
        )


def validate_file_size(file_content):
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size should be less than 10 MB"
        )