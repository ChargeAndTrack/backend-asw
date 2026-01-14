import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';

// GET /chargingStations
export const listChargingStations = async (req: Request, res: Response): Promise<Response> => {
    console.log("List charging stations request");
    try {
        const chargingStation = await chargingStationModel.find();
        return res.status(200).json(chargingStation);
    } catch (error) {
        return res.send(error)
    }
};

// POST /chargingStations
export const addChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("Add charging station request");
    try {
        const chargingStation = await chargingStationModel.insertOne({
            power: req.body.power,
            available: req.body.available,
            enabled: req.body.enabled
        });
        console.log("Added charging station: " + chargingStation);
        return res.sendStatus(200);
    } catch (error) {
        console.log("Fail adding a charging station " + error);
        return res.status(400).send("Fail adding a charging station");
    }
};

// GET /chargingStations/:id
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

// PUT /chargingStations/:id
export const updateChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("Update charging station");
    return res.sendStatus(200);
};

// DELETE /chargingStations/:id
export const removeChargingStation = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log("Remove charging station request: " + req.params["id"]);
        const chargingStation = await chargingStationModel.findByIdAndDelete(req.params["id"]);
        if (!chargingStation) {
            return res.status(404).send("Charging station not found")
        }
        console.log("Removed charging station: " + chargingStation);
        return res.sendStatus(200);
    } catch (error) {
        console.log("Fail removing a charging station " + error);
        return res.sendStatus(500);
    }
};
