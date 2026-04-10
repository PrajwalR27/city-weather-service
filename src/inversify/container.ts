
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../types/types";
import { WeatherService } from "../services/weatherService";
import { LocationService } from "../services/locationService";
import { CityController } from "../controllers/cityController";

const container = new Container;

container.bind<WeatherService>(TYPES.WeatherService).to(WeatherService);
container.bind<LocationService>(TYPES.LocationService).to(LocationService);

container.bind<CityController>(CityController).toSelf();

export { container };