import mongoose from 'mongoose';

export interface Car {
    plate: string;
    maxBattery: number; // in kWh
    currentBattery?: number; // in percentage
    currentChargingStationId?: mongoose.Schema.Types.ObjectId;
}

export const carSchema = new mongoose.Schema<Car>({
    plate: { type: String, required: true },
    maxBattery: { type: Number, required: true },
    currentBattery: { type: Number },
    currentChargingStationId: { type: mongoose.Schema.Types.ObjectId }
});