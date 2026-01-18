import { Worker, Job } from 'bullmq';
import { updateCarLogic, UpdateCarMethod } from '../models/user.ts';
import { io } from '../server.ts';
import config from '../config/config.ts';

export const rechargeWorker = () => {
    return new Worker('charging-queue', async (job: Job) => {
        const { userId, carId } = job.data;
        const userWithCar = await updateCarLogic(userId, carId, UpdateCarMethod.Inc, { "cars.$.currentBattery": 1 });
        if (!userWithCar) {
            throw new Error("Car not found");
        }
        // io.to(`car_${carId}`).emit('batteryUpdate', { level: car.currentBattery });
        io.to(`recharge`).emit('batteryUpdate', { level: userWithCar!.cars[0]!.currentBattery });
        console.log("Battery update to " + userWithCar!.cars[0]!.currentBattery);
        if (userWithCar!.cars[0]!.currentBattery && userWithCar!.cars[0]!.currentBattery >= 100) {
            return { status: 'Completed' };
        }
        return { status: 'In charge' };
    }, {
        connection: {
            host: config.redisHost,
            port: config.redisPort,
            maxRetriesPerRequest: null
        }
    });
};
