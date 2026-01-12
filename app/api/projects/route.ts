import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongoose";
import {
  CreateProjectSchema,
  GetProjectsSchema,
} from "@/lib/schemas/project.schema";
import {
  createProjectService,
  getProjectsService,
} from "@/services/project.service";
import {
  parseJsonBody,
  parseQueryParameters,
} from "@/lib/http/requestValidation";
import { httpStatusCodes } from "@/lib/http/enums";

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

  return NextResponse.json(
    { data: project },
    { status: httpStatusCodes.CREATED }
  );
}

/**
 * Get a list of available projects
 * @param request Incoming request
 * @returns HTTP response
 */
export async function GET(request: Request): Promise<Response> {
  await connectMongo();

  // gets and validates the params
  const parsedQueryParams = parseQueryParameters(request, GetProjectsSchema);
  if (!parsedQueryParams.success) {
    return parsedQueryParams.response;
  }

  const projects = await getProjectsService(parsedQueryParams.data);

  return NextResponse.json({ data: projects }, { status: httpStatusCodes.OK });
}
