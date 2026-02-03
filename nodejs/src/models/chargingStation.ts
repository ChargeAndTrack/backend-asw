import { type GeoPoint, geoPointSchema } from "./geoPoint.ts";
import mongoose from "mongoose";

export interface ChargingStation {
    power: number; // in kW
    available: boolean;
    enabled: boolean;
    location: GeoPoint;
    currentCarId?: mongoose.Types.ObjectId;
}

const chargingStationSchema = new mongoose.Schema<ChargingStation>({
    power: { type: Number, required: true },
    available: { type: Boolean, default: true },
    enabled: { type: Boolean, default: true },
    location: { type: geoPointSchema, required: true },
    currentCarId: { type: mongoose.Schema.Types.ObjectId }
}, { versionKey: false });

export const chargingStationModel = mongoose.model('ChargingStation', chargingStationSchema, 'chargingStations');
