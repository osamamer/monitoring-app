from datetime import datetime

from pydantic import BaseModel

class Metric(BaseModel):
    timestamp: datetime
    computer_id: str
    metric_name: str
    value: float
    unit: str
