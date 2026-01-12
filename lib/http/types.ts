/**
 * Request validation return format
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; response: Response };
