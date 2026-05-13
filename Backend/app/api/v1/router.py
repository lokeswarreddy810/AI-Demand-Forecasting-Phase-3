from fastapi import APIRouter

from app.api.v1.endpoints import auth
from app.api.v1.endpoints import users
from app.api.v1.endpoints import datasets
from app.api.v1.endpoints import forecasting
from app.api.v1.endpoints import analytics
from app.api.v1.endpoints import reports


api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(datasets.router)
api_router.include_router(forecasting.router)
api_router.include_router(analytics.router)
api_router.include_router(reports.router)
