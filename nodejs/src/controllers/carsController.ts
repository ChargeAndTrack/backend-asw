import type { Request, Response } from "express";
import type { Car } from "../models/car.ts";
import { userModel } from "../models/user.ts";

// GET /cars
export const readUserCars = async (req: Request, res: Response): Promise<Response> => {
    console.log("readUserCars");
    console.log("UserId: " + req.user.id + " Username: " + req.user.username + " Role: " + req.user.role);
    try {
        const user = await userModel.findById(req.user.id).select("cars");
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
    console.log("UserId: " + req.user.id + " Username: " + req.user.username + " Role: " + req.user.role);
    try {
        // TODO check input
        const car: Car = {
            plate: req.body.plate,
            maxBattery: req.body.maxBattery
        };
        const user = await userModel.findByIdAndUpdate(
            req.user.id,
            { $push: { cars: car } },
            { new: true, runValidators: true }
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
    console.log("UserId: " + req.user.id + " Username: " + req.user.username + " Role: " + req.user.role);
    try {
        const userWithCar = await userModel.findOne(
            { _id: req.user.id, "cars._id": req.params["id"] },
            { cars: { $elemMatch: { _id: req.params["id"] } } }
        );
        if (!userWithCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        console.log("Found car: ", userWithCar.cars?.[0]);
        return res.status(200).json(userWithCar.cars?.[0]);
    } catch (err) {
        console.log("Error:", err);
        return res.sendStatus(500);
    }
};

// PUT /cars/:id
export const updateCar = async (req: Request, res: Response): Promise<Response> => {
    console.log("updateCar");
    console.log("Car ID: " + req.params["id"]);
    console.log("UserId: " + req.user.id + " Username: " + req.user.username + " Role: " + req.user.role);
    try {
        // TODO check input
        const set: Record<string, any> = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (key === "plate" || key === "maxBattery" || key === "currentBattery") {
                set[`cars.$.${key}`] = value;
            }
        }
        const userWithCar = await userModel.findOneAndUpdate(
            { _id: req.user.id, "cars._id": req.params["id"] },
            { $set: set },
            { new: true, runValidators: true }
        ).select({ cars: { $elemMatch: { _id: req.params["id"] } } });
        if (!userWithCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        return res.status(200).json(userWithCar.cars?.[0]);
    } catch (err) {
        console.log("Error:", err);
        return res.sendStatus(500);
    }
};

// DELETE /cars/:id
export const deleteCar = async (req: Request, res: Response): Promise<Response> => {
    console.log("deleteCar");
    console.log("Car ID: " + req.params["id"]);
    console.log("UserId: " + req.user.id + " Username: " + req.user.username + " Role: " + req.user.role);
    try {
        const user = await userModel.findOneAndUpdate(
            { _id: req.user.id, "cars._id": req.params["id"] },
            { $pull: { cars: { _id: req.params["id"] } } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "Car not found" });
        }
        return res.status(200).json({ message: "Car deleted successfully", cars: user.cars });
    } catch (err) {
        console.log("Error:", err);
        return res.sendStatus(500);
    }
};