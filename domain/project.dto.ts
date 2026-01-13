export type CreateProjectData = {
  name: string;
  description?: string;
};

export type GetProjectsOptions = {
  limit: number;
  sortBy: "name" | "createdAt" | "updatedAt";
  sortOrder: "asc" | "desc";
};

export type UpdateProjectData = {
  name?: string;
  description?: string;
};
