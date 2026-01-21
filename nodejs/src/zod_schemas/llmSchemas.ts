import { z } from 'zod';

export const filtersSchema = z.object({
    minPowerKw: z.number().positive().optional()
});

export type FiltersSchema = z.infer<typeof filtersSchema>;

export const llmResponseSchema = z.object({
    intent: z.enum(["NEAR", "CLOSEST"]), 
    address: z.string().min(3),
    filters: filtersSchema.optional()
});

export type LlmResponseSchema = z.infer<typeof llmResponseSchema>;
