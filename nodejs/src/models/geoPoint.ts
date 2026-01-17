import mongoose from 'mongoose';

type Longitude = number;
type Latitude = number;

export interface GeoPoint { // GeoJSON Point representation
    type: "Point";
    coordinates: [Longitude, Latitude];
}

export const geoPointSchema = new mongoose.Schema<GeoPoint>({
    type: { type: String, enum: ["Point"], required: true, default: "Point" },
    coordinates: { type: [Number], required: true,
        validate: {
            validator: (c: number[]) => c.length === 2,
            message: "Coordinates must be [lng, lat]"
        }
     }
}, { _id: false });