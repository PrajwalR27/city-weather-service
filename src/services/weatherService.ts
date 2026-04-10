


import axios from "axios";


export class WeatherService {
    async getWeather(lat: number, lon: number) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    
        const response = await axios.get(url);
        return response.data.current_weather;

}

        transformWeather(city: string, data: any) {
            const tempC = data.temperature;
            const tempF = (tempC * 9) / 5 + 32;

            const windKmh = data.windspeed ?? data.current_weather?.windSpeed ?? 0;
            const windMph = windKmh * 0.621371;

            let windCategory = "";

         if (windKmh < 1) windCategory = "Calm";
        else if (windKmh < 6) windCategory = "Light Air";
        else if (windKmh < 12) windCategory = "Light Breeze";
        else if (windKmh < 20) windCategory = "Gentle Breeze";
        else if (windKmh < 29) windCategory = "Moderate Breeze";
        else windCategory = "Strong Wind";

    return {
        city,
        temperatureC: tempC,
        temperatureF: tempF,
        windSpeedKmh: windKmh,
        windSpeedMph: windMph,
        windCategory,
        timestamp: data.time,
    };
}
}