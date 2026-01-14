import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const ProjectsResponseSchema = z.object({
  data: z.array(ProjectSchema),
});

export type Project = z.infer<typeof ProjectSchema>;
