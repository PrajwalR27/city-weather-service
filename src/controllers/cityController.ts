
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
        res.status(404).json({ message: err.message || "Error fetching city data",

         });
    }
};

export const getCities = (req: Request, res: Response) => {
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

export const deleteCity = (req: Request, res: Response) => {
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