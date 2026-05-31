import { fail } from "../utils/api.js";

export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const message = status === 500 ? "Internal server error" : error.message;
  console.error(error);
  return fail(res, message, status, error.details || null);
}
