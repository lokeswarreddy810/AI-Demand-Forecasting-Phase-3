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
from app.api.v1.endpoints import automation
from app.api.v1.endpoints import integrations
from app.api.v1.endpoints import ai_recommendations
from app.api.v1.endpoints import forecast_comparison
from app.api.v1.endpoints import alerts
from app.api.v1.endpoints import dashboard_settings
from app.api.v1.endpoints import user_management
from app.api.v1.endpoints import password_reset

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
api_router.include_router(automation.router, prefix="/automation", tags=["Automation"])
api_router.include_router(integrations.router, prefix="/integrations", tags=["Integrations"])
api_router.include_router(ai_recommendations.router, prefix="/ai-recommendations", tags=["AI Recommendations"])
api_router.include_router(forecast_comparison.router, prefix="/forecast-comparison", tags=["Forecast Comparison"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
api_router.include_router(dashboard_settings.router, prefix="/dashboard-settings", tags=["Dashboard Settings"])
api_router.include_router(user_management.router, prefix="/user-management", tags=["User Management"])
api_router.include_router(password_reset.router, prefix="/password-reset", tags=["Password Reset"])
