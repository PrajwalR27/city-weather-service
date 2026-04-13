import "reflect-metadata";

import express from "express";
import { container } from "./inversify/container";
import { CityController } from "./controllers/cityController";
import { TYPES } from "./types/types";

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
    res.send("Working");
});

const cityController = new CityController(
    container.get(TYPES.WeatherService),
    container.get(TYPES.LocationService)
);


app.post("/api/v1/cities", cityController.addCity);
app.get("/api/v1/cities", cityController.getCities);
app.get("/api/v1/cities/search", cityController.searchCities);
app.get("/api/v1/cities/:name/insights", cityController.getCityInsights);
app.delete("/api/v1/cities/:name", cityController.deleteCity);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});