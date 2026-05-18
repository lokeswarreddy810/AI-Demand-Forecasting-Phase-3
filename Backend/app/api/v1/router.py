from fastapi import APIRouter

from app.api.v1.endpoints import auth
from app.api.v1.endpoints import users
from app.api.v1.endpoints import datasets
from app.api.v1.endpoints import forecasting
from app.api.v1.endpoints import analytics
from app.api.v1.endpoints import reports
from app.api.v1.endpoints import history
from app.api.v1.endpoints import notifications
from app.api.v1.endpoints import admin

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(datasets.router)
api_router.include_router(forecasting.router)
api_router.include_router(analytics.router)
api_router.include_router(reports.router)
api_router.include_router(history.router)
api_router.include_router(notifications.router)
api_router.include_router(admin.router)