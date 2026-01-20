import { Worker, Job } from 'bullmq';
import { updateCarLogic, UpdateCarMethod } from '../models/user.ts';
import { io } from '../socket.ts';
import config from '../config/config.ts';
import { rechargeQueue } from './rechargeController.ts';
import { chargingStationModel } from '../models/chargingStation.ts';

export let worker: Worker;

export const rechargeWorker = () => {
    worker = new Worker('recharge-queue', async (job: Job) => {
        const { userId, carId, chargingStationId } = job.data;
        const userWithCar = await updateCarLogic(
            userId,
            carId,
            UpdateCarMethod.Inc,
            { "cars.$.currentBattery": 1 }
        );
        if (!userWithCar) {
            throw new Error("Car not found");
        }
        const currentBattery: number | undefined = userWithCar!.cars[0]!.currentBattery;
        if (currentBattery) {
            io.to(`car_${carId}`).emit('rechargeUpdate', { level: currentBattery });
            console.log("Battery update to " + currentBattery);
            if (currentBattery >= 100) {
                const chargingStation = await chargingStationModel.findByIdAndUpdate(
                    chargingStationId,
                    { $set: { "available": true } },
                    { new: true, runValidators: true }
                );
                if (!chargingStation) {
                    throw new Error("Charging station not found");
                }
                job.repeatJobKey ?
                    await rechargeQueue.removeJobScheduler(job.repeatJobKey) :
                    await rechargeQueue.removeJobScheduler(carId);
                return { status: 'Recharge complete' };
            }
            return { status: 'In charge' };
        } else {
            throw new Error("Car has no currentBattery value");
        }
    }, {
        connection: {
            host: config.redisHost,
            port: config.redisPort,
            maxRetriesPerRequest: null
        }
    });
    return worker;
};
