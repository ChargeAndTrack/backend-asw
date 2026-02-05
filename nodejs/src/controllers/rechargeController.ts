import { calculateTimeForOnePercent } from '../models/rechargeLogic.ts';
import { getUserCar, updateCarLogic, UpdateCarMethod } from '../models/user.ts';
import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';
import { rechargeSchema, type RechargeDTO } from '../zod_schemas/rechargeSchemas.ts';
import { randomInt } from 'node:crypto';
import { Queue } from 'bullmq';
import config from '../config/config.ts';
import { io } from '../socket.ts';
import { ZodError } from 'zod/v3';

export const rechargeQueue = new Queue('recharge-queue', {
    connection: {
        host: config.redisHost,
        port: config.redisPort,
        maxRetriesPerRequest: null
    }
});

// POST /charging-stations/:id/start-recharge
export const startRecharge = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = req.user.id;
        const chargingStation = await chargingStationModel.findById(req.params["id"]);
        if (!chargingStation) {
            return res.status(404).json({ message: "Charging station not found" });
        }
        if (!chargingStation.available) {
            return res.status(400).json({ message: "Charging station not available" });
        }
        const parsedBody: RechargeDTO = await rechargeSchema.parseAsync(req.body);
        const userWithCar = await getUserCar(userId, parsedBody.carId);
        if (!userWithCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        if (userWithCar.cars.at(0)?.currentChargingStationId) {
            return res.status(400).json({ message: "Car is already charging" });
        }
        await updateCarLogic(
            userId,
            parsedBody.carId,
            UpdateCarMethod.Set,
            { "cars.$.currentBattery": randomInt(99), "cars.$.currentChargingStationId": chargingStation._id }
        );
        const updatedChargingStation = await chargingStationModel.findByIdAndUpdate(
            req.params["id"],
            { $set: { "available": false, "currentCarId": parsedBody.carId } },
            { new: true, runValidators: true }
        );
        if (!updatedChargingStation) {
            return res.sendStatus(500);
        }
        io.to(`chargingStation:${chargingStation._id}`).emit("charging-station-updated", { id: chargingStation._id });
        const interval = calculateTimeForOnePercent(chargingStation.power, userWithCar.cars.at(0)!.maxBattery);
        await rechargeQueue.add(
            `recharge_${parsedBody.carId}`,
            { userId: userId, carId: parsedBody.carId, chargingStationId: req.params["id"] },
            { repeat: { every: interval }, jobId: parsedBody.carId }
        );
        res.status(200).json({ message: "Start recharge", intervalMs: interval });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
};

// POST /charging-stations/:id/stop-recharge
export const stopRecharge = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const parsedBody: RechargeDTO = await rechargeSchema.parseAsync(req.body);
        const schedulers = await rechargeQueue.getJobSchedulers();
        if (schedulers) {
            const chargingStation = await chargingStationModel.findById(req.params["id"]);
            if (!chargingStation) {
                return res.status(404).json({ message: "Charging station not found" });
            }
            if (chargingStation.currentCarId && chargingStation.currentCarId.toString() !== parsedBody.carId) {
                return res.status(400).json({ message: "The specified car is not charging at the specified station" });
            }
            const updatedChargingStation = await chargingStationModel.findOneAndUpdate(
                { _id: req.params["id"], available: false },
                { $set: { "available": true }, $unset: { currentCarId: "" } },
                { new: true, runValidators: true }
            );
            if (!updatedChargingStation) {
                return res.status(400).json({ message: "Charging station not currently charging" });
            }
            const userWithCar = await updateCarLogic(
                req.user.id,
                parsedBody.carId,
                UpdateCarMethod.Unset,
                { "cars.$.currentChargingStationId": "" }
            );
            if (!userWithCar) {
                return res.status(404).json({ message: "Car not found" });
            }
            rechargeQueue.removeJobScheduler(schedulers.find(s => s.name === `recharge_${parsedBody.carId}`)?.key!)
            io.to(`chargingStation:${chargingStation._id}`)
                .emit("charging-station-updated", { id: chargingStation._id });
            res.status(200).json({ message: "Stop recharge" });
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid request data"});
        }
        return res.sendStatus(500);
    }
};
