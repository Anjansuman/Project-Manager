import z from "zod";

export const AddProjectSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    projectImg: z.string().optional(),
    deadline: z.date().optional(),
    leader: z.string(),
    members: z.array(z.string())
})