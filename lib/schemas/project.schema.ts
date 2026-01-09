import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().min(2).max(80),
  description: z.string().max(500).optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
