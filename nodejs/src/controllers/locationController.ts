import type { Request, Response } from 'express';
import { z, ZodError } from 'zod';

// GET /location/resolve
export const resolveAddressToCoordinates = async (req: Request, res: Response): Promise<Response> => {
    console.log("resolveAddressToCoordinates");
    const RESOLVE_URL = new URL("https://nominatim.openstreetmap.org/search");
    const USER_AGENT = "ChargeAndTrack/1.0";
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
            lat: Number(data[0].lat),
            lng: Number(data[0].lon)
        });
    } catch (error) {
        console.log("Error: " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
};
