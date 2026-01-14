import type { Facility } from "./facility.ts";
import mongoose from "mongoose";

export interface ChargingStation extends Facility {
    power: number; // in kW
    available: boolean;
    enabled: boolean;
}

const chargingStationSchema = new mongoose.Schema<ChargingStation>({
    power: { type: Number, required: true },
    available: { type: Boolean, default: true },
    enabled: { type: Boolean, default: true }
}, { versionKey: false });

export const chargingStationModel = mongoose.model('ChargingStation', chargingStationSchema);
