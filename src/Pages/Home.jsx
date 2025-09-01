import React, { useState, useEffect } from 'react';
import { Fish, Database, Brain, AlertTriangle } from 'lucide-react';
import MapVisualization from '../Components/MapVisualization';
import EODataPanel from '../Components/EODataPanel';
import AlertsPanel from '../Components/AlertsPanel';
import SharkStatusGrid from '../Components/SharkStatusGrid';
import PredictionEngine from '../Components/PredictionEngine';


const generatePredictions = (eoData, sharkData) => {
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

const Home = () => {
    const [eoData, setEOData] = useState({});
    const [sharkData, setSharkData] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const sharkRes = await fetch("https://api.nasa.gov/planetary/apod?api_key=Ouz2UZHlLfflZ67ljpvFEnN9MooJrgBoRjTkF8UB");
                const sharkApiData = await sharkRes.json();


                const mappedSharks = [
                    {
                        id: "API-001",
                        species: "Great White",
                        lat: -34.5 + Math.random() * 10,
                        lng: 138.5 + Math.random() * 15,
                        depth: Math.random() * 200,
                        temperature: 20,
                        lastFed: Math.random() > 0.5,
                        batteryLevel: Math.random() * 100,
                        signalStrength: Math.random(),
                        apiTitle: sharkApiData.title,
                        apiImage: sharkApiData.url,
                    }
                ];


                const eoRes = await fetch("https://api.nasa.gov/planetary/apod?api_key=Ouz2UZHlLfflZ67ljpvFEnN9MooJrgBoRjTkF8UB");
                const eoApiData = await eoRes.json();

                const mappedEOData = {
                    seaSurfaceTemp: 22 + Math.random() * 5,
                    planktonDensity: 0.3 + Math.random(),
                    currentStrength: Math.random() * 2,
                    chlorophyllA: 0.1 + Math.random() * 0.4,
                    apiInfo: eoApiData.title
                };

                // Predictions generate
                const newPredictions = generatePredictions(mappedEOData, mappedSharks);

                const newAlerts = [];
                mappedSharks.forEach(shark => {
                    if (shark.batteryLevel < 20) {
                        newAlerts.push({
                            id: Date.now() + Math.random(),
                            type: 'warning',
                            message: `${shark.id} battery low (${shark.batteryLevel.toFixed(1)}%)`,
                            timestamp: new Date().toLocaleTimeString()
                        });
                    }
                    if (shark.depth > 150) {
                        newAlerts.push({
                            id: Date.now() + Math.random() + 1,
                            type: 'info',
                            message: `${shark.id} diving deep (${shark.depth.toFixed(0)}m)`,
                            timestamp: new Date().toLocaleTimeString()
                        });
                    }
                });


                setSharkData(mappedSharks);
                setEOData(mappedEOData);
                setPredictions(newPredictions);
                setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
            } catch (err) {
                console.error("API fetch error:", err);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <main >

                <div className="space-y-6">
                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white flex items-center gap-3">
                            <Fish className="w-8 h-8" />
                            <div>
                                <div className="text-2xl font-bold">{sharkData.length}</div>
                                <div className="text-blue-100">Active Tags</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white flex items-center gap-3">
                            <Database className="w-8 h-8" />
                            <div>
                                <div className="text-2xl font-bold">24.7K</div>
                                <div className="text-green-100">Data Points</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white flex items-center gap-3">
                            <Brain className="w-8 h-8" />
                            <div>
                                <div className="text-2xl font-bold">{predictions.length}</div>
                                <div className="text-purple-100">Predictions</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white flex items-center gap-3">
                            <AlertTriangle className="w-8 h-8" />
                            <div>
                                <div className="text-2xl font-bold">{alerts.length}</div>
                                <div className="text-orange-100">Active Alerts</div>
                            </div>
                        </div>
                    </div>

                    {/* Map + Panels */}

                    <div className="">
                        <MapVisualization sharkData={sharkData} predictions={predictions} />
                    </div>



                    {/* Shark Status + Prediction Engine */}
                    <div>
                        <EODataPanel eoData={eoData} />
                    </div>
                    <div>
                        <SharkStatusGrid sharkData={sharkData} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PredictionEngine predictions={predictions} />

                        <AlertsPanel alerts={alerts} />

                    </div>
                </div>
            </main>

        </>

    );
};

export default Home;
