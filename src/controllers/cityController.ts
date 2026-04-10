
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { citySchema } from "../validators/cityValidator";
import { LocationService } from "../services/locationService";
import { WeatherService } from "../services/weatherService";
import { cities } from "../data/store";
import { TYPES } from "../types/types";

@injectable()
export class CityController {
    constructor(
        @inject(TYPES.WeatherService) private weatherService: WeatherService,
        @inject(TYPES.LocationService) private locationService: LocationService
    ) {}
 
    // POST 
 addCity = async (req: Request, res: Response) => {
    const { error } = citySchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const { name } = req.body;

    try {
        const { lat, lon } = await this.locationService.getCoordinates(name);

        const city = {
            name,
            latitude: lat,
            longitude: lon,
            createdAt: new Date(),
        };

        cities.push(city);

        res.status(201).json({
            message: "City added successfully",
            data: city,
        });
    } catch (err: any) {
        res.status(404).json({ message: err.message || "Error fetching city data",

         });
    }
};

// GET
 getCities = (req: Request, res: Response) => {
    if (cities.length === 0) {
        return res.status(200).json({
            message: "No cities found",
            data: [],
        });
    }
    return res.status(200).json({
        message: "Cities fetched successfully",
        data: cities,
    });
};

  // DELETE
deleteCity = (req: Request, res: Response) => {
    const name = req.params.name as string;

    if (!name) {
        return res.status(400).json({
            message: "City name is required",
        });
    }

    const index = cities.findIndex((city) => 
      city.name?.toLowerCase() === name.toLowerCase()
);

    if (index === -1) {
        return res.status(404).json({
            message: "City not found",
        });
    }

    cities.splice(index, 1);

    return res.status(200).json({ 
        message: "City deleted successfully",
    });
};
// GET INSIGHTS
 getCityInsights = async (req: Request, res: Response) => {
    const name = req.params.name as string;

    const city = cities.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    if (!city) {
        return res.status(404).json({
            message: "City not found",
        });
    }

    try {

        const weather = await this.weatherService.getWeather(Number(city.latitude), Number(city.longitude)
    );

        const result = this.weatherService.transformWeather(name, weather);

        return res.status(200).json({
            message: "Weather insights fetched successfully",
            data: result,
        });
    } catch (err: any) {
        return res.status(500).json({
            message: "Error fetching weather data"
        });
    }
};
}
