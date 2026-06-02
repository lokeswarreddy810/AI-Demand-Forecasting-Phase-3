from app.models.user import User


def get_user_by_id(db, user_id):
    return db.query(User).filter(User.id == user_id).first()


def update_user_name(db, user_id, name):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    user.name = name
    db.commit()
    db.refresh(user)

    return user


def toggle_user_status(db, user_id):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    user.is_active = not user.is_active
    db.commit()
    db.refresh(user)

    return user