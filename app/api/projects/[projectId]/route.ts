import { connectMongo } from "@/lib/db/mongoose";
import { parseRouteParameters } from "@/lib/http/requestValidation";
import { GetProjectByIdSchema } from "@/lib/schemas/project.schema";
import { httpStatusCodes } from "@/lib/http/enums";
import { getProjectByIdService } from "@/services/project.service";
import { NextResponse } from "next/server";
import { NotFoundError } from "@/domain/errors";

/**
 * Get a single project by projectId
 * @param {Request} _request Incoming request
 * @param { {params: { projectId: string }} } params request router params
 * @returns HTTP response
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ projectId: string }> }
): Promise<Response> {
  await connectMongo();
  const params = await context.params;

  // validates and parses route params
  const parsedRouteParams = parseRouteParameters(params, GetProjectByIdSchema);
  if (!parsedRouteParams.success) {
    return parsedRouteParams.response;
  }

  // tries to get a project using the projectId
  const project = await getProjectByIdService(parsedRouteParams.data);
  try {
    return NextResponse.json({ data: project }, { status: httpStatusCodes.OK });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { data: error.message },
        { status: httpStatusCodes.NOT_FOUND }
      );
    }

    throw error;
  }
}
