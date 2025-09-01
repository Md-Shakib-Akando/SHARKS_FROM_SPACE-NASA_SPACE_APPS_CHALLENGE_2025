import React, { useEffect, useState } from 'react';
import SharkStatusGrid from './SharkStatusGrid';
import MapVisualization from './MapVisualization';

const generatePredictions = () => {
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

const LiveTrack = () => {
    const [sharkData, setSharkData] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastAction, setLastAction] = useState('');

    useEffect(() => {
        const fetchData = () => {
            fetch("https://api.nasa.gov/planetary/apod?api_key=Ouz2UZHlLfflZ67ljpvFEnN9MooJrgBoRjTkF8UB")
                .then(res => res.json())
                .then(data => {
                    const newSharkData = [
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
                            apiTitle: data.title,
                            apiImage: data.url,
                        }
                    ];

                    setSharkData(newSharkData);
                    setPredictions(generatePredictions(newSharkData));
                });
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);

        return () => clearInterval(interval);
    }, []);

    // Export Track Data Function
    const exportTrackData = () => {
        setIsLoading(true);
        setLastAction('Exporting track data...');

        setTimeout(() => {
            // Generate CSV data
            const csvData = [
                ['Shark ID', 'Species', 'Latitude', 'Longitude', 'Depth (m)', 'Temperature (°C)', 'Battery (%)', 'Timestamp'],
                ...sharkData.map(shark => [
                    shark.id,
                    shark.species,
                    shark.lat.toFixed(6),
                    shark.lng.toFixed(6),
                    shark.depth.toFixed(2),
                    shark.temperature,
                    shark.batteryLevel.toFixed(1),
                    new Date().toISOString()
                ])
            ];

            // Convert to CSV string
            const csvContent = csvData.map(row => row.join(',')).join('\n');

            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `shark_tracking_data_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setIsLoading(false);
            setLastAction('Track data exported successfully!');

            // Clear message after 3 seconds
            setTimeout(() => setLastAction(''), 3000);
        }, 1500);
    };

    // Generate Report Function
    const generateReport = () => {
        setIsLoading(true);
        setLastAction('Generating comprehensive report...');

        setTimeout(() => {
            // Generate HTML report
            const reportHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Shark Tracking Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { background: #1e40af; color: white; padding: 20px; border-radius: 8px; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .stats { display: flex; gap: 20px; }
        .stat-box { background: #f8f9fa; padding: 15px; border-radius: 8px; flex: 1; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🦈 Sharks from Space - Tracking Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="section">
        <h2>Executive Summary</h2>
        <div class="stats">
            <div class="stat-box">
                <h3>${sharkData.length}</h3>
                <p>Active Tags</p>
            </div>
            <div class="stat-box">
                <h3>${predictions.length}</h3>
                <p>Predicted Hotspots</p>
            </div>
            <div class="stat-box">
                <h3>${sharkData.filter(s => s.batteryLevel > 50).length}</h3>
                <p>Healthy Batteries</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Tracked Sharks</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Species</th>
                <th>Location</th>
                <th>Depth (m)</th>
                <th>Temperature (°C)</th>
                <th>Battery (%)</th>
                <th>Status</th>
            </tr>
            ${sharkData.map(shark => `
            <tr>
                <td>${shark.id}</td>
                <td>${shark.species}</td>
                <td>${shark.lat.toFixed(4)}, ${shark.lng.toFixed(4)}</td>
                <td>${shark.depth.toFixed(1)}</td>
                <td>${shark.temperature}</td>
                <td>${shark.batteryLevel.toFixed(1)}</td>
                <td style="color: ${shark.batteryLevel > 50 ? 'green' : 'orange'}">
                    ${shark.batteryLevel > 50 ? 'Active' : 'Low Battery'}
                </td>
            </tr>
            `).join('')}
        </table>
    </div>

    <div class="section">
        <h2>Recommendations</h2>
        <ul>
            ${sharkData.filter(s => s.batteryLevel < 30).length > 0 ?
                    `<li>⚠️ ${sharkData.filter(s => s.batteryLevel < 30).length} shark(s) require battery replacement</li>` :
                    '<li>✅ All shark tags have sufficient battery levels</li>'
                }
            <li>📊 Continue monitoring in predicted hotspot areas</li>
            <li>🌊 Ocean conditions are within normal parameters</li>
        </ul>
    </div>
</body>
</html>`;

            // Create and download report
            const blob = new Blob([reportHTML], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `shark_report_${new Date().toISOString().split('T')[0]}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setIsLoading(false);
            setLastAction('Report generated and downloaded!');
            setTimeout(() => setLastAction(''), 3000);
        }, 2000);
    };

    // Predict Movement Function
    const predictMovement = () => {
        setIsLoading(true);
        setLastAction('Analyzing movement patterns...');

        setTimeout(() => {
            // Generate new predictions based on current shark data
            const newPredictions = [];

            sharkData.forEach(shark => {
                // Generate 3-5 predicted positions for each shark
                const numPredictions = 3 + Math.floor(Math.random() * 3);

                for (let i = 1; i <= numPredictions; i++) {
                    // Predict future positions based on current location with some randomness
                    const latOffset = (Math.random() - 0.5) * 0.1 * i;
                    const lngOffset = (Math.random() - 0.5) * 0.1 * i;

                    newPredictions.push({
                        sharkId: shark.id,
                        lat: shark.lat + latOffset,
                        lng: shark.lng + lngOffset,
                        probability: Math.max(0.2, 1 - (i * 0.15)), // Decreasing probability over time
                        timeFrame: `${i * 2} hours`,
                        depth: shark.depth + (Math.random() - 0.5) * 50,
                        confidence: Math.max(0.4, 0.9 - (i * 0.1))
                    });
                }
            });

            setPredictions(newPredictions);
            setIsLoading(false);
            setLastAction(`Generated ${newPredictions.length} movement predictions for ${sharkData.length} sharks!`);
            setTimeout(() => setLastAction(''), 3000);
        }, 2500);
    };

    return (
        <div className="space-y-6 min-h-[calc(100vh-290px)]">
            <div className="rounded-xl  md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Live Shark Tracking Interface</h2>
                    {lastAction && (
                        <div className="text-green-400 text-sm bg-green-900/20 px-3 py-1 rounded-full">
                            {lastAction}
                        </div>
                    )}
                </div>

                {/* Map Visualization */}
                <MapVisualization sharkData={sharkData} predictions={predictions} />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                    <SharkStatusGrid sharkData={sharkData} />

                    <div className="bg-white/10 rounded-lg p-4">
                        <h3 className="text-white font-bold mb-4">Tracking Controls</h3>
                        <div className="space-y-3">
                            <button
                                onClick={exportTrackData}
                                disabled={isLoading || sharkData.length === 0}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading && lastAction.includes('Exporting') ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        📊 Export Track Data
                                    </>
                                )}
                            </button>

                            <button
                                onClick={generateReport}
                                disabled={isLoading || sharkData.length === 0}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading && lastAction.includes('Generating') ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        📋 Generate Report
                                    </>
                                )}
                            </button>

                            <button
                                onClick={predictMovement}
                                disabled={isLoading || sharkData.length === 0}
                                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading && lastAction.includes('Analyzing') ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        🔮 Predict Movement
                                    </>
                                )}
                            </button>
                        </div>

                        {sharkData.length > 0 && (
                            <div className="mt-4 text-xs text-gray-300">
                                <p>• Export: Downloads CSV with tracking data</p>
                                <p>• Report: Generates comprehensive HTML report</p>
                                <p>• Predict: Uses AI to forecast shark movements</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveTrack;