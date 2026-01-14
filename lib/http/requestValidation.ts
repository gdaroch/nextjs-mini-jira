import { HttpResponse } from "@/lib/http/response";
import { ValidationResult } from "@/lib/http/types";
import { z } from "zod";

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
      response: HttpResponse.badRequest("Invalid json body"),
    };
  }

  const parsedBody = schema.safeParse(body);
  if (!parsedBody.success) {
    return {
      success: false,
      response: HttpResponse.badRequest(
        "Error validating body",
        parsedBody.error.issues
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
      response: HttpResponse.badRequest(
        "Error validating query params",
        parsedParams.error.issues
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
      response: HttpResponse.badRequest(
        "Error validating route params",
        parsedParams.error.issues
      ),
    };
  }

  return { success: true, data: parsedParams.data };
}
