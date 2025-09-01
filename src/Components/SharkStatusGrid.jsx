import { Fish } from 'lucide-react';

const SharkStatusGrid = ({ sharkData }) => (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Fish className="w-5 h-5" />
            Active Shark Tags (IoT Status)
        </h3>

        <div className="space-y-3">
            {sharkData.map((shark) => (
                <div key={shark.id} className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${shark.signalStrength > 0.7 ? 'bg-green-400' :
                                    shark.signalStrength > 0.4 ? 'bg-yellow-400' : 'bg-red-400'
                                }`}></div>
                            <span className="text-white font-semibold">{shark.id}</span>
                            <span className="text-gray-300 text-sm">({shark.species})</span>
                        </div>
                        <div className="text-right">
                            <div className="text-white text-sm">Battery: {shark.batteryLevel.toFixed(0)}%</div>
                            <div className="text-gray-300 text-xs">Depth: {shark.depth.toFixed(0)}m</div>
                        </div>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">
                            Temp: {shark.temperature.toFixed(1)}°C
                        </span>
                        <span className={`${shark.lastFed ? 'text-red-400' : 'text-blue-400'}`}>
                            {shark.lastFed ? 'Recently Fed' : 'Hunting'}
                        </span>
                    </div>

                    <div className="mt-2 bg-gray-700 rounded-full h-1">
                        <div
                            className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${shark.batteryLevel}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SharkStatusGrid;