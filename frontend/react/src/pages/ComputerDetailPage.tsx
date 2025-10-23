import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quantumComputerAPI } from '../services/Api';
import type {QuantumComputer} from '../types';

function ComputerDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [computer, setComputer] = useState<QuantumComputer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchComputer = async () => {
            try {
                setLoading(true);
                const data = await quantumComputerAPI.getById(id);
                setComputer(data);
                setError(null);
            } catch (err) {
                setError('Failed to load quantum computer details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComputer();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-dark-bgSecondary border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !computer) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-6xl mb-6">⚠️</div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">Error</h2>
                <p className="text-text-secondary mb-8">{error || 'Computer not found'}</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    // Get status color
    const getStatusColor = (status: QuantumComputer['status']): string => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'offline': return 'bg-red-500';
            case 'maintenance': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen p-8">
            {/* Header with Back Button */}
            <div className="max-w-7xl mx-auto mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-primary hover:text-primary-hover mb-6 transition-colors"
                >
                    <span className="text-2xl">←</span>
                    <span className="font-semibold">Back to Dashboard</span>
                </button>

                {/* Computer Info Card */}
                <div className="bg-dark-card border border-dark-border rounded-2xl p-8 shadow-lg">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-text-primary mb-2">
                                {computer.name}
                            </h1>
                            <p className="text-text-secondary text-lg">System ID: {computer.id}</p>
                        </div>
                        <span
                            className={`px-4 py-2 rounded-lg text-sm font-bold text-white uppercase ${getStatusColor(
                                computer.status
                            )}`}
                        >
              {computer.status}
            </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-dark-bgSecondary p-4 rounded-xl">
                            <p className="text-text-secondary text-sm mb-1">Qubits</p>
                            <p className="text-primary text-3xl font-bold">{computer.qubits}</p>
                        </div>

                        <div className="bg-dark-bgSecondary p-4 rounded-xl">
                            <p className="text-text-secondary text-sm mb-1">Location</p>
                            <p className="text-text-primary text-xl font-semibold">
                                {computer.location}
                            </p>
                        </div>

                        {computer.temperature_mk && (
                            <div className="bg-dark-bgSecondary p-4 rounded-xl">
                                <p className="text-text-secondary text-sm mb-1">Temperature</p>
                                <p className="text-text-primary text-xl font-semibold">
                                    {computer.temperature_mk} mK
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Grafana Panels Section */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                    Real-Time Metrics
                </h2>

                <div className="grid grid-cols-1 gap-6">
                    {/* Qubit Fidelity Panel */}
                    <GrafanaPanel
                        title="Qubit Fidelity"
                        description="Measures how accurately qubits maintain their quantum state"
                        // REPLACE WITH YOUR ACTUAL GRAFANA EMBED URL
                        url={`http://localhost:3000/d-solo/YOUR_DASHBOARD_ID/quantum-metrics?orgId=1&from=now-5m&to=now&panelId=1&theme=dark&var-computer_id=${computer.id}`}
                    />

                    {/* Gate Error Rate Panel */}
                    <GrafanaPanel
                        title="Gate Error Rate"
                        description="Probability of errors during quantum gate operations"
                        // REPLACE WITH YOUR ACTUAL GRAFANA EMBED URL
                        url={`http://localhost:3000/d-solo/YOUR_DASHBOARD_ID/quantum-metrics?orgId=1&from=now-5m&to=now&panelId=2&theme=dark&var-computer_id=${computer.id}`}
                    />

                    {/* Temperature Panel */}
                    <GrafanaPanel
                        title="Operating Temperature"
                        description="System temperature in millikelvin - critical for quantum coherence"
                        // REPLACE WITH YOUR ACTUAL GRAFANA EMBED URL
                        url={`http://localhost:3000/d-solo/YOUR_DASHBOARD_ID/quantum-metrics?orgId=1&from=now-5m&to=now&panelId=3&theme=dark&var-computer_id=${computer.id}`}
                    />
                </div>
            </div>
        </div>
    );
}

// Reusable Grafana Panel Component
interface GrafanaPanelProps {
    title: string;
    description: string;
    url: string;
}

function GrafanaPanel({ title, description, url }: GrafanaPanelProps) {
    return (
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-lg">
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-text-secondary text-sm">{description}</p>
            </div>

            {/* The actual Grafana iframe */}
            <div className="bg-dark-bgSecondary rounded-xl overflow-hidden">
                <iframe
                    src={url}
                    width="100%"
                    height="400"
                    frameBorder="0"
                    className="rounded-xl"
                    title={title}
                />
            </div>
        </div>
    );
}

export default ComputerDetailPage;