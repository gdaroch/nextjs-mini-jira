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
            <th className="py-3 pr-4 text-gray-700">Name</th>
            <th className="py-3 pr-4 text-gray-700">Description</th>
            <th className="py-3 pr-4 text-gray-700">Created</th>
            <th className="py-3 pr-4 text-gray-700">Edit</th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((project: Project) => (
            <tr className="hover:bg-indigo-200" key={project.id}>
              <td className="border-b py-3 pr-4 align-top text-sm text-gray-700">
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </td>
              <td className="border-b py-3 pr-4 align-top text-sm text-gray-700">
                {project.description ?? `No description`}
              </td>
              <td className="border-b py-3 pr-4 align-top text-sm text-gray-700">
                {project.createdAt}
              </td>
              <td className="border-b py-3 pr-4 align-top text-sm text-gray-700">
                <Link
                  className="rounded-md border px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-600 hover:text-indigo-200"
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
