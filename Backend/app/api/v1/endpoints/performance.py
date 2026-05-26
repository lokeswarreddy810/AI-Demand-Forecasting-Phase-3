import psutil

from fastapi import APIRouter, Depends

from app.core.dependencies import require_roles

router = APIRouter()


@router.get("/system")
def system_performance(
    current_user=Depends(require_roles(["Super Admin"]))
):
    return {
        "cpu_usage_percent": psutil.cpu_percent(interval=1),
        "memory_usage_percent": psutil.virtual_memory().percent,
        "disk_usage_percent": psutil.disk_usage("/").percent,
        "system_status": "Healthy"
    }