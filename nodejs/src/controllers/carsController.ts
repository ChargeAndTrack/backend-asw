import type { Request, RequestHandler, Response } from "express";
import type { Car } from "../models/car.ts";
import { userModel } from "../models/user.ts";

// GET /cars
export const readUserCars = async (req: Request, res: Response): Promise<Response> => {
    console.log("readUserCars");
    console.log("UserId: " + req.body.user.id + " Username: " + req.body.user.username + " Role: " + req.body.user.role);
    try {
        const user = await userModel.findById(req.body.user.id).select("cars");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Found user: ", user);
        return res.status(200).json({ cars: user.cars });
    } catch (err) {
        console.log("Error:", err);
        return res.sendStatus(500);
    }
};

// POST /cars
export const addUserCar = async (req: Request, res: Response): Promise<Response> => {
    console.log("addUserCar");
    console.log("UserId: " + req.body.user.id + " Username: " + req.body.user.username + " Role: " + req.body.user.role);
    try {
        // TODO check input
        const car: Car = {
            plate: req.body.plate,
            maxBattery: req.body.maxBattery
        };
        const user = await userModel.findByIdAndUpdate(
            req.body.user.id,
            { $push: { cars: car } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(201).json(user.cars?.at(-1));
    } catch (err) {
        console.log("Error:", err);
        return res.sendStatus(500);
    }
};

// GET /cars/:id
export const readCar = async (req: Request, res: Response): Promise<Response> => {
    console.log("readCar");
    console.log("Car ID: " + req.params["id"]);
    console.log("UserId: " + req.body.user.id + " Username: " + req.body.user.username + " Role: " + req.body.user.role);
    try {
        const userWithCar = await userModel.findOne(
            { _id: req.body.user.id, "cars._id": req.params["id"] },
            { cars: { $elemMatch: { _id: req.params["id"] } } }
        );
        if (!userWithCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        console.log("Found car: ", userWithCar.cars?.[0]);
        return res.json(userWithCar.cars?.[0]);
    } catch (err) {
        console.log("Error:", err);
        return res.sendStatus(500);
    }
};

// PUT /cars/:id
export const updateCar = async (req: Request, res: Response): Promise<Response> => {
    console.log("updateCar");
    return res.sendStatus(200);
};

// DELETE /cars/:id
export const deleteCar = async (req: Request, res: Response): Promise<Response> => {
    console.log("deleteCar");
    return res.sendStatus(200);
};