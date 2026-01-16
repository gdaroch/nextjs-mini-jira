import { ProjectsResponseSchema } from "@/lib/projects/projects.schemas";
import type { Project } from "@/lib/projects/projects.schemas";

/**
 * Get a list projects from API
 * @returns a list of projects
 */
export async function getProjects(): Promise<Project[]> {
  const url = new URL("/api/projects", process.env.NEXT_PUBLIC_APP_URL);

  const response = await fetch(url, { cache: "no-store" });

  if (response.ok) {
    throw new Error("Error getting projects from API");
  }

  const projects = await response.json();
  const parsedProjects = ProjectsResponseSchema.parse(projects);

  return parsedProjects.data;
}
