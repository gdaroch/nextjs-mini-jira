import { z } from "zod";

export const CreateProjectSchema = z
  .object({
    name: z.string().min(2).max(80),
    description: z.string().max(500).optional(),
  })
  .strict();

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export const GetProjectsSchema = z
  .object({
    limit: z.coerce.number().min(1).max(50).default(20),
    sortBy: z.enum(["name", "createdAt", "updatedAt"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict();

export type GetProjectsInput = z.infer<typeof GetProjectsSchema>;

export const GetProjectByIdSchema = z
  .object({
    projectId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid projectId"),
  })
  .strict();

export type GetProjectByIdInput = z.infer<typeof GetProjectByIdSchema>;

export const UpdateProjectSchema = z
  .object({
    name: z.string().min(2).max(80).optional(),
    description: z.string().max(500).optional(),
  })
  .strict();

export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
