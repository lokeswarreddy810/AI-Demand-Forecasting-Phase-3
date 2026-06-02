from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.core.security import hash_password
from app.utils.token_generator import generate_token
from app.utils.email_sender import send_email

router = APIRouter()


@router.post("/forgot-password")
def forgot_password(
    email: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )

    reset_token = generate_token()

    send_email(
        to_email=email,
        subject="Password Reset Request",
        body=f"Your reset token is: {reset_token}"
    )

    return {
        "message": "Password reset token sent to email",
        "reset_token": reset_token
    }


@router.post("/reset-password")
def reset_password(
    email: str,
    new_password: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )

    user.password = hash_password(new_password)
    db.commit()

    return {
        "message": "Password reset successfully"
    }