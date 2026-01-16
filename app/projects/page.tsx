import type { Metadata } from "next";
import { getProjects } from "@/lib/projects/getProjects";
import ProjectTable from "@/app/projects/_components/ProjectTable";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Page() {
  const projectList = await getProjects();

  if (projectList.length === 0) {
    return <p>No projects yet</p>;
  }

  return <ProjectTable projectList={projectList} />;
}
