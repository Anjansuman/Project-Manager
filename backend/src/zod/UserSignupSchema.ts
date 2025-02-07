
import z from "zod";

export const UserSignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username must be less than 30 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.string().optional()
})