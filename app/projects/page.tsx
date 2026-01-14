import type { Metadata } from "next";
import { getProjects } from "@/lib/projects/getProjects";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Page() {
  const projectList = await getProjects();

  const content =
    projectList.length === 0 ? (
      <p>No projects yet</p>
    ) : (
      <pre>{JSON.stringify(projectList, null, 2)}</pre>
    );

  return (
    <>
      <h1>Projects</h1>
      {content}
    </>
  );
}
