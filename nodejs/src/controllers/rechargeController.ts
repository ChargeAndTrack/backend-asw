import { calculateTimeForOnePercent } from '../models/rechargeLogic.ts';
import { updateCarLogic, UpdateCarMethod } from '../models/user.ts';
import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';
import { rechargeSchema, type RechargeDTO } from '../zod_schemas/rechargeSchemas.ts';
import { randomInt } from 'node:crypto';
import { Queue } from 'bullmq';
import config from '../config/config.ts';
import { io } from '../server.ts';

export const rechargeQueue = new Queue('recharge-queue', {
    connection: {
        host: config.redisHost,
        port: config.redisPort,
        maxRetriesPerRequest: null
    }
});

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
    io.emit('start-recharge', `car_${parsedBody.carId}`);
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
    await rechargeQueue.add(`recharge_${parsedBody.carId}`, { userId: userId, carId: parsedBody.carId }, {
        repeat: { every: interval },
        jobId: parsedBody.carId
    });
    res.status(200).json({ message: "Charging started", intervalMs: interval });
};
