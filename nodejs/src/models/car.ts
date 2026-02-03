import mongoose from 'mongoose';

export interface Car {
    plate: string;
    maxBattery: number; // in kWh
    currentBattery?: number; // in percentage
    isCharging: boolean;
}

export const carSchema = new mongoose.Schema<Car>({
    plate: { type: String, required: true },
    maxBattery: { type: Number, required: true },
    currentBattery: { type: Number },
    isCharging: { type: Boolean, default: false }
});