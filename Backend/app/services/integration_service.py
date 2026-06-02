from app.models.integration import Integration


def create_integration(db, integration_name, integration_type, api_url):
    integration = Integration(
        integration_name=integration_name,
        integration_type=integration_type,
        api_url=api_url,
        status="Active",
        is_enabled=True
    )

    db.add(integration)
    db.commit()
    db.refresh(integration)

    return integration


def get_integrations(db):
    return db.query(Integration).all()


def toggle_integration(db, integration_id):
    integration = db.query(Integration).filter(
        Integration.id == integration_id
    ).first()

    if not integration:
        return None

    integration.is_enabled = not integration.is_enabled
    integration.status = "Active" if integration.is_enabled else "Disabled"

    db.commit()
    db.refresh(integration)

    return integration