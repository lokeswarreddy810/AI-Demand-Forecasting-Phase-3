from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.core.database import get_db
from app.models.user import User
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.utils.rate_limiter import limiter

router = APIRouter()


class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str


class ForgotPasswordSchema(BaseModel):
    email: EmailStr


class ResetPasswordSchema(BaseModel):
    email: EmailStr
    new_password: str


@router.post("/register")
@limiter.limit("3/minute")
def register(
    request: Request,
    user_data: RegisterSchema,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),
        role="Viewer",
        is_active=True
    )

    db.add(user)
    db.commit()

    return {"success": True, "message": "User registered successfully"}


@router.post("/login")
@limiter.limit("5/minute")
def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account disabled")

    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}
    )

    return {
        "success": True,
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }


@router.post("/forgot-password")
@limiter.limit("3/minute")
def forgot_password(
    request: Request,
    user_data: ForgotPasswordSchema,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == user_data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="Email not found")

    return {
        "success": True,
        "message": "Password reset request received",
        "reset_token": "demo-reset-token"
    }


@router.post("/reset-password")
@limiter.limit("3/minute")
def reset_password(
    request: Request,
    user_data: ResetPasswordSchema,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == user_data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="Email not found")

    user.password = hash_password(user_data.new_password)
    db.commit()

    return {"success": True, "message": "Password reset successfully"}