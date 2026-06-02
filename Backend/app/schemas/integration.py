from pydantic import BaseModel


class IntegrationCreate(BaseModel):
    integration_name: str
    integration_type: str
    api_url: str