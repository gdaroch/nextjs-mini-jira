import { NextResponse } from "next/server";
import { ZodSchema } from "zod"; // TODO: Fix deprecated code
import { ValidationResult } from "@/lib/http/types";
import { httpStatusCodes } from "@/lib/http/enums";

/**
 * Parses and validates a request's body using a Zod schema
 * @param {Request} request Incoming request
 * @param {ZodSchema<T>} schema Zod schema
 * @returns {ValidationResult<T>} request data and status
 */
export async function parseJsonBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Invalid json body",
        },
        { status: httpStatusCodes.BAD_REQUEST }
      ),
    };
  }

  const parsedBody = schema.safeParse(body);
  if (!parsedBody.success) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Error validating body",
          details: parsedBody.error.issues,
        },
        { status: httpStatusCodes.BAD_REQUEST }
      ),
    };
  }

  return { success: true, data: parsedBody.data };
}

/**
 * Parses and validates request's query params using a Zod schema
 * @param {Request} request Incoming request
 * @param {ZodSchema<T>} schema Zod schema
 * @returns {ValidationResult<T>} request data and status
 */
export function parseQueryParameters<T>(
  request: Request,
  schema: ZodSchema<T>
): ValidationResult<T> {
  const { searchParams } = new URL(request.url);

  const queryParams: Record<string, string> = {};
  for (const [paramName, paramValue] of searchParams.entries()) {
    queryParams[paramName] = paramValue;
  }

  const parsedParams = schema.safeParse(queryParams);
  if (!parsedParams.success) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Error validating query params",
          details: parsedParams.error.issues,
        },
        { status: httpStatusCodes.BAD_REQUEST }
      ),
    };
  }

  return { success: true, data: parsedParams.data };
}
