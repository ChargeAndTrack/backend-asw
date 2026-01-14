import type { Request, RequestHandler, Response } from "express";
import { userModel } from "../models/user.ts";

// GET /cars
export const readUserCars: RequestHandler = (req: Request, res: Response) => {
    console.log("readUserCars");
    res.sendStatus(200);
};

// POST /cars
export const addUserCar: RequestHandler = (req: Request, res: Response) => {
    console.log("addUserCar");
    res.sendStatus(200);
};

// GET /cars/:id
export const readCar: RequestHandler = (req: Request, res: Response) => {
    console.log("readCar");
    res.sendStatus(200);
};

// PUT /cars/:id
export const updateCar: RequestHandler = (req: Request, res: Response) => {
    console.log("updateCar");
    res.sendStatus(200);
};

// DELETE /cars/:id
export const deleteCar: RequestHandler = (req: Request, res: Response) => {
    console.log("deleteCar");
    res.sendStatus(200);
};