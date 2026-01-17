import { z } from 'zod';
import { geoPointSchema } from './locationSchemas.ts';

export const addChargingStationSchema = z.object({
    power: z.number(),
    location: geoPointSchema
});

export type AddChargingStationDTO = z.infer<typeof addChargingStationSchema>;

export const updateChargingStationSchema = z.object({
    power: z.number().optional(),
    available: z.boolean().optional(),
    enabled: z.boolean().optional(),
    location: geoPointSchema.optional()
});

export type UpdateChargingStationDTO = z.infer<typeof updateChargingStationSchema>;
