import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightResult from './components/FlightResult';
import { fetchFlightData } from './api/aviationStack';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (flightNumber) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const result = await fetchFlightData(flightNumber);
            if (result) {
                setData(result);
            } else {
                setError('Flight not found. Please check the flight number and try again.');
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch flight data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="gradient-bg"></div>
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                        Find Your Flight
                    </h1>
                    <p className="text-lg text-gray-400">Real-time status and global tracking</p>
                </header>

                <SearchForm onSearch={handleSearch} isLoading={loading} />

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl mb-8 max-w-md w-full text-center">
                        {error}
                    </div>
                )}

                <FlightResult data={data} />
            </div>
        </>
    );
}

export default App;
