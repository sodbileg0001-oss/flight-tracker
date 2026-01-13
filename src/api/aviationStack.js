import axios from 'axios';

// NOTE: You need to set this environment variable in a .env file
// VITE_AVIATIONSTACK_KEY=your_api_key_here
const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1';

export const fetchFlightData = async (flightIata) => {
    if (!API_KEY) {
        throw new Error("Missing API Key. Please set VITE_AVIATIONSTACK_KEY in your .env file.");
    }

    try {
        const response = await axios.get(`${BASE_URL}/flights`, {
            params: {
                access_key: API_KEY,
                flight_iata: flightIata,
            }
        });

        if (response.data.error) {
            throw new Error(response.data.error.info || "API Error");
        }

        // Return the first matching flight or null
        return response.data.data && response.data.data.length > 0 ? response.data.data[0] : null;
    } catch (error) {
        console.error("Error fetching flight data:", error);
        throw error;
    }
};
