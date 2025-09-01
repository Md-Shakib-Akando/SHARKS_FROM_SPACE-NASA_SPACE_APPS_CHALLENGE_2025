import { Fish, Globe } from 'lucide-react';

const MapVisualization = ({ sharkData, predictions }) => (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 rounded-xl p-6  relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-pulse"></div>

        <div className=" flex flex-col h-full relative z-10">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Real-time Shark Movement & Prediction Heatmap
            </h3>

            <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-12 grid-rows-6 sm:grid-rows-6 gap-1 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                {/* Shark positions */}
                {sharkData.slice(0, 5).map((shark, i) => (
                    <div
                        key={shark.id}
                        className={`rounded-full ${shark.lastFed ? 'bg-red-400' : 'bg-blue-400'
                            } animate-ping`}
                        style={{
                            gridColumn: Math.floor(Math.random() * 12) + 1,
                            gridRow: Math.floor(Math.random() * 8) + 1,
                            animationDelay: `${i * 0.3}s`
                        }}
                    >
                        <Fish className="w-4 h-7 sm:w-6 sm:h-8 md:w-13 md:h-12 xl:w-32 xl:h-17   text-white m-1" />
                    </div>
                ))}

                {/* Prediction hotspots */}
                {predictions.slice(0, 6).map((hotspot, i) => (
                    <div
                        key={i}
                        className={`rounded-full ${hotspot.probability > 0.7 ? 'bg-yellow-400' : 'bg-green-400'
                            } animate-pulse opacity-60`}
                        style={{
                            gridColumn: Math.floor(Math.random() * 12) + 1,
                            gridRow: Math.floor(Math.random() * 8) + 1,
                            animationDelay: `${i * 0.5}s`
                        }}
                    >
                        <Fish className="w-4 h-7 sm:w-6 sm:h-8 md:w-13 md:h-12 xl:w-32 xl:h-17   text-white m-1" />
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-xs sm:text-sm text-blue-200 gap-3">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span>Active Sharks</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span>Recently Fed</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span>High Probability Zones</span>
                    </div>
                </div>
                <span className="text-[10px] sm:text-xs">
                    Last Update: {new Date().toLocaleTimeString()}
                </span>
            </div>
        </div>
    </div>
);

export default MapVisualization;