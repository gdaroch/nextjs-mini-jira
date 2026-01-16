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
    <main className="mt-10  mx-auto w-3/4 p-8 bg-indigo-50 border-3 border-indigo-50 rounded-xl shadow-md">
      <h1 className="font-bold text-2xl/relaxed text-indigo-600">Projects</h1>
      {content}
    </main>
  );
}
