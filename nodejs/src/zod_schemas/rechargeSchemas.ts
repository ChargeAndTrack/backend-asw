import { z } from 'zod';

export const startRechargeSchema = z.object({
    carId: z.string()
});

export type StartRechargeDTO = z.infer<typeof startRechargeSchema>;
