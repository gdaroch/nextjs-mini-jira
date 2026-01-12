import {
  CreateProjectInput,
  GetProjectsInput,
} from "@/lib/schemas/project.schema";
import { createProject, getProjects } from "@/repositories/project.repo";
import { Project } from "@/domain/project";

/**
 * Creates a new project
 * @param {CreateProjectInput} input Validated project data
 * @returns {Promise<Project>} Created project
 */
export async function createProjectService(
  input: CreateProjectInput
): Promise<Project> {
  const project = await createProject(input);

  return project;
}

/**
 * Get available projects
 * @param {GetProjectsInput} input Validated filters
 * @returns {Promise<Project[]>} a list of projects
 */
export async function getProjectsService(
  input: GetProjectsInput
): Promise<Project[]> {
  const projects = await getProjects(
    input.limit,
    input.sortBy,
    input.sortOrder
  );

  return projects;
}
