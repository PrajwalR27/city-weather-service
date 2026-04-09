
import express from "express";
import { addCity, deleteCity, getCities, getCityInsights } from "./controllers/cityController";

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
    res.send("Working");
});

app.post("/api/v1/cities", addCity);
app.get("/api/v1/cities", getCities);
app.delete("/api/v1/cities/:name", deleteCity);
app.get("/api/v1/cities/:name/insights", getCityInsights);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});