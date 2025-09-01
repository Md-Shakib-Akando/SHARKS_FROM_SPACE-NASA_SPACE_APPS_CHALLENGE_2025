import { Satellite, Thermometer, Activity, Waves, Eye } from 'lucide-react';

const EODataPanel = ({ eoData }) => (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-3 md:p-6">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Satellite className="w-5 h-5" />
            NASA Earth Observation Data
        </h3>

        <div className="grid grid-cols-2 gap-2 md:gap-4">
            <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4 text-orange-400" />
                    <span className="text-white text-sm">Sea Surface Temp</span>
                </div>
                <div className="text-lg md:text-2xl font-bold text-orange-400">
                    {eoData?.seaSurfaceTemp !== undefined
                        ? `${eoData.seaSurfaceTemp.toFixed(1)}°C`
                        : "Loading..."}
                </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-white text-sm">Plankton Density</span>
                </div>
                <div className="text-lg md:text-2xl font-bold text-green-400">
                    {eoData?.planktonDensity !== undefined
                        ? `${(eoData.planktonDensity * 100).toFixed(0)}%`
                        : "Loading..."}
                </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Waves className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm">Current Strength</span>
                </div>
                <div className="text-lg md:text-2xl font-bold text-blue-400">
                    {eoData?.currentStrength !== undefined
                        ? `${eoData.currentStrength.toFixed(2)} m/s`
                        : "Loading..."}
                </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-teal-400" />
                    <span className="text-white text-sm">Chlorophyll-A</span>
                </div>
                <div className="text-lg md:text-2xl font-bold text-teal-400">
                    {eoData?.chlorophyllA !== undefined
                        ? `${(eoData.chlorophyllA * 1000).toFixed(1)} mg/m³`
                        : "Loading..."}
                </div>
            </div>
        </div>
    </div>
);

export default EODataPanel;
