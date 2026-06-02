from app.core.security import hash_password
from app.models.user import User


def generate_reset_token(db, email):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    return "demo-reset-token"


def reset_user_password(db, email, new_password):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    user.password = hash_password(new_password)
    db.commit()

    return user