import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchForm = ({ onSearch, isLoading }) => {
    const [flightNumber, setFlightNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (flightNumber.trim()) {
            onSearch(flightNumber.trim());
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mb-8 relative z-10">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="Flight Number (e.g., AA123)"
                    className="w-full pl-11 pr-32 py-4 rounded-2xl input-glass text-lg"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Tracking...' : 'Track'}
                </button>
            </form>
        </div>
    );
};

export default SearchForm;
