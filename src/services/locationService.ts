
import axios from "axios";

export const getCoordinates = async (city: string) => {
    const url= `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`;

    const response = await axios.get(url, {
        headers: {
            "User-Agent": "city-weather-app"
        }
    });

    if (!response.data.length) {
        throw new Error("City not found");
    }

    return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
    };
};