from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.services.user_service import get_profile

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return get_profile(current_user)