from datetime import datetime
from app.models.automation_job import AutomationJob


def create_automation_job(db, job_name, interval_type, interval_value):
    job = AutomationJob(
        job_name=job_name,
        interval_type=interval_type,
        interval_value=interval_value,
        is_active=True
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job


def get_automation_jobs(db):
    return db.query(AutomationJob).order_by(
        AutomationJob.created_at.desc()
    ).all()


def run_automation_job(db, job_id):
    job = db.query(AutomationJob).filter(
        AutomationJob.id == job_id
    ).first()

    if not job:
        return None

    job.last_run = datetime.utcnow()
    db.commit()
    db.refresh(job)

    return job


def toggle_automation_job(db, job_id):
    job = db.query(AutomationJob).filter(
        AutomationJob.id == job_id
    ).first()

    if not job:
        return None

    job.is_active = not job.is_active
    db.commit()
    db.refresh(job)

    return job