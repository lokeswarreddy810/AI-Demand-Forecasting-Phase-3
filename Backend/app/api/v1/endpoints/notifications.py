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
        },

        # Phase 4 Notifications

        {
            "id": 4,
            "message": "Forecast generation failed",
            "type": "Forecast Failure"
        },
        {
            "id": 5,
            "message": "Report generated successfully",
            "type": "Report Completion"
        },
        {
            "id": 6,
            "message": "Low stock alert triggered",
            "type": "Inventory Alert"
        },
        {
            "id": 7,
            "message": "Demand spike detected",
            "type": "Demand Alert"
        },
        {
            "id": 8,
            "message": "Threshold limit exceeded",
            "type": "Threshold Alert"
        },
        {
            "id": 9,
            "message": "Email notification sent",
            "type": "Email"
        }
    ]