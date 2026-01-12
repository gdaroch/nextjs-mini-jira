import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().min(2).max(80),
  description: z.string().max(500).optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export const GetProjectsSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  sortBy: z.enum(["name", "createdAt", "updatedAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type GetProjectsInput = z.infer<typeof GetProjectsSchema>;

export const GetProjectByIdSchema = z.object({
  projectId: z.string().min(1),
});

export type GetProjectByIdInput = z.infer<typeof GetProjectByIdSchema>;
