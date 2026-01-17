import { Queue } from 'bullmq';
import { calculateTimeForOnePercent } from '../models/rechargeLogic.ts';
import { userModel, type User } from '../models/user.ts';
import type { Request, Response } from 'express';
import { chargingStationModel } from '../models/chargingStation.ts';
import config from '../config/config.ts';
import { startRechargeSchema, type StartRechargeDTO } from '../zod_schemas/rechargeSchemas.ts';
import { randomInt } from 'node:crypto';

const chargingQueue = new Queue('charging-queue', {
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

    const parsedBody: StartRechargeDTO = await startRechargeSchema.parseAsync(req.body);
    const userWithCar = await userModel.findOneAndUpdate(
        { _id: userId, "cars._id": parsedBody.carId },
        { $set: { "cars.$.currentBattery": randomInt(99)}},
        { new: true, runValidators: true }
    ).select({ cars: { $elemMatch: { _id: parsedBody.carId } } }).lean<User>();
    if (!userWithCar) {
        return res.status(404).json({ message: "Car not found" });
    }
    const interval = calculateTimeForOnePercent(chargingStation.power, userWithCar!.cars!.at(0)!.maxBattery);
    await chargingQueue.add(`charge-${parsedBody.carId}`, { userId: userId, carId: parsedBody.carId }, {
        repeat: { every: interval },
        jobId: parsedBody.carId
    });
    res.status(200).json({ message: "Charging started", intervalMs: interval });
};
