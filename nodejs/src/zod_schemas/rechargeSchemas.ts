import { z } from 'zod';

export const rechargeSchema = z.object({
    carId: z.string()
});

export type RechargeDTO = z.infer<typeof rechargeSchema>;
