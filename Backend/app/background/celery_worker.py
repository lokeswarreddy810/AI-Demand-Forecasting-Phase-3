celery_app = None

try:
    from celery import Celery

    celery_app = Celery(
        "ai_forecasting_worker",
        broker="redis://localhost:6379/0",
        backend="redis://localhost:6379/0"
    )

except ImportError:
    celery_app = None