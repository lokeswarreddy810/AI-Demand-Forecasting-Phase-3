from fastapi import HTTPException, status


def admin_required(current_user):
    role = getattr(current_user, "role", None)

    if role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    return current_user