import { z } from 'zod';

export const llmResponseSchema = z.object({
    intent: z.enum(["NEAR", "CLOSEST"]), 
    address: z.string().min(3),
    filters: z.object({
        minPowerKw: z.number().positive().optional()
    }).optional()
});

export type LlmResponseSchema = z.infer<typeof llmResponseSchema>;
