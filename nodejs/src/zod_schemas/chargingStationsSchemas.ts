import { z } from 'zod';

export const addChargingStationSchema = z.object({
    power: z.number(),
    available: z.boolean().optional(),
    enabled: z.boolean().optional()
});

export type AddChargingStationDTO = z.infer<typeof addChargingStationSchema>;

export const updateChargingStationSchema = z.object({
    power: z.number().optional(),
    available: z.boolean().optional(),
    enabled: z.boolean().optional()
});

export type UpdateChargingStationDTO = z.infer<typeof updateChargingStationSchema>;
