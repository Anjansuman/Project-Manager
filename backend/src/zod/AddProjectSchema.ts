import z from "zod";

export const AddProjectSchema = z.object({
    title: z.string(),
    description: z.union([z.string(), z.null()]).optional(),
    projectImg: z.union([z.string(), z.null()]).optional(),
    deadline: z.union([z.date(), z.string(), z.null()]).optional(),
    completion: z.union([z.string(), z.null()]).optional(),
    // leader: z.string(),
    members: z.array(z.string()).optional(),
    orgId: z.string().optional()
})