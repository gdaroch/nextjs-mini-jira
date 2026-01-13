import { NotFoundError } from "@/domain/errors";
import { Project } from "@/domain/project";
import {
  CreateProjectData,
  GetProjectsOptions,
  UpdateProjectData,
} from "@/domain/project.dto";
import { ProjectModel } from "@/models/Project.model";

type ToProjectParams = {
  _id: unknown;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Creates and persists a new project
 * @param {CreateProjectData} createProjectData Project data object
 * @returns {Promise<Project>} Created project
 */
export async function createProject(
  createProjectData: CreateProjectData
): Promise<Project> {
  const document = await ProjectModel.create(createProjectData);

  return toProject(document.toObject());
}

/**
 * Gets available projects from DB
 * @param {GetProjectsOptions} getProjectData object containing sortBy, sortOrder and limit
 * @returns {Promise<Project[]>} A list of projects
 */
export async function getProjects(
  getProjectData: GetProjectsOptions
): Promise<Project[]> {
  const { sortBy, sortOrder, limit } = getProjectData;

  const documents = await ProjectModel.find()
    .sort({ [sortBy]: sortOrder })
    .limit(limit)
    .lean();

  return documents.map((document) => toProject(document));
}

/**
 * Gets project by projectId
 * @param {string} projectId Project id
 * @returns {Promise<Project>} Project's data found
 */
export async function getProjectById(projectId: string): Promise<Project> {
  const document = await ProjectModel.findById(projectId).lean();

  if (!document) {
    throw new NotFoundError("Project not found");
  }

  return toProject(document);
}

/**
 *
 * @param {string} projectId Project id
 * @param {UpdateProjectData} updateProjectData Project data object
 * @returns {Promise<Project>} Updated project
 */
export async function updateProject(
  projectId: string,
  updateProjectData: UpdateProjectData
): Promise<Project> {
  const document = await ProjectModel.findByIdAndUpdate(
    projectId,
    { $set: updateProjectData },
    {
      runValidators: true,
      new: true,
    }
  ).lean();

  if (!document) {
    throw new NotFoundError("Project not found");
  }

  return toProject(document);
}

/**
 * Transform a mongoose document into a plain project object
 * @param {ToProjectParams} document A mongoose project object
 * @returns {Project} a plain project object
 */
function toProject(document: ToProjectParams): Project {
  return {
    id: String(document._id),
    name: document.name,
    description: document.description,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}
