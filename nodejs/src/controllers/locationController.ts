import type { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { latitudeLongitudeSchema, type LatitudeLongitudeDTO } from '../zod_schemas/locationSchemas.ts';

const BASE_URL = new URL("https://nominatim.openstreetmap.org/");
const USER_AGENT = "ChargeAndTrack/1.0";

// GET /location/resolve
export const resolveAddressToCoordinates = async (req: Request, res: Response): Promise<Response> => {
    console.log("resolveAddressToCoordinates");
    try {
        const parsedQuery = await z.string().min(3).parseAsync(req.query['q']);
        const location: LatitudeLongitudeDTO = await resolveAddress(parsedQuery);
        return res.status(200).json(location);
    } catch (error) {
        console.log("Error: " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data" });
        }
        if (error instanceof Error && error.message === "Address not found") {
            return res.status(404).json({ message: error.message });
        }
        return res.sendStatus(500);
    }
};

export async function resolveAddress(address: string): Promise<LatitudeLongitudeDTO> {
    const RESOLVE_URL = new URL("search", BASE_URL);
    RESOLVE_URL.search = new URLSearchParams({
        q: address,
        format: "json",
        limit: "1"
    }).toString();
    const response = await fetch(RESOLVE_URL, { headers: { "User-Agent": USER_AGENT } });
    if (!response.ok) {
        throw new Error("Can't contact " + RESOLVE_URL + ": " + response.statusText);
    }
    const data = await response.json();
    if (!data.length) {
        throw new Error("Address not found");
    }
    return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
}

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
