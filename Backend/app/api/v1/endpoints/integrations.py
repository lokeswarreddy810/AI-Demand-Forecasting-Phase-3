from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.integration_service import (
    create_integration,
    get_integrations,
    toggle_integration
)

router = APIRouter()


@router.post("/create")
def create_new_integration(
    integration_name: str,
    integration_type: str,
    api_url: str,
    db: Session = Depends(get_db)
):
    integration = create_integration(
        db=db,
        integration_name=integration_name,
        integration_type=integration_type,
        api_url=api_url
    )

    return {
        "message": "Integration created successfully",
        "data": {
            "id": integration.id,
            "integration_name": integration.integration_name,
            "integration_type": integration.integration_type,
            "api_url": integration.api_url,
            "status": integration.status,
            "is_enabled": integration.is_enabled
        }
    }


@router.get("/")
def list_integrations(db: Session = Depends(get_db)):
    integrations = get_integrations(db)

    return [
        {
            "id": item.id,
            "integration_name": item.integration_name,
            "integration_type": item.integration_type,
            "api_url": item.api_url,
            "status": item.status,
            "is_enabled": item.is_enabled,
            "created_at": item.created_at
        }
        for item in integrations
    ]


@router.patch("/toggle/{integration_id}")
def update_integration_status(
    integration_id: int,
    db: Session = Depends(get_db)
):
    integration = toggle_integration(db, integration_id)

    if not integration:
        raise HTTPException(
            status_code=404,
            detail="Integration not found"
        )

    return {
        "message": "Integration status updated",
        "integration_name": integration.integration_name,
        "is_enabled": integration.is_enabled,
        "status": integration.status
    }


@router.post("/webhook")
def receive_webhook(payload: dict):
    return {
        "message": "Webhook received successfully",
        "payload": payload
    }


@router.post("/external-api-test")
def external_api_test(
    api_url: str
):
    return {
        "message": "External API test completed",
        "api_url": api_url,
        "status": "Connected"
    }