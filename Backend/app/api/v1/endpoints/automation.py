from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.core.database import get_db
from app.models.automation_job import AutomationJob
from app.models.alert import Alert
from app.services.audit_service import create_audit_log

router = APIRouter()


@router.post("/schedule")
def create_schedule(
    job_name: str,
    interval_type: str = "daily",
    interval_value: int = 1,
    db: Session = Depends(get_db)
):
    job = AutomationJob(
        job_name=job_name,
        interval_type=interval_type,
        interval_value=interval_value,
        is_active=True
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return {
        "message": "Automation schedule created successfully",
        "job_id": job.id
    }


@router.get("/schedules")
def get_schedules(
    db: Session = Depends(get_db)
):
    jobs = db.query(AutomationJob).order_by(
        AutomationJob.created_at.desc()
    ).all()

    return jobs


@router.post("/run-now/{job_id}")
def run_now(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = db.query(AutomationJob).filter(
        AutomationJob.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Automation job not found"
        )

    job.last_run = datetime.utcnow()

    alert = Alert(
        alert_type="Automation",
        message=f"{job.job_name} executed successfully",
        threshold_value=0
    )

    db.add(alert)

    create_audit_log(
        db=db,
        admin_user="System",
        action=f"Automation job executed: {job.job_name}",
        module="Automation"
    )

    db.commit()

    return {
        "message": "Automation job executed successfully",
        "job_name": job.job_name
    }


@router.patch("/toggle/{job_id}")
def toggle_schedule(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = db.query(AutomationJob).filter(
        AutomationJob.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Automation job not found"
        )

    job.is_active = not job.is_active
    db.commit()

    return {
        "message": "Automation job status updated",
        "is_active": job.is_active
    }