
import { CityControllerTestable } from "../controllers/cityController.testable"

describe("CityController", () => {
    const mockWeatherService: any = {
        getWeather: jest.fn(),
        transformWeather: jest.fn(),
    };

    const mockLocationService: any = {
        getCoordinates: jest.fn(),
    };

    const controller = new CityControllerTestable(mockWeatherService, mockLocationService);

    it("should return 404 if city not found in insights", async () => {
        const req: any = { params: { name: "Unknown" } };
        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.getCityInsights(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should delete a city successfully", () => {
        const req: any = { params: { name: "Unknown" } };
        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

         controller.deleteCity(req, res);

        expect(res.status).toHaveBeenCalled();
    });


});