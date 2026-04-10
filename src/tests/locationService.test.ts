

import { LocationService } from "../services/locationService";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("LocationService", () => {
    const service = new LocationService();

    it("should return coordinates", async () => {
        mockedAxios.get.mockResolvedValue({
            data: [{ lat: "51.5074", lon: "-0.1278"}],
        });

        const result = await service.getCoordinates("London");

        expect(result.lat).toBe("51.5074");
        expect(result.lon).toBe("-0.1278")
    });

    it("should throw error if city not found", async () => {
        mockedAxios.get.mockResolvedValue({ data: [] });

        await expect(service.getCoordinates("unknown")).rejects.toThrow(
            "City not found");
    });
});
