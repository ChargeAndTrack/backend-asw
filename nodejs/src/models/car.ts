import mongoose from 'mongoose'

export interface Car {
    plate: string;
    maxBattery: number;
    currentBattery?: number;
}

export const carSchema = new mongoose.Schema<Car>({
    plate: {type: String, required: true},
    maxBattery: {type: Number, required: true},
    currentBattery: {type: Number}
});