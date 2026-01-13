import React from 'react';
import { Plane, MapPin, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const FlightResult = ({ data }) => {
    if (!data) return null;

    const {
        flight_status,
        departure,
        arrival,
        airline,
        flight
    } = data;

    const formatTime = (isoString) => {
        try {
            return format(parseISO(isoString), 'h:mm a');
        } catch (e) {
            return isoString;
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'scheduled':
                return 'text-green-400 border-green-400/30 bg-green-400/10';
            case 'cancelled':
                return 'text-red-400 border-red-400/30 bg-red-400/10';
            case 'landed':
                return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
            case 'incident':
            case 'diverted':
                return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
            default:
                return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
        }
    };

    return (
        <div className="glass-panel p-8 w-full max-w-2xl relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(flight_status)} uppercase tracking-wider`}>
                    {flight_status}
                </span>
            </div>

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {airline?.name} <span className="text-blue-400">{flight?.iata}</span>
                    </h2>
                </div>

                {/* Route */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                    {/* Departure */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="text-4xl font-black mb-1 text-white">{departure?.iata}</div>
                        <div className="text-sm text-gray-400 mb-4">{departure?.airport}</div>
                        <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 mx-auto md:mx-0">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium">{formatTime(departure?.scheduled)}</span>
                            <span className="text-xs text-gray-500">{departure?.timezone}</span>
                        </div>
                    </div>

                    {/* Icon */}
                    <div className="flex flex-col items-center justify-center w-full md:w-auto px-4">
                        <div className="relative">
                            <Plane className="w-8 h-8 text-blue-500 transform rotate-90 md:rotate-0" />
                            <div className="absolute top-1/2 left-full w-24 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -translate-y-1/2 hidden md:block ml-4"></div>
                            <div className="absolute top-1/2 right-full w-24 h-0.5 bg-gradient-to-l from-blue-500/50 to-transparent -translate-y-1/2 hidden md:block mr-4"></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Duration: --</div>
                    </div>

                    {/* Arrival */}
                    <div className="flex-1 text-center md:text-right">
                        <div className="text-4xl font-black mb-1 text-white">{arrival?.iata}</div>
                        <div className="text-sm text-gray-400 mb-4">{arrival?.airport}</div>
                        <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 mx-auto md:ml-auto md:mr-0">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium">{formatTime(arrival?.scheduled)}</span>
                            <span className="text-xs text-gray-500">{arrival?.timezone}</span>
                        </div>
                    </div>
                </div>

                {/* Footer info? */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4 border-t border-white/5 pt-4">
                    <span>Data provided by Aviationstack</span>
                </div>
            </div>
        </div>
    );
};

export default FlightResult;
