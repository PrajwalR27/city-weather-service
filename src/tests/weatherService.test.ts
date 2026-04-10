

import { WeatherService } from "../services/weatherService";

describe("weatherService", () => {
    const service = new WeatherService();

    it("should transform weather data correctly", () => {
        const mockWeather = {
            temperature: 20,
            windSpeed: 10,
            time: "2025-01-01T10:00",
        };

        const result = service.transformWeather("London", mockWeather);

        expect(result.temperatureC).toBe(20);
        expect(result.temperatureF).toBe(68);
        expect(result.windSpeedKmh).toBe(10);
        expect(result.windCategory).toBeDefined();
    });
});