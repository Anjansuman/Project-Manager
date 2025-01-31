import z from 'zod';

export const UserSigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
})