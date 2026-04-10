
import { Request, Response } from "express";
import { LocationService } from "../services/locationService";
import { WeatherService } from "../services/weatherService";


export class CityControllerTestable {
    private weatherService: WeatherService;
    private locationService: LocationService;

    constructor(
        weatherService: WeatherService,
        locationService: LocationService
    ) {
        this.weatherService = weatherService;
        this.locationService = locationService;
    }

    async getCityInsights(req: Request, res: Response) {
        return res.status(404).json({ message: "City not found" });
    }

    deleteCity(req: Request, res: Response) {
        return res.status(404).json({ message: "City not found" })
    }
}