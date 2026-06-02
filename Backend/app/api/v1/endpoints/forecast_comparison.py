from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.model_accuracy import ModelAccuracy
from app.models.forecast_confidence import ForecastConfidence

router = APIRouter()


@router.get("/multi-model")
def multi_model_comparison():
    return [
        {
            "model_name": "Linear Regression",
            "accuracy": 90,
            "confidence_score": 88
        },
        {
            "model_name": "Random Forest",
            "accuracy": 94,
            "confidence_score": 91
        },
        {
            "model_name": "Gradient Boosting",
            "accuracy": 96,
            "confidence_score": 93
        }
    ]


@router.get("/accuracy-trends")
def accuracy_trends():
    return [
        {
            "month": "January",
            "linear_regression": 88,
            "random_forest": 91,
            "gradient_boosting": 93
        },
        {
            "month": "February",
            "linear_regression": 89,
            "random_forest": 92,
            "gradient_boosting": 94
        },
        {
            "month": "March",
            "linear_regression": 90,
            "random_forest": 94,
            "gradient_boosting": 96
        }
    ]


@router.get("/historical")
def historical_forecast_comparison():
    return [
        {
            "product_name": "Laptop",
            "previous_forecast": 120,
            "current_forecast": 145,
            "difference": 25
        },
        {
            "product_name": "Mobile",
            "previous_forecast": 180,
            "current_forecast": 210,
            "difference": 30
        }
    ]


@router.get("/confidence")
def confidence_scores():
    return [
        {
            "model_name": "Linear Regression",
            "confidence_score": 88
        },
        {
            "model_name": "Random Forest",
            "confidence_score": 91
        },
        {
            "model_name": "Gradient Boosting",
            "confidence_score": 93
        }
    ]


@router.get("/business-recommendations")
def business_recommendations():
    return [
        {
            "recommendation": "Increase inventory for high-demand products"
        },
        {
            "recommendation": "Monitor low-stock items weekly"
        },
        {
            "recommendation": "Use Gradient Boosting for complex demand patterns"
        }
    ]