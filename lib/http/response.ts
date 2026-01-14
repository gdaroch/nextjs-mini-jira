import { NextResponse } from "next/server";
import { HttpStatusCodes } from "@/lib/http/enums";

/**
 * Content of the error sent inside a NextResponse.json
 */
type ErrorBody = {
  error: string;
  details?: unknown;
};

/**
 * Return an OK HTTP response
 * @param {T} data data payload
 * @returns {Response} HTTP error response
 */
function ok<T>(data: T): Response {
  return NextResponse.json({ data }, { status: HttpStatusCodes.OK });
}

/**
 * Return a CREATED HTTP response
 * @param {T} data data payload
 * @returns {Response} HTTP error response
 */
function created<T>(data: T): Response {
  return NextResponse.json({ data }, { status: HttpStatusCodes.CREATED });
}

/**
 * Return a generic HTTP ERROR response
 * @param {HttpStatusCodes} status status code
 * @param {string} message error message
 * @param {unknown} [details] error details
 * @returns {Response} HTTP error response
 */
function error(
  status: HttpStatusCodes,
  message: string,
  details?: unknown
): Response {
  const errorBody: ErrorBody = { error: message };
  if (details !== undefined) {
    errorBody.details = details;
  }

  return NextResponse.json(errorBody, { status });
}

/**
 * Return a BAD_REQUEST HTTP error response
 * @param {string} message error message
 * @param {unknown} [details] error details
 * @returns {Response} HTTP error response
 */
function badRequest(message: string, details?: unknown): Response {
  return error(HttpStatusCodes.BAD_REQUEST, message, details);
}

/**
 * Return a NOT_FOUND HTTP error response
 * @param {string} message error message
 * @returns {Response} HTTP error response
 */
function notFound(message: string = "Not found"): Response {
  return error(HttpStatusCodes.NOT_FOUND, message);
}

export const HttpResponse = {
  ok,
  created,
  error,
  badRequest,
  notFound,
};
