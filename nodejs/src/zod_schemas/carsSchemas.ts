import { z } from 'zod';

export const addCarSchema = z.object({
    plate: z.string(),
    maxBattery: z.number()
});

export type AddCarDTO = z.infer<typeof addCarSchema>;

export const updateCarSchema = z.object({
    plate: z.string().optional(),
    maxBattery: z.number().optional(),
    currentBattery: z.number().optional()
});

export type UpdateCarDTO = z.infer<typeof updateCarSchema>;
