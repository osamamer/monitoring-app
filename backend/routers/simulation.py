from fastapi import APIRouter, HTTPException
from services.simulator import QuantumSimulator
from services.influxdb_service import InfluxDBService
import asyncio
from typing import Dict, Optional

router = APIRouter(
    prefix="/simulation",
    tags=["simulation"]
)

simulation_state = {
    "running": False,
    "task": None
}

influxdb_service: Optional[InfluxDBService] = None

def set_influxdb_service(service: InfluxDBService):
    global influxdb_service
    influxdb_service = service
    print("InfluxDB Service has been set.")

async def simulation_loop():
    computer_ids = ["qc-001", "qc-002", "qc-003"]
    simulators = {
        comp_id: QuantumSimulator(comp_id)
        for comp_id in computer_ids
    }

    print("Simulation Started.")

    try:
        while simulation_state["running"]:
            try:
                for comp_id, simulator in simulators.items():
                    metrics = simulator.generate_all_metrics()
                    influxdb_service.write_metrics(metrics)

                await asyncio.sleep(5)

            except asyncio.CancelledError:
                print("Simulation loop cancelled.")
                raise
            except Exception as e:
                print(f"Error in simulation loop: {e}")
                simulation_state["running"] = False
                break
    finally:
        print("Simulation stopped.")

@router.post("/start")
async def start_simulation():
    if simulation_state["running"]:
        raise HTTPException(status_code=400, detail="Simulation already running.")
    if influxdb_service is None:
        raise HTTPException(status_code=500, detail="Influx DB has not been initialized.")

    simulation_state["running"] = True
    simulation_state["task"] = asyncio.create_task(simulation_loop())

    return {
        "status": "started",
        "message": "Simulation started successfully"
    }

@router.post("/stop")
async def stop_simulation():
    print("Attempting to stop simulation.")
    if not simulation_state["running"]:
        raise HTTPException(status_code=400, detail="Simulation cannot be stopped as it is not running.")

    simulation_state["running"] = False

    if simulation_state["task"]:
        print("Cancelling simulation task...")
        simulation_state["task"].cancel()

        try:
            await simulation_state["task"]
        except asyncio.CancelledError:
            print("Task successfully cancelled.")

        simulation_state["task"] = None

    return {
        "status": "stopped",
        "message": "Simulation stopped successfully"
    }

@router.get("/status")
async def get_simulation_status() -> Dict[str, bool]:
    return {
        "running": simulation_state["running"]
    }

async def cleanup():
    if simulation_state["running"]:
        print("Stopping simulation...")
        simulation_state["running"] = False
        if simulation_state["task"] is not None:
            simulation_state["task"].cancel()
            try:
                await simulation_state["task"]
            except asyncio.CancelledError:
                print("Cleanup: Task cancelled successfully.")
            simulation_state["task"] = None