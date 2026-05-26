from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_users():

    return [
        {
            "id": 1,
            "name": "Admin User",
            "email": "admin@gmail.com",
            "role": "Super Admin"
        },
        {
            "id": 2,
            "name": "Analyst User",
            "email": "analyst@gmail.com",
            "role": "Analyst"
        }
    ]