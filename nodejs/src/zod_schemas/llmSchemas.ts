import { z } from 'zod';

export const llmFiltersSchema = z.object({
    minPowerKw: z.number().positive().optional()
});

export type LlmFiltersSchema = z.infer<typeof llmFiltersSchema>;

export const llmResponseSchema = z.object({
    intent: z.enum(["NEAR", "CLOSEST"]), 
    address: z.string().min(3),
    filters: llmFiltersSchema.optional()
});

export type LlmResponseSchema = z.infer<typeof llmResponseSchema>;
