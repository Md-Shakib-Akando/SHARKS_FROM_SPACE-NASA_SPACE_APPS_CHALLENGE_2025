import { AlertTriangle } from 'lucide-react';

const AlertsPanel = ({ alerts }) => (
    <div className="bg-gradient-to-br from-red-900 to-orange-900 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            System Alerts & Notifications
        </h3>

        <div className="space-y-2 max-h-64 overflow-y-auto">
            {alerts.map((alert) => (
                <div key={alert.id} className="bg-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-1 ${alert.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                                }`}></div>
                            <span className="text-white text-sm">{alert.message}</span>
                        </div>
                        <span className="text-gray-300 text-xs">{alert.timestamp}</span>
                    </div>
                </div>
            ))}

            {alerts.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                    No active alerts
                </div>
            )}
        </div>
    </div>
);

export default AlertsPanel;