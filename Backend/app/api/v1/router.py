from fastapi import APIRouter

from app.api.v1.endpoints import auth
from app.api.v1.endpoints import datasets
from app.api.v1.endpoints import forecasting
from app.api.v1.endpoints import reports
from app.api.v1.endpoints import analytics
from app.api.v1.endpoints import ai_optimization
from app.api.v1.endpoints import admin
from app.api.v1.endpoints import monitoring
from app.api.v1.endpoints import notifications
from app.api.v1.endpoints import users
from app.api.v1.endpoints import realtime

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(datasets.router, prefix="/datasets", tags=["Datasets"])
api_router.include_router(forecasting.router, prefix="/forecast", tags=["Forecasting"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(ai_optimization.router, prefix="/ai-optimization", tags=["AI Optimization"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
api_router.include_router(monitoring.router, prefix="/monitoring", tags=["Monitoring"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(realtime.router, prefix="/realtime", tags=["Realtime"])