import React, { useEffect, useState } from 'react';
import { Fish, Shield, TrendingUp } from 'lucide-react';

const Conservation = () => {
    const [data, setData] = useState({
        protectedAreas: 0,
        sharksTracked: 0,
        populationIncrease: 0,
        achievements: []
    });

    useEffect(() => {
        fetch("https://api.nasa.gov/planetary/apod?api_key=Ouz2UZHlLfflZ67ljpvFEnN9MooJrgBoRjTkF8UB")
            .then(res => res.json())
            .then(apiData => {

                setData({
                    protectedAreas: Math.floor(Math.random() * 20),
                    sharksTracked: Math.floor(Math.random() * 1000),
                    populationIncrease: Math.floor(Math.random() * 50),
                    achievements: [
                        apiData.title,
                        "Prevented 15 potential fishing conflicts",
                        "Improved MPA enforcement by 34%",
                        "Contributed to 2 new policy recommendations"
                    ]
                });
            });
    }, []);

    return (
        <div className="space-y-6 min-h-[calc(100vh-250px)] mt-12 ">
            <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Conservation Impact Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-lg p-6 text-center">
                        <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <div className="text-3xl font-bold text-white mb-2">{data.protectedAreas}</div>
                        <div className="text-green-200">Protected Areas Monitored</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-6 text-center">
                        <Fish className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <div className="text-3xl font-bold text-white mb-2">{data.sharksTracked}</div>
                        <div className="text-blue-200">Sharks Tracked This Year</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-6 text-center">
                        <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <div className="text-3xl font-bold text-white mb-2">{data.populationIncrease}%</div>
                        <div className="text-purple-200">Population Increase</div>
                    </div>
                </div>

                <div className="mt-8 bg-white/10 rounded-lg p-6">
                    <h3 className="text-white font-bold mb-4">Conservation Achievements</h3>
                    <div className="space-y-3">
                        {data.achievements.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-white/80">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conservation;
