from app.models.admin_audit_log import AdminAuditLog


def create_audit_log(
    db,
    admin_user="Admin",
    action="Action performed",
    module="System"
):
    log = AdminAuditLog(
        admin_user=admin_user,
        action=action,
        module=module
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return log