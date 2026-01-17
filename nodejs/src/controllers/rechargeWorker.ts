import { Worker, Job } from 'bullmq';
import { userModel } from '../models/user.ts';
import { io } from '../server.ts';
import config from '../config/config.ts';

export const rechargeWorker = () => {
    return new Worker('charging-queue', async (job: Job) => {
        const { userId, carId } = job.data;
        const car = await userModel.findOneAndUpdate(
            { _id: userId, "cars._id": carId },
            { $inc: { "cars.$.currentBattery": 1 } },
            { new: true, runValidators: true }
        ).select({ cars: { $elemMatch: { _id: carId } } });
        if (!car) {
            throw new Error("Car not found");
        }
        // io.to(`car_${carId}`).emit('batteryUpdate', { level: car.currentBattery });
        io.to(`recharge`).emit('batteryUpdate', { level: car!.cars[0]!.currentBattery });
        console.log("Battery update to " + car!.cars[0]!.currentBattery);
        if (car!.cars[0]!.currentBattery && car!.cars[0]!.currentBattery >= 100) {
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
