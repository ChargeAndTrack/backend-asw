import type { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { latitudeLongitudeSchema, type LatitudeLongitudeDTO } from '../zod_schemas/locationSchemas.ts';

const BASE_URL = new URL("https://nominatim.openstreetmap.org/");
const USER_AGENT = "ChargeAndTrack/1.0";

// GET /location/resolve
export const resolveAddressToCoordinates = async (req: Request, res: Response): Promise<Response> => {
    console.log("resolveAddressToCoordinates");
    const RESOLVE_URL = new URL("search", BASE_URL);
    try {
        const parsedQuery = await z.object({q: z.string().min(3)}).parseAsync(req.query);
        RESOLVE_URL.search = new URLSearchParams({
            q: parsedQuery.q,
            format: "json",
            limit: "1"
        }).toString();
        const response = await fetch(RESOLVE_URL, { headers: { "User-Agent": USER_AGENT } });
        if (!response.ok) {
            throw new Error("Can't contact " + RESOLVE_URL + ": " + response.statusText);
        }
        const data = await response.json();
        if (!data.length) {
            return res.status(404).json({ message: "Address not found" });
        }
        return res.status(200).json({
            latitude: Number(data[0].lat),
            longitude: Number(data[0].lon)
        });
    } catch (error) {
        console.log("Error: " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
};

// GET /location/reverse
export const reverseCoordinatesToAddress = async (req: Request, res: Response): Promise<Response> => {
    console.log("reverseCoordinatesToAddress");
    const REVERSE_URL = new URL("reverse", BASE_URL);
    try {
        const parsedQuery: LatitudeLongitudeDTO = await latitudeLongitudeSchema.parseAsync(req.query);
        REVERSE_URL.search = new URLSearchParams({
            lat: parsedQuery.lat.toString(),
            lon: parsedQuery.lng.toString(),
            format: "json"
        }).toString();
        const response = await fetch(REVERSE_URL, { headers: { "User-Agent": USER_AGENT } });
        if (!response.ok) {
            throw new Error("Can't contact " + REVERSE_URL + ": " + response.statusText);
        }
        const data = await response.json();
        if (!data || !data.display_name || !data.address) {
            return res.status(404).json({ message: "No location information found" });
        }
        return res.status(200).json({
            address: {
                street: data.address.road,
                houseNumber: data.address.house_number,
                city: data.address.city || data.address.town || data.address.village,
                postalCode: data.address.postcode,
                region: data.address.region || data.address.state,
                country: data.address.country
            }
        });
    } catch (error) {
        console.log("Error: " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
}
