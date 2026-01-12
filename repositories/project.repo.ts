import { ProjectModel } from "@/models/Project.model";
import { CreateProjectInput } from "@/lib/schemas/project.schema";
import { Project } from "@/domain/project";

/**
 * Creates and persists a new project
 * @param {CreateProjectInput} data Validated project data
 * @returns {Promise<Project>} Created project
 */
export async function createProject(
  data: CreateProjectInput
): Promise<Project> {
  const document = await ProjectModel.create(data);

  return {
    id: document._id.toString(),
    name: document.name,
    description: document.description,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

/**
 * Gets available projects from DB
 * @param {number} [limit=20] max limit of records
 * @param {string} [sortBy="createdAt"] sorting field
 * @param {"asc" | "desc"} [sortOrder="desc"] whether to sort asc or desc
 * @returns {Promise<Project[]>} A list of projects
 */
export async function getProjects(
  limit: number = 20,
  sortBy: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
): Promise<Project[]> {
  const documents = await ProjectModel.find()
    .sort({ [sortBy]: sortOrder })
    .limit(limit);

  return documents.map((document) => ({
    id: document._id.toString(),
    name: document.name,
    description: document.description,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  }));
}
