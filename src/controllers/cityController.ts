
import { Request, Response } from "express";
import { citySchema } from "../validators/cityValidator";
import { getCoordinates } from "../services/locationService";
import { cities } from "../data/store";

export const addCity = async (req: Request, res: Response) => {
    const { error } = citySchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const { name } = req.body;

    try {
        const { lat, lon } = await getCoordinates(name);

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
        res.status(404).json({ message: err.message });
    }

};