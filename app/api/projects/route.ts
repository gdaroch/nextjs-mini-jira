import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongoose";
import { CreateProjectSchema } from "@/lib/schemas/project.schema";
import { createProjectService } from "@/services/project.service";
import { parseJsonBody } from "@/lib/http/parseJsonBody";

/**
 * Creates a project
 * @param request Incoming request
 * @returns HTTP response
 */
export async function POST(request: Request): Promise<Response> {
  await connectMongo();

  // gets and validates the body
  const parsedBody = await parseJsonBody(request, CreateProjectSchema);
  if (!parsedBody.success) {
    return parsedBody.response;
  }

  // saves project in DB
  const project = await createProjectService(parsedBody.data);

  return NextResponse.json({ data: project }, { status: 201 });
}
