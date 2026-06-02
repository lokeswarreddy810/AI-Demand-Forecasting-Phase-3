from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

from app.core.database import Base, engine
from app.api.v1.router import api_router
from app.utils.rate_limiter import limiter

from app.models.user import User
from app.models.dataset import SalesData
from app.models.activity_log import ActivityLog
from app.models.automation_job import AutomationJob
from app.models.integration import Integration
from app.models.alert import Alert
from app.models.dashboard_widget import DashboardWidget
from app.models.user_activity import UserActivity
from app.models.model_accuracy import ModelAccuracy
from app.models.forecast_confidence import ForecastConfidence
from app.models.admin_audit_log import AdminAuditLog
from app.models.forecast_history import ForecastHistory

app = FastAPI(
    title="Advanced AI Demand Forecasting API",
    version="4.0.0",
    description=(
        "Advanced AI Demand Forecasting backend with authentication, "
        "forecasting, analytics, automation, alerts, reports, integrations, "
        "and dashboard modules."
    ),
)

app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)

app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(api_router)


@app.get("/", response_class=HTMLResponse)
def root():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Advanced AI Demand Forecasting API</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #f5fff0, #ffffff);
                color: #123f1f;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .container {
                text-align: center;
                background: white;
                padding: 50px;
                border-radius: 24px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
                border: 1px solid #b7ff39;
                max-width: 800px;
                width: 90%;
            }

            h1 {
                font-size: 42px;
                margin-bottom: 10px;
                color: #123f1f;
            }

            p {
                font-size: 18px;
                color: #444;
                margin-bottom: 30px;
            }

            .badge {
                display: inline-block;
                background: #9dff00;
                color: #032b11;
                padding: 8px 18px;
                border-radius: 999px;
                font-weight: bold;
                margin-bottom: 25px;
            }

            .buttons {
                margin-top: 30px;
            }

            a {
                text-decoration: none;
            }

            button {
                background: #9dff00;
                border: none;
                padding: 14px 28px;
                margin: 10px;
                border-radius: 12px;
                font-size: 16px;
                cursor: pointer;
                font-weight: bold;
                color: #032b11;
                transition: 0.2s ease;
            }

            button:hover {
                background: #8ee600;
                transform: translateY(-2px);
            }

            .secondary {
                background: #123f1f;
                color: white;
            }

            .secondary:hover {
                background: #0b2d15;
            }

            .modules {
                margin-top: 30px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 12px;
                text-align: left;
            }

            .module {
                background: #f5fff0;
                border: 1px solid #d6ffb2;
                padding: 12px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="badge">Backend Running Successfully</div>

            <h1>🚀 Advanced AI Demand Forecasting API</h1>

            <p>
                Version 4.0.0 backend is active with authentication,
                forecasting, analytics, reports, automation, alerts,
                integrations, and AI recommendation modules.
            </p>

            <div class="buttons">
                <a href="/docs">
                    <button>Open Swagger UI</button>
                </a>

                <a href="/redoc">
                    <button class="secondary">Open ReDoc</button>
                </a>
            </div>

            <div class="modules">
                <div class="module">Authentication</div>
                <div class="module">Datasets</div>
                <div class="module">Forecasting</div>
                <div class="module">Analytics</div>
                <div class="module">Reports</div>
                <div class="module">AI Recommendations</div>
                <div class="module">Automation</div>
                <div class="module">Integrations</div>
                <div class="module">Alerts</div>
                <div class="module">Dashboard Settings</div>
                <div class="module">User Management</div>
                <div class="module">Monitoring</div>
                <div class="module">Security</div>
            </div>
        </div>
    </body>
    </html>
    """