import type { Project } from "@/lib/projects/projects.schemas";
import Link from "next/link";

export default function ProjectTable({
  projectList,
}: {
  projectList: Project[];
}) {
  return (
    <>
      <table className="min-w-full border-collapse">
        <thead className="border-b text-left text-sm font-semibold">
          <tr>
            <th className="py-3 pr-4">Name</th>
            <th className="py-3 pr-4">Description</th>
            <th className="py-3 pr-4">Created</th>
            <th className="py-3 pr-4">Edit</th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((project: Project) => (
            <tr className="hover:bg-gray-50" key={project.id}>
              <td className="border-b py-3 pr-4 align-top text-sm">
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </td>
              <td className="border-b py-3 pr-4 align-top text-sm">
                {project.description ?? `No description`}
              </td>
              <td className="border-b py-3 pr-4 align-top text-sm">
                {project.createdAt}
              </td>
              <td className="border-b py-3 pr-4 align-top text-sm">
                <Link
                  className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                  href={`/projects/${project.id}/edit`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
