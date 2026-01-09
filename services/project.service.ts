import { CreateProjectInput } from "@/lib/schemas/project.schema";
import { createProject } from "@/repositories/project.repo";
import { Project } from "@/domain/project";

/**
 * Creates a new project
 * @param input Validated project data
 * @returns Created project
 */
export async function createProjectService(
  input: CreateProjectInput
): Promise<Project> {
  const project = await createProject(input);
  return project;
}
