import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';

// GET /chargingStations
export const listChargingStations = async (req: Request, res: Response): Promise<Response> => {
    try {
        const chargingStation = await chargingStationModel.find();
        return res.json(chargingStation);
    } catch (error) {
        return res.send(error)
    }
};

// POST /chargingStations
export const addChargingStation = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log("Add charging station request: " + req.body.power);
        const chargingStation = await chargingStationModel.insertOne({
            power: req.body.power,
            available: req.body.available,
            enabled: req.body.enabled
        });
        console.log("Added charging station: " + chargingStation);
        return res.sendStatus(200);
    } catch (error) {
        console.log("Fail adding a chargin station " + error);
        return res.status(400).send("Fail adding a chargin station");
    }
};

// GET /chargingStations/:id
export const getChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("Get charging station");
    return res.sendStatus(200);
};

// PUT /chargingStations/:id
export const updateChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("Update charging station");
    return res.sendStatus(200);
};
