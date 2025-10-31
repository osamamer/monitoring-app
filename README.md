# Quantum Monitor

Real-time dashboard for monitoring quantum computers. Tracks qubit fidelity, gate error rates, and operating temperatures.

Built with FastAPI, React, InfluxDB, and Grafana.

## Quick Start

**Requirements:** Python 3.12+, Node.js 20+, Docker

Start services:
```bash
docker-compose up -d
```

Install and run backend:
```bash
cd backend
pip install -r requirements.txt --break-system-packages
python main.py
```

Install and run frontend:
```bash
cd frontend/react
npm install
npm run dev
```

Create a `.env` file in the backend directory with your database credentials.

## Usage

- Dashboard: `http://localhost:5173`
- API docs: `http://localhost:8000/docs`
- Grafana: `http://localhost:3000` (admin/admin)

Register an account, log in, and hit "Start Simulation" to generate mock metrics. Click any quantum computer for detailed charts.
