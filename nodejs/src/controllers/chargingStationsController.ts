import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';

// GET /chargingStations
export const listChargingStations = async (req: Request, res: Response): Promise<Response> => {
    console.log("Get charging stations");
    return res.sendStatus(200);
};

// POST /chargingStations
export const addChargingStation = async (req: Request, res: Response): Promise<Response> => {
    console.log("Add charging station");
    return res.sendStatus(200);
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
