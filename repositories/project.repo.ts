import { ProjectModel } from "@/models/Project.model";
import { CreateProjectInput } from "@/lib/schemas/project.schema";
import { Project } from "@/domain/project";

/**
 * Creates and persists a new project
 * @param data Validated project data
 * @returns Created project
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
