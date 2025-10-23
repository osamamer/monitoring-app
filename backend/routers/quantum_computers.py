from fastapi import APIRouter, HTTPException
from models.quantum_computer import QuantumComputer
from typing import List

router = APIRouter(
    prefix="/api/quantum-computers",
    tags=["quantum-computers"]
)

# Mock computers
QUANTUM_COMPUTERS = [
    QuantumComputer(
        id="qc-001",
        name="Quantum Nexus Alpha",
        qubits=127,
        location="Boston Data Center",
        status="online",
        temperature_mk=15.3
    ),
    QuantumComputer(
        id="qc-002",
        name="Quantum Nexus Beta",
        qubits=433,
        location="San Francisco Lab",
        status="online",
        temperature_mk=12.8
    ),
    QuantumComputer(
        id="qc-003",
        name="Quantum Nexus Gamma",
        qubits=1000,
        location="Tokyo Research Facility",
        status="maintenance",
        temperature_mk=None
    )
]

@router.get("", response_model=List[QuantumComputer])
async def get_all_quantum_computers():
    # TODO: replace with actual retrieval from real database
    return QUANTUM_COMPUTERS

@router.get("/{computer_id}", response_model=QuantumComputer)
async def get_quantum_computer(computer_id: str):
    for computer in QUANTUM_COMPUTERS:
        if computer.id == computer_id:
            return computer

    raise HTTPException(status_code=404, detail=f"Quantum computer with ID {computer_id} not found.")