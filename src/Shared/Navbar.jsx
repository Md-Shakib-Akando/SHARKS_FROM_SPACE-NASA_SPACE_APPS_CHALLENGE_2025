import React, { useState } from 'react';
import { Globe, Icon, MapPin, Satellite, Shield, TrendingUp, Zap } from 'lucide-react';
import { NavLink } from 'react-router';
const Navbar = () => {
    const [isTracking, setIsTracking] = useState(false);

    const toggleTracking = () => {
        setIsTracking(!isTracking);
    };
    return (
        <>


            <header className=" bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50 ">
                <div className=" lg:max-w-11/12  lg:mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className=" p-2 rounded-lg">
                                <Satellite className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h1 className="hidden md:flex text-2xl font-bold text-white">Sharks from Space</h1>
                                <p className="hidden md:flex text-blue-200 text-sm"> Ocean Conservation Platform</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTracking}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${isTracking
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                    }`}
                            >
                                <Zap className="w-4 h-4" />
                                {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="bg-black/10 backdrop-blur-sm border-b border-white/10">
                    <div className="max-w-11/12 mx-auto px-4">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-8 py-2">
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-3 font-medium transition-all ${isActive
                                        ? 'border-b-2 border-blue-400 text-blue-400'
                                        : 'border-b-2 border-transparent text-gray-300 hover:text-white'
                                    }`
                                }
                            >
                                <Globe className="w-4 h-4" />
                                DashBoard
                            </NavLink>
                            <NavLink
                                to='/liveTracking'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-all ${isActive
                                        ? 'border-blue-400 text-blue-400'
                                        : 'border-transparent text-gray-300 hover:text-white'
                                    }`
                                }
                            >
                                <MapPin className="w-4 h-4" />
                                Live Tracking
                            </NavLink>
                            <NavLink
                                to='/analytics'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-all ${isActive
                                        ? 'border-blue-400 text-blue-400'
                                        : 'border-transparent text-gray-300 hover:text-white'
                                    }`
                                }
                            >
                                <Shield className="w-4 h-4" />
                                Analytics
                            </NavLink>
                            <NavLink
                                to='/conservation'
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-all ${isActive
                                        ? 'border-blue-400 text-blue-400'
                                        : 'border-transparent text-gray-300 hover:text-white'
                                    }`
                                }
                            >
                                <TrendingUp className="w-4 h-4" />
                                Conservation
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </header>




        </>
    );
};

export default Navbar;