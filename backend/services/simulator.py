import random
import math
from datetime import datetime, timezone
from models import Metric

class QuantumSimulator:
    def __init__(self, computer_id: str):
        self.computer_id = computer_id
        self.iteration_count = 0
        self.last_calibration = 0

        computer_profiles = {
            "qc-001": {
                "qubits": 127,
                "age_factor": 0.85,
                "base_temp": 15.3,
                "temp_stability": 0.8,
                "base_fidelity": 99.1,
                "base_error": 0.25,
                "base_coherence": 120.0,
                "base_qv": 64
            },
            "qc-002": {
                "qubits": 433,
                "age_factor": 0.95,
                "base_temp": 12.8,
                "temp_stability": 0.95,
                "base_fidelity": 98.8,
                "base_error": 0.35,
                "base_coherence": 95.0,
                "base_qv": 128
            },
            "qc-003": {
                "qubits": 1000,
                "age_factor": 0.70,
                "base_temp": 18.0,
                "temp_stability": 0.60,
                "base_fidelity": 97.5,
                "base_error": 0.50,
                "base_coherence": 75.0,
                "base_qv": 256
            }
        }

        self.profile = computer_profiles.get(computer_id, computer_profiles["qc-001"])

        self.temp_offset = random.uniform(-2, 2)
        self.fidelity_drift = random.uniform(-0.3, 0.1)

    def generate_temperature(self) -> Metric:
        self.iteration_count += 1

        base_temp = self.profile["base_temp"]
        stability = self.profile["temp_stability"]

        daily_cycle = 1.5 * math.sin(self.iteration_count * 0.05)

        workload_spike = 0
        if self.iteration_count % 80 == 0:
            workload_spike = random.uniform(3, 8)

        drift = (self.iteration_count * 0.01) * (1 - stability)

        noise = random.uniform(-0.5, 0.5) * (2 - stability)

        temp = base_temp + self.temp_offset + daily_cycle + workload_spike + drift + noise
        temp = max(10.0, min(30.0, temp))

        return Metric(
            timestamp=datetime.now(timezone.utc),
            computer_id=self.computer_id,
            metric_name="temperature",
            value=round(temp, 1),
            unit="mK"
        )

    def generate_qubit_fidelity(self, current_temp: float) -> Metric:
        base_fidelity = self.profile["base_fidelity"]
        age_factor = self.profile["age_factor"]

        temp_penalty = (current_temp - self.profile["base_temp"]) * 0.15

        time_since_calibration = self.iteration_count - self.last_calibration
        drift_penalty = (time_since_calibration / 100.0) * (1 - age_factor)

        if time_since_calibration > 120:
            self.last_calibration = self.iteration_count
            drift_penalty = 0

        noise = random.uniform(-0.1, 0.1)

        fidelity = base_fidelity - temp_penalty - drift_penalty + self.fidelity_drift + noise
        fidelity = max(95.0, min(99.9, fidelity))

        return Metric(
            timestamp=datetime.now(timezone.utc),
            computer_id=self.computer_id,
            metric_name="qubit_fidelity",
            value=round(fidelity, 2),
            unit="%"
        )

    def generate_gate_error_rate(self, current_temp: float, fidelity: float) -> Metric:
        base_error = self.profile["base_error"]

        temp_impact = (current_temp - self.profile["base_temp"]) * 0.02

        fidelity_correlation = (100 - fidelity) * 0.05

        age_degradation = (1 - self.profile["age_factor"]) * 0.1

        if self.iteration_count % 50 < 5:
            calibration_improvement = -0.08
        else:
            calibration_improvement = 0

        noise = random.uniform(-0.05, 0.05)

        gate_error_rate = base_error + temp_impact + fidelity_correlation + age_degradation + calibration_improvement + noise
        gate_error_rate = max(0.1, min(1.5, gate_error_rate))

        return Metric(
            timestamp=datetime.now(timezone.utc),
            computer_id=self.computer_id,
            metric_name="gate_error_rate",
            value=round(gate_error_rate, 3),
            unit="%"
        )

    def generate_coherence_time(self, current_temp: float, fidelity: float) -> Metric:
        base_coherence = self.profile["base_coherence"]

        temp_factor = 1 - ((current_temp - self.profile["base_temp"]) * 0.03)

        fidelity_factor = fidelity / 100.0

        if self.iteration_count % 100 < 10:
            recalibration_boost = 1.15
        else:
            recalibration_boost = 1.0

        decay_factor = 1 - ((self.iteration_count % 100) * 0.001)

        noise = random.uniform(0.95, 1.05)

        coherence_time = base_coherence * temp_factor * fidelity_factor * recalibration_boost * decay_factor * noise
        coherence_time = max(30.0, min(200.0, coherence_time))

        return Metric(
            timestamp=datetime.now(timezone.utc),
            computer_id=self.computer_id,
            metric_name="coherence_time",
            value=round(coherence_time, 1),
            unit="μs"
        )

    def generate_quantum_volume(self, gate_error: float, fidelity: float) -> Metric:
        base_qv = self.profile["base_qv"]

        error_penalty = (gate_error - self.profile["base_error"]) * 30

        fidelity_boost = (fidelity - 97) * 5

        qubits = self.profile["qubits"]
        theoretical_max = 2 ** int(math.log2(qubits))

        if self.iteration_count % 150 < 20:
            maintenance_penalty = -base_qv * 0.3
        else:
            maintenance_penalty = 0

        trend = (self.iteration_count * 0.05) * self.profile["age_factor"]

        noise = random.uniform(-5, 5)

        qv = base_qv - error_penalty + fidelity_boost + trend + maintenance_penalty + noise
        qv = max(16, min(theoretical_max, qv))

        return Metric(
            timestamp=datetime.now(timezone.utc),
            computer_id=self.computer_id,
            metric_name="quantum_volume",
            value=round(qv, 0),
            unit="QV"
        )

    def calculate_performance_score(
            self,
            fidelity: float,
            gate_error: float,
            temperature: float,
            coherence: float,
            quantum_volume: float
    ) -> Metric:
        fidelity_score = (fidelity / 100.0) * 30

        normalized_error = max(0, 1 - (gate_error / 2.0))
        error_score = normalized_error * 25

        temp_deviation = abs(temperature - self.profile["base_temp"])
        temp_score = max(0, (1 - temp_deviation / 15.0)) * 15

        coherence_normalized = coherence / 200.0
        coherence_score = min(coherence_normalized, 1.0) * 15

        qv_theoretical_max = 2 ** int(math.log2(self.profile["qubits"]))
        qv_normalized = quantum_volume / qv_theoretical_max
        qv_score = qv_normalized * 15

        total_score = fidelity_score + error_score + temp_score + coherence_score + qv_score

        total_score = max(0, min(100, total_score))

        return Metric(
            timestamp=datetime.now(timezone.utc),
            computer_id=self.computer_id,
            metric_name="performance_score",
            value=round(total_score, 1),
            unit="score"
        )

    def generate_all_metrics(self) -> list[Metric]:
        temp_metric = self.generate_temperature()
        fidelity_metric = self.generate_qubit_fidelity(temp_metric.value)
        gate_error_metric = self.generate_gate_error_rate(temp_metric.value, fidelity_metric.value)
        coherence_metric = self.generate_coherence_time(temp_metric.value, fidelity_metric.value)
        qv_metric = self.generate_quantum_volume(gate_error_metric.value, fidelity_metric.value)
        performance_metric = self.calculate_performance_score(
            fidelity_metric.value,
            gate_error_metric.value,
            temp_metric.value,
            coherence_metric.value,
            qv_metric.value
        )

        return [
            temp_metric,
            fidelity_metric,
            gate_error_metric,
            coherence_metric,
            qv_metric,
            performance_metric
        ]