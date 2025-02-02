import z from "zod";

export const NewOrgSchema = z.object({
    name: z.string(),
    logo: z.string().optional()
})