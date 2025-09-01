import React, { useEffect, useState } from 'react';
import PredictionEngine from './PredictionEngine';

const Analaytics = () => {
    const [nasaData, setNasaData] = useState(null);
    const [predictions, setPredictions] = useState([]);


    const generatePredictions = (data) => {
        if (!data) return [];
        const hotspots = [];
        for (let i = 0; i < 8; i++) {
            hotspots.push({
                lat: -34 + Math.random() * 8,
                lng: 140 + Math.random() * 12,
                probability: Math.random(),
            });
        }
        return hotspots;
    };

    useEffect(() => {

        fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
            .then(res => res.json())
            .then(data => {
                setNasaData(data);
                setPredictions(generatePredictions(data));
            });

        const interval = setInterval(() => {
            fetch("https://api.nasa.gov/planetary/apod?api_key=Ouz2UZHlLfflZ67ljpvFEnN9MooJrgBoRjTkF8UB")
                .then(res => res.json())
                .then(data => {
                    console.log("Fetched new NASA data:", data);
                    setNasaData(data);
                    setPredictions(generatePredictions(data));
                });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6  min-h-[calc(100vh-250px)] mt-12">
            <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl p-3 md:p-6">
                <h2 className="text-lg  md:text-2xl font-bold text-white mb-6">
                    Analytics & Machine Learning Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PredictionEngine predictions={predictions} />

                    <div className="bg-white/10 rounded-lg p-4">
                        <h3 className="text-white font-bold mb-4">Performance Metrics</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">Model Accuracy</span>
                                    <span className="text-white">94.2%</span>
                                </div>
                                <div className="bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">Data Quality</span>
                                    <span className="text-white">89.1%</span>
                                </div>
                                <div className="bg-gray-700 rounded-full h-2">
                                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '89%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">System Uptime</span>
                                    <span className="text-white">99.7%</span>
                                </div>
                                <div className="bg-gray-700 rounded-full h-2">
                                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '99%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analaytics;
