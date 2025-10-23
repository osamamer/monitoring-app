from pydantic import BaseModel
from typing import Optional

class QuantumComputer(BaseModel):
    id: str
    name: str
    qubits: int
    location: str
    status: str
    temp_mk: Optional[float] = None