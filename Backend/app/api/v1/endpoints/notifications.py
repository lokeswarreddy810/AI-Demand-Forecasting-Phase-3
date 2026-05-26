from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_notifications():

    return [
        {
            "id": 1,
            "message": "Dataset uploaded",
            "type": "Dataset"
        },
        {
            "id": 2,
            "message": "Forecast completed",
            "type": "Forecast"
        },
        {
            "id": 3,
            "message": "AI optimized",
            "type": "AI"
        }
    ]