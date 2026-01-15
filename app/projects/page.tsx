import type { Metadata } from "next";
import { getProjects } from "@/lib/projects/getProjects";
import ProjectTable from "@/app/projects/_components/ProjectTable";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Page() {
  const projectList = await getProjects();

  const content =
    projectList.length === 0 ? (
      <p>No projects yet</p>
    ) : (
      <ProjectTable projectList={projectList} />
    );

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Projects</h1>
      {content}
    </main>
  );
}
