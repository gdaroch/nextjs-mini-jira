import { NotFoundError } from "@/domain/errors";
import { connectMongo } from "@/lib/db/mongoose";
import {
  parseJsonBody,
  parseRouteParameters,
} from "@/lib/http/requestValidation";
import { HttpResponse } from "@/lib/http/response";
import {
  GetProjectByIdSchema,
  UpdateProjectSchema,
} from "@/lib/schemas/project.schema";
import {
  getProjectByIdService,
  updateProjectByIdService,
} from "@/services/project.service";

/**
 * Gets a single project by projectId
 * @param {Request} _request Incoming request
 * @param { {params: { projectId: string }} } context request router params
 * @returns HTTP response
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ projectId: string }> }
): Promise<Response> {
  const params = await context.params;

  // validates and parses route params
  const parsedRouteParams = parseRouteParameters(params, GetProjectByIdSchema);
  if (!parsedRouteParams.success) {
    return parsedRouteParams.response;
  }

  // tries to get a project using the projectId
  try {
    await connectMongo();
    const { projectId } = parsedRouteParams.data;

    const project = await getProjectByIdService(projectId);
    return HttpResponse.ok(project);
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      return HttpResponse.notFound(error.message);
    }

    throw error;
  }
}

/**
 * Updates a single project by projectId
 * @param {Request} request Incoming request
 * @param { {params: { projectId: string }} } context request router params
 * @returns HTTP response
 */
export async function PATCH(
  request: Request,
  context: { params: Promise<{ projectId: string }> }
): Promise<Response> {
  const params = await context.params;

  // validates and parses route params
  const parsedRouteParams = parseRouteParameters(params, GetProjectByIdSchema);
  if (!parsedRouteParams.success) {
    return parsedRouteParams.response;
  }

  // gets and validates the body
  const parsedBody = await parseJsonBody(request, UpdateProjectSchema);
  if (!parsedBody.success) {
    return parsedBody.response;
  }

  if (Object.keys(parsedBody.data).length === 0) {
    return HttpResponse.badRequest("At least one field must be provided");
  }

  // tries to update a project using the projectId
  try {
    await connectMongo();
    const { projectId } = parsedRouteParams.data;

    const updatedProject = await updateProjectByIdService(
      projectId,
      parsedBody.data
    );
    return HttpResponse.ok(updatedProject);
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      return HttpResponse.notFound(error.message);
    }

    throw error;
  }
}
