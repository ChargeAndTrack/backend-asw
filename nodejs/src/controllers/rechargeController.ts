import { calculateTimeForOnePercent } from '../models/rechargeLogic.ts';
import { updateCarLogic, UpdateCarMethod } from '../models/user.ts';
import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';
import { rechargeSchema, type RechargeDTO } from '../zod_schemas/rechargeSchemas.ts';
import { randomInt } from 'node:crypto';
import { Queue } from 'bullmq';
import config from '../config/config.ts';

export const rechargeQueue = new Queue('recharge-queue', {
    connection: {
        host: config.redisHost,
        port: config.redisPort,
        maxRetriesPerRequest: null
    }
});

// POST /charging-stations/:id/start-recharge
export const startRecharge = async (req: Request, res: Response): Promise<Response | void> => {
    const userId = req.user.id;
    const chargingStation = await chargingStationModel.findById(req.params["id"]);
    if (!chargingStation) {
        return res.status(404).json({ message: "Charging station not found" });
    }
    if (!chargingStation.available) {
        return res.status(400).json({ message: "Charging station not available" });
    }
    const parsedBody: RechargeDTO = await rechargeSchema.parseAsync(req.body);
    const userWithCar = await updateCarLogic(
        userId,
        parsedBody.carId,
        UpdateCarMethod.Set,
        { "cars.$.currentBattery": randomInt(99) }
    );
    if (!userWithCar) {
        return res.status(404).json({ message: "Car not found" });
    }
    await chargingStationModel.findByIdAndUpdate(req.params["id"], { $set: { "available": false } });
    const interval = calculateTimeForOnePercent(chargingStation.power, userWithCar!.cars!.at(0)!.maxBattery);
    await rechargeQueue.add(
        `recharge_${parsedBody.carId}`,
        { userId: userId, carId: parsedBody.carId, chargingStationId: req.params["id"] },
        { repeat: { every: interval }, jobId: parsedBody.carId }
    );
    res.status(200).json({ message: "Start recharge", intervalMs: interval });
};

// POST /charging-stations/:id/stop-recharge
export const stopRecharge = async (req: Request, res: Response): Promise<Response | void> => {
    const parsedBody: RechargeDTO = await rechargeSchema.parseAsync(req.body);
    const schedulers = await rechargeQueue.getJobSchedulers();
    if (schedulers) {
        const chargingStation = await chargingStationModel.findOneAndUpdate(
            { _id: req.params["id"], available: false },
            { $set: { "available": true } },
            { new: true, runValidators: true }
        );
        if (!chargingStation) {
            return res.status(404).json({ message: "Charging station not found or not currently charging" });
        }
        rechargeQueue.removeJobScheduler(schedulers.find(s => s.name === `recharge_${parsedBody.carId}`)?.key!);
        res.status(200).json({ message: "Stop recharge" });
    }
};
