import type { Request, Response } from 'express';
import { chargingStationModel, type ChargingStation } from '../models/chargingStation.ts';
import { addChargingStationSchema, updateChargingStationSchema } from '../zod_schemas/chargingStationsSchemas.ts';
import type { AddChargingStationDTO, UpdateChargingStationDTO } from '../zod_schemas/chargingStationsSchemas.ts';
import { ZodError } from 'zod';
import { closestChargingStationsSchema, nearChargingStationsSchema } from '../zod_schemas/locationSchemas.ts';
import type { ClosestChargingStationsDTO, NearChargingStationsDTO } from '../zod_schemas/locationSchemas.ts';
import type { LlmFiltersSchema } from '../zod_schemas/llmSchemas.ts';
import { Roles, type Role } from '../models/user.ts';

// GET /charging-stations
export const listChargingStations = async (req: Request, res: Response): Promise<Response> => {
    console.log("List charging stations request");
    try {
        const chargingStation = await chargingStationModel.find();
        return res.status(200).json(chargingStation);
    } catch (error) {
        return res.sendStatus(500);
    }
};

// POST /charging-stations
export const addChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("Add charging station request");
    try {
        const parsedBody: AddChargingStationDTO = await addChargingStationSchema.parseAsync(req.body);
        const chargingStation = await chargingStationModel.insertOne(parsedBody);
        return res.status(201).json(chargingStation);
    } catch (error) {
        console.log("Fail adding a charging station " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
};

// GET /charging-stations/:id
export const getChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("Get charging station with id " + req.params["id"]);
    try {
        const chargingStation = await chargingStationModel.findById(req.params["id"]);
        if (!chargingStation) {
            return res.status(404).json({ message: "Charging station not found" });
        }
        console.log("Charging station: " + chargingStation);
        return res.status(200).json(chargingStation);
    } catch (error) {
        console.log("Fail getting a charging station " + error);
        return res.sendStatus(500);
    }
};

// PUT /charging-stations/:id
export const updateChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("Update charging station with id " + req.params["id"]);
    try {
        const parsedBody: UpdateChargingStationDTO = await updateChargingStationSchema.parseAsync(req.body);
        const chargingStation = await chargingStationModel.findByIdAndUpdate(
            req.params["id"],
            parsedBody,
            { new: true, runValidators: true }
        );
        if (!chargingStation) {
            return res.status(404).json({ message: "Charging station not found" });
        }
        console.log("Updated charging station to " + chargingStation);
        return res.status(200).json(chargingStation);
    } catch (error) {
        console.log("Fail getting a charging station " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
};

// DELETE /charging-stations/:id
export const removeChargingStation = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log("Remove charging station request: " + req.params["id"]);
        const chargingStation = await chargingStationModel.findByIdAndDelete(req.params["id"]);
        if (!chargingStation) {
            return res.status(404).json({ message: "Charging station not found" });
        }
        console.log("Removed charging station: " + chargingStation);
        return res.status(200).json({ message: "Charging station successfully removed" });
    } catch (error) {
        console.log("Fail removing a charging station " + error);
        return res.sendStatus(500);
    }
};

// GET /charging-stations/near
export const getNearbyChargingStations = async (req: Request, res: Response): Promise<Response> => {
    console.log("getNearbyChargingStations");
    try {
        const parsedQuery: NearChargingStationsDTO = await nearChargingStationsSchema.parseAsync(req.query);
        return res.status(200).json(await getNearbyCS(req.user.role as Role, parsedQuery));
    } catch (error) {
        console.log("Error: " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        if (error instanceof Error && error.message === "Only admin users can view disabled charging stations") {
            return res.status(403).json({ message: error.message });
        }
        return res.sendStatus(500);
    }
};

export async function getNearbyCS(role: Role, data: NearChargingStationsDTO, llmFilters: LlmFiltersSchema = {})
        : Promise<ChargingStation[]> {
    const EARTH_RADIUS_METERS = 6378137;
    const onlyEnabled = getOnlyEnabledIfAllowed(data.onlyEnabled, role);
    return await chargingStationModel.find(
        {
            location: {
                $geoWithin: {
                    $centerSphere: [[data.lng, data.lat], data.radius / EARTH_RADIUS_METERS]
                }
            },
            ...(onlyEnabled ? { enabled: true } : {}),
            ...(llmFilters.minPowerKw ? { power: { $gte: llmFilters.minPowerKw } } : {}),
        },
        { ...(onlyEnabled ? { enabled: 0  } : {}) }
    );
}

// GET /charging-stations/closest
export const getClosestChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("getClosestChargingStation");
    try {
        const parsedQuery: ClosestChargingStationsDTO = await closestChargingStationsSchema.parseAsync(req.query);
        const stations = await getClosestCS(req.user.role as Role, parsedQuery);
        if (stations.length === 0) {
            return res.status(404).json({ error: "No charging stations found" });
        }
        return res.status(200).json(stations[0]);
    } catch (error) {
        console.log("Error: " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        if (error instanceof Error && error.message === "Only admin users can view disabled charging stations") {
            return res.status(403).json({ message: error.message });
        }
        return res.sendStatus(500);
    }
};

export async function getClosestCS(role: Role, data: ClosestChargingStationsDTO, filters: LlmFiltersSchema = {}) {
    const onlyEnabledAndAvailable = getOnlyEnabledIfAllowed(data.onlyEnabledAndAvailable, role);
    return await chargingStationModel.aggregate([
        {
            $geoNear: {
                key: "location",
                near: { type: "Point", coordinates: [data.lng, data.lat] },
                distanceField: "distance",
                spherical: true,
                query: {
                    ...((onlyEnabledAndAvailable ? { enabled: true, available: true } : {})),
                    ...(filters.minPowerKw ? { power: { $gte: filters.minPowerKw } } : {}),
                }
            },
        },
        { $limit: 1 },
        ...(onlyEnabledAndAvailable ? [{ $project: { enabled: 0 } }] : [])
    ]);
}

function getOnlyEnabledIfAllowed(onlyEnabledIntent: boolean | undefined, role: Role): boolean {
    let onlyEnabled = true;
    if (onlyEnabledIntent === false && role !== Roles.Admin) {
        throw new Error("Only admin users can view disabled charging stations");
    } else if (onlyEnabledIntent === false && role === Roles.Admin) {
        onlyEnabled = false;
    }
    return onlyEnabled;
}
