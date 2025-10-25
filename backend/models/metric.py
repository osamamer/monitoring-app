from datetime import datetime, timezone

from pydantic import BaseModel, Field

class Metric(BaseModel):
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    computer_id: str
    metric_name: str
    value: float
    unit: str
