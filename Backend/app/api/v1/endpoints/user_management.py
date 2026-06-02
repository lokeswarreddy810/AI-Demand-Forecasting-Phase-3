from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.user_activity import UserActivity

router = APIRouter()


@router.get("/profile/{user_id}")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    return {
        "id": user.id,
        "name": getattr(user, "name", None),
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active
    }


@router.put("/profile/{user_id}")
def update_profile(
    user_id: int,
    name: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    user.name = name
    db.commit()

    return {
        "message": "Profile updated successfully"
    }


@router.patch("/account-status/{user_id}")
def update_account_status(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    user.is_active = not user.is_active
    db.commit()

    return {
        "message": "Account status updated",
        "is_active": user.is_active
    }


@router.post("/activity/{user_id}")
def create_user_activity(
    user_id: int,
    activity: str,
    db: Session = Depends(get_db)
):
    user_activity = UserActivity(
        user_id=user_id,
        activity=activity
    )

    db.add(user_activity)
    db.commit()

    return {
        "message": "User activity tracked"
    }


@router.get("/activity/{user_id}")
def get_user_activity(
    user_id: int,
    db: Session = Depends(get_db)
):
    activities = db.query(UserActivity).filter(
        UserActivity.user_id == user_id
    ).all()

    return [
        {
            "id": item.id,
            "user_id": item.user_id,
            "activity": item.activity,
            "created_at": item.created_at
        }
        for item in activities
    ]