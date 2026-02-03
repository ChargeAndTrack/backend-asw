import { z } from 'zod';

const plate = z.string()
    .toUpperCase()
    .min(3).max(10)
    .regex(/^[A-Z0-9 -]+$/, "Invalid plate format");

export const addCarSchema = z.object({
    plate: plate,
    maxBattery: z.number()
});

export type AddCarDTO = z.infer<typeof addCarSchema>;

export const updateCarSchema = z.object({
    plate: plate.optional(),
    maxBattery: z.number().optional(),
    currentBattery: z.number().min(0).max(100).optional()
});

export type UpdateCarDTO = z.infer<typeof updateCarSchema>;
