import { z } from 'zod';

const longitudeSchema = z.coerce.number().min(-180).max(180);
const latitudeSchema = z.coerce.number().min(-90).max(90);

export const geoPointSchema = z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([longitudeSchema, latitudeSchema])
});

export const nearChargingStationsSchema = z.object({
    lng: longitudeSchema,
    lat: latitudeSchema,
    radius: z.coerce.number().positive()
});

export type NearChargingStationsDTO = z.infer<typeof nearChargingStationsSchema>;

export const closestChargingStationSchema = z.object({
    lng: longitudeSchema,
    lat: latitudeSchema
});

export type ClosestChargingStationDTO = z.infer<typeof closestChargingStationSchema>;
