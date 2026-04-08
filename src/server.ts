
import express from "express";
import { addCity } from "./controllers/cityController";

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
    res.send("Working");
});

app.post("/api/v1/cities", addCity);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});