import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';
import { addChargingStationSchema, updateChargingStationSchema } from '../zod_schemas/chargingStationsSchemas.ts';
import type { AddChargingStationDTO, UpdateChargingStationDTO } from '../zod_schemas/chargingStationsSchemas.ts';
import { ZodError } from 'zod';

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
