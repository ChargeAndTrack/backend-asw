import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';
import { addChargingStationSchema, updateChargingStationSchema } from '../zod_schemas/chargingStationsSchemas.ts';
import type { AddChargingStationDTO, UpdateChargingStationDTO } from '../zod_schemas/chargingStationsSchemas.ts';
import { ZodError } from 'zod';
import { closestChargingStationSchema, nearChargingStationsSchema } from '../zod_schemas/locationSchemas.ts';
import type { ClosestChargingStationDTO, NearChargingStationsDTO } from '../zod_schemas/locationSchemas.ts';

// GET /charging-stations
export const listChargingStations = async (req: Request, res: Response): Promise<Response> => {
    console.log("List charging stations request");
    try {
        const chargingStation = await chargingStationModel.find();
        return res.status(200).json(chargingStation);
    } catch (error) {
        return res.send(error)
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
            return res.status(404).send("Charging station not found");
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
            return res.status(404).send("Charging station not found");
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
            return res.status(404).send("Charging station not found")
        }
        console.log("Removed charging station: " + chargingStation);
        return res.status(200).send("Charging station successfully removed");
    } catch (error) {
        console.log("Fail removing a charging station " + error);
        return res.sendStatus(500);
    }
};

// GET /charging-stations/near
export const getNearbyChargingStations = async (req: Request, res: Response): Promise<Response> => {
    console.log("getNearbyChargingStations");
    const EARTH_RADIUS_METERS = 6378137;
    try {
        const parsedBody: NearChargingStationsDTO = await nearChargingStationsSchema.parseAsync(req.query);
        const stations = await chargingStationModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[parsedBody.lng, parsedBody.lat], parsedBody.radius / EARTH_RADIUS_METERS]
                }
            }
        });
        return res.status(200).json(stations);
    } catch (error) {
        console.log("Error: " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
};

// GET /charging-stations/closest
export const getClosestChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("getClosestChargingStation");
    try {
        const parsedBody: ClosestChargingStationDTO = await closestChargingStationSchema.parseAsync(req.query);
        const stations = await chargingStationModel.aggregate([
            {
                $geoNear: {
                    key: "location",
                    near: { type: "Point", coordinates: [parsedBody.lng, parsedBody.lat] },
                    distanceField: "distance",
                    spherical: true,
                    query: {
                        "location.type": "Point",
                        "location.coordinates": { $size: 2 }
                    }
                },
            },
            { $limit: 1 }
        ]);
        if (stations.length === 0) {
            return res.status(404).json({ error: "No charging stations found" });
        }
        return res.status(200).json(stations[0]);
    } catch (error) {
        console.log("Error: " + error);
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
};