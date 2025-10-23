export interface QuantumComputer {
    id: string;
    name: string;
    qubits: number;
    location: string;
    status: 'online' | 'offline' | 'maintenance';
    temperature_mk: number | null;
}

export interface Metric {
    timestamp: string;
    computer_id: string;
    metric_name: string;
    value: number;
    unit: string;
}

export interface SimulationStatus {
    running: boolean;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}