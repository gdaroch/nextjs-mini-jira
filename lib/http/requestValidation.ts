import { NextResponse } from "next/server";
import { z } from "zod";
import { ValidationResult } from "@/lib/http/types";
import { HttpStatusCodes } from "@/lib/http/enums";

/**
 * Parses and validates a request's body using a Zod schema
 * @param {Request} request Incoming request
 * @param {z.ZodType<T>} schema Zod schema
 * @returns {ValidationResult<T>} request data and status
 */
export async function parseJsonBody<T>(
  request: Request,
  schema: z.ZodType<T>
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
        { status: HttpStatusCodes.BAD_REQUEST }
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
        { status: HttpStatusCodes.BAD_REQUEST }
      ),
    };
  }

  return { success: true, data: parsedBody.data };
}

/**
 * Parses and validates request's query params using a Zod schema, right now this function doesn't support arrays
 * @param {Request} request Incoming request
 * @param {z.ZodType<T>} schema Zod schema
 * @returns {ValidationResult<T>} request data and status
 */
export function parseQueryParameters<T>(
  request: Request,
  schema: z.ZodType<T>
): ValidationResult<T> {
  const { searchParams } = new URL(request.url);

  // TODO: add array support
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
        { status: HttpStatusCodes.BAD_REQUEST }
      ),
    };
  }

  return { success: true, data: parsedParams.data };
}

/**
 * Parses and validates request's route parameters
 * @param {unknown} routeParams Incoming route parameters
 * @param {z.ZodType<T>} schema Zod schema
 * @returns {ValidationResult<T>} parameters data and status
 */
export function parseRouteParameters<T>(
  routeParams: unknown,
  schema: z.ZodType<T>
): ValidationResult<T> {
  const parsedParams = schema.safeParse(routeParams);
  if (!parsedParams.success) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Error validating route params",
          details: parsedParams.error.issues,
        },
        { status: HttpStatusCodes.BAD_REQUEST }
      ),
    };
  }

  return { success: true, data: parsedParams.data };
}
