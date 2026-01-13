import { Project } from "@/domain/project";
import {
  CreateProjectData,
  GetProjectsOptions,
  UpdateProjectData,
} from "@/domain/project.dto";
import {
  createProject,
  getProjectById,
  getProjects,
  updateProject,
} from "@/repositories/project.repo";

/**
 * Creates a new project
 * @param {CreateProjectData} createProjectData Project data object
 * @returns {Promise<Project>} Created project
 */
export async function createProjectService(
  createProjectData: CreateProjectData
): Promise<Project> {
  return createProject(createProjectData);
}

/**
 * Get available projects
 * @param {GetProjectData} getProjectData Object containing filter options
 * @returns {Promise<Project[]>} a list of projects
 */
export async function getProjectsService(
  getProjectData: GetProjectsOptions
): Promise<Project[]> {
  return getProjects(getProjectData);
}

/**
 *  Get a single project by project Id
 * @param {string} projectId requested projectId
 * @returns {Promise<Project>} found project
 */
export async function getProjectByIdService(
  projectId: string
): Promise<Project> {
  return getProjectById(projectId);
}

/**
 * Updates an existing project
 * @param {string} projectId requested projectId
 * @param {UpdateProjectData} updateProjectData Project data object
 * @returns {Promise<Project>} found project
 */
export async function updateProjectByIdService(
  projectId: string,
  updateProjectData: UpdateProjectData
): Promise<Project> {
  return updateProject(projectId, updateProjectData);
}
