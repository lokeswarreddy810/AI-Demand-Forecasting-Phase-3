from pydantic import BaseModel


class ProfileUpdate(BaseModel):
    name: str


class UserActivityCreate(BaseModel):
    activity: str