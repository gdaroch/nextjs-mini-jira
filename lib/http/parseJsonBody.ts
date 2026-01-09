import { NextResponse } from "next/server";
import { ZodSchema } from "zod"; // TODO: Fix deprecated code

/**
 * Parses and validates a json request using a Zod schema
 * @param request Incoming request
 * @param schema Zod schema
 * @returns request data and status
 */
export async function parseJsonBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<
  { success: true; data: T } | { success: false; response: Response }
> {
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
        { status: 400 }
      ),
    };
  }

  const parsedBody = schema.safeParse(body);
  if (!parsedBody.success) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Validation error",
          details: parsedBody.error.issues,
        },
        { status: 400 }
      ),
    };
  }

  return { success: true, data: parsedBody.data };
}
