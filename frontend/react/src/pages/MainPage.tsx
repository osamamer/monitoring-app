import { useState, useEffect } from 'react';
import { quantumComputerAPI, simulationAPI } from '../services/Api';
import QuantumComputerCard from '../components/QuantumComputerCard';
import type {QuantumComputer} from '../types';

function MainPage() {
    const [computers, setComputers] = useState<QuantumComputer[]>([]);
    const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (): Promise<void> => {
        try {
            setLoading(true);
            const [computersData, statusData] = await Promise.all([
                quantumComputerAPI.getAll(),
                simulationAPI.getStatus()
            ]);
            setComputers(computersData);
            setIsSimulationRunning(statusData.running);
            setError(null);
        } catch (err) {
            setError('Failed to fetch data. Make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleSimulation = async (): Promise<void> => {
        try {
            if (isSimulationRunning) {
                await simulationAPI.stop();
                setIsSimulationRunning(false);
            } else {
                await simulationAPI.start();
                setIsSimulationRunning(true);
            }
        } catch (err) {
            alert('Failed to toggle simulation');
            console.error(err);
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen message={error} onRetry={fetchData} />;
    }

    return (
        <div className="min-h-screen px-8 py-12">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold text-text-primary mb-4 flex items-center justify-center gap-4">
                    Quantum Computing Dashboard

                </h1>
                <p className="text-xl text-text-secondary">
                    Real-time monitoring of quantum computers
                </p>
            </header>

            {/* Controls */}
            <div className="flex justify-center items-center gap-6 mb-12">
                <button
                    onClick={toggleSimulation}
                    className={`px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                        isSimulationRunning
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                >
                    {isSimulationRunning ? '⏸ Stop Simulation' : '▶ Start Simulation'}
                </button>

                <div className="flex items-center gap-2 px-6 py-3 bg-dark-bgSecondary rounded-xl text-text-secondary">
          <span
              className={`w-3 h-3 rounded-full animate-pulse ${
                  isSimulationRunning ? 'bg-green-500' : 'bg-red-500'
              }`}
          />
                    {isSimulationRunning ? 'Simulation Active' : 'Simulation Inactive'}
                </div>
            </div>

            {/* Computer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {computers.map(computer => (
                    <QuantumComputerCard key={computer.id} computer={computer} />
                ))}
            </div>
        </div>
    );
}

function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dark-bgSecondary border-t-primary rounded-full animate-spin" />
            <p className="mt-6 text-xl text-text-secondary">Loading quantum systems...</p>
        </div>
    );
}

interface ErrorScreenProps {
    message: string;
    onRetry: () => void;
}

function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">Connection Error</h2>
            <p className="text-text-secondary mb-8 text-center max-w-md">{message}</p>
            <button
                onClick={onRetry}
                className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all duration-300"
            >
                Retry Connection
            </button>
        </div>
    );
}

export default MainPage;