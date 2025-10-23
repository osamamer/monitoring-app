from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.influxdb_service import InfluxDBService
from routers import quantum_computers, simulation
from routers.simulation import set_influxdb_service, cleanup
import os
from contextlib import asynccontextmanager

influxdb_service = InfluxDBService(
    url=os.getenv("INFLUXDB_URL", "http://localhost:8086"),
    token=os.getenv("INFLUXDB_TOKEN", "my-super-secret-token"),
    org=os.getenv("INFLUXDB_ORG", "lrz"),
    bucket=os.getenv("INFLUXDB_BUCKET", "quantum_metrics")
)
print(f"InfluxDB service created")


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")
    set_influxdb_service(influxdb_service)
    yield
    # SHUTDOWN
    print("Shutting down...")
    await cleanup()
    influxdb_service.close()
    print("Cleanup complete")


app = FastAPI(
    title="Quantum Computer Monitoring API",
    description="Real-time monitoring system for quantum computers",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quantum_computers.router)
app.include_router(simulation.router)


@app.get("/")
async def root():
    return {
        "message": "Quantum Computer Monitoring API",
        "status": "online",
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)