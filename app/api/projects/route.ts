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
import { HttpStatusCodes } from "@/lib/http/enums";

/**
 * Creates a project
 * @param request Incoming request
 * @returns HTTP response
 */
export async function POST(request: Request): Promise<Response> {
  // gets and validates the body
  const parsedBody = await parseJsonBody(request, CreateProjectSchema);
  if (!parsedBody.success) {
    return parsedBody.response;
  }

  // saves project in DB
  await connectMongo();
  const project = await createProjectService(parsedBody.data);

  return NextResponse.json(
    { data: project },
    { status: HttpStatusCodes.CREATED }
  );
}

/**
 * Get a list of available projects
 * @param request Incoming request
 * @returns HTTP response
 */
export async function GET(request: Request): Promise<Response> {
  // gets and validates the params
  const parsedQueryParams = parseQueryParameters(request, GetProjectsSchema);
  if (!parsedQueryParams.success) {
    return parsedQueryParams.response;
  }

  await connectMongo();

  // sets optional values if needed
  const requestOptions = {
    sortBy: parsedQueryParams.data.sortBy ?? "createdAt",
    sortOrder: parsedQueryParams.data.sortOrder ?? "desc",
    limit: parsedQueryParams.data.limit ?? 20,
  };

  const projects = await getProjectsService(requestOptions);

  return NextResponse.json({ data: projects }, { status: HttpStatusCodes.OK });
}
