import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30)
})

export type SignInSchema = z.infer<typeof SignInSchema>;