import random
from datetime import datetime
from ..models import Metric

class QuantumSimulator:
    def __init__(self, computer_id: str):
        self.computer_id = computer_id

    def generate_qubit_fidelity(self) -> Metric:
        base_fidelity = 98.5
        noise = random.uniform(-0.2, 0.2)
        fidelity = base_fidelity + noise
        return Metric(
            timestamp=datetime.now(),
            computer_id=self.computer_id,
            metric_name="qubit_fidelity",
            value=round(fidelity, 2),
            unit="%"
        )

    def generate_gate_error_rate(self) -> Metric:
        base_error = 0.3
        noise = random.uniform(-0.1, 0.1)
        gate_error_rate = base_error + noise
        return Metric(
            timestamp=datetime.now(),
            computer_id=self.computer_id,
            metric_name="gate_error_rate",
            value=round(gate_error_rate, 3),
            unit="%"
        )
    def generate_temperature(self) -> Metric:
        base_temp = 25.0
        noise = random.uniform(-2.0, 2.0)
        temp = base_temp + noise
        return Metric(
            timestamp=datetime.now(),
            computer_id=self.computer_id,
            metric_name="temperature",
            value=round(temp, 1),
            unit="mK"
        )

    def generate_all_metrics(self) -> list[Metric]:
        return [
            self.generate_qubit_fidelity(),
            self.generate_gate_error_rate(),
            self.generate_temperature()
        ]


