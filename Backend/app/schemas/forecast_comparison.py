from pydantic import BaseModel


class ModelComparisonResponse(BaseModel):
    model_name: str
    accuracy: float
    confidence_score: float