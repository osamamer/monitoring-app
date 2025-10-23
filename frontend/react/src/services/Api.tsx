import axios from 'axios';
import type {QuantumComputer, SimulationStatus} from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const quantumComputerAPI = {
    getAll: async (): Promise<QuantumComputer[]> => {
        const response = await api.get<QuantumComputer[]>('/api/quantum-computers');
        return response.data;
    },

    getById: async (id: string): Promise<QuantumComputer> => {
        const response = await api.get<QuantumComputer>(`/api/quantum-computers/${id}`);
        return response.data;
    }
};

export const simulationAPI = {
    start: async (): Promise<{ status: string; message: string }> => {
        const response = await api.post('/api/simulation/start');
        return response.data;
    },

    stop: async (): Promise<{ status: string; message: string }> => {
        const response = await api.post('/api/simulation/stop');
        return response.data;
    },

    getStatus: async (): Promise<SimulationStatus> => {
        const response = await api.get<SimulationStatus>('/api/simulation/status');
        return response.data;
    }
};

export default api;