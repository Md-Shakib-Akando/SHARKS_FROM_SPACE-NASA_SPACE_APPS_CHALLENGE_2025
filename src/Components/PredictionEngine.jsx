import { Brain } from 'lucide-react';

const PredictionEngine = ({ predictions }) => (
    <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl  md:p-6">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Prediction Engine
        </h3>

        <div className="space-y-4">
            <div className=" bg-white/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Next 24H Hotspots</h4>
                <div className="space-y-2">
                    {predictions.slice(0, 3).map((prediction, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm">
                                Zone {i + 1}: {prediction.lat.toFixed(2)}°, {prediction.lng.toFixed(2)}°
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-yellow-400 to-red-400 h-2 rounded-full"
                                        style={{ width: `${prediction.probability * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-white text-sm">{(prediction.probability * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className=" bg-white/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Model Performance</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-green-400">94.2%</div>
                        <div className="text-xs text-gray-300">Accuracy</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-400">87.6%</div>
                        <div className="text-xs text-gray-300">Precision</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-purple-400">91.3%</div>
                        <div className="text-xs text-gray-300">Recall</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default PredictionEngine;