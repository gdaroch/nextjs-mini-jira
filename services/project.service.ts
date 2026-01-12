import {
  CreateProjectInput,
  GetProjectsInput,
  GetProjectByIdInput,
} from "@/lib/schemas/project.schema";
import {
  createProject,
  getProjects,
  getProjectById,
} from "@/repositories/project.repo";
import { Project } from "@/domain/project";

/**
 * Creates a new project
 * @param {CreateProjectInput} input Validated project data
 * @returns {Promise<Project>} Created project
 */
export async function createProjectService(
  input: CreateProjectInput
): Promise<Project> {
  return createProject(input);
}

/**
 * Get available projects
 * @param {GetProjectsInput} input Validated filters
 * @returns {Promise<Project[]>} a list of projects
 */
export async function getProjectsService(
  input: GetProjectsInput
): Promise<Project[]> {
  return getProjects(input.limit, input.sortBy, input.sortOrder);
}

/**
 *  Get a single project by project Id
 * @param {GetProjectByIdInput} input Validated object with projectId
 * @returns {Promise<Project>} found project
 */
export async function getProjectByIdService(input: GetProjectByIdInput) {
  return getProjectById(input.projectId);
}
