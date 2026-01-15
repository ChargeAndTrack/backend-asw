import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
});

export type LoginDTO = z.infer<typeof loginSchema>;
