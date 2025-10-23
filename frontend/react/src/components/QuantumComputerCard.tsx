import { useNavigate } from 'react-router-dom';
import type {QuantumComputer} from '../types';

interface QuantumComputerCardProps {
    computer: QuantumComputer;
}

function QuantumComputerCard({ computer }: QuantumComputerCardProps) {
    const navigate = useNavigate();

    const getStatusColor = (status: QuantumComputer['status']): string => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'offline': return 'bg-red-500';
            case 'maintenance': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const handleClick = (): void => {
        navigate(`/computer/${computer.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-dark-card border border-dark-border rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-lg card-hover"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-dark-border">
                <h2 className="text-2xl font-semibold text-text-primary">
                    {computer.name}
                </h2>
                <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold text-white uppercase ${getStatusColor(
                        computer.status
                    )}`}
                >
          {computer.status}
        </span>
            </div>

            {/* Body */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">System ID:</span>
                    <span className="text-text-primary font-medium">{computer.id}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Qubits:</span>
                    <span className="text-primary text-xl font-bold">{computer.qubits}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Location:</span>
                    <span className="text-text-primary font-medium">{computer.location}</span>
                </div>

                {computer.temperature_mk && (
                    <div className="flex justify-between items-center">
                        <span className="text-text-secondary text-sm">Temperature:</span>
                        <span className="text-text-primary font-medium">
              {computer.temperature_mk} mK
            </span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-dark-border">
        <span className="text-primary font-semibold text-sm flex items-center gap-2">
          View Details →
        </span>
            </div>
        </div>
    );
}

export default QuantumComputerCard;