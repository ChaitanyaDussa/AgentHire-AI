import * as authService from "../services/auth.service.js";
import { ok } from "../utils/api.js";

export async function signup(req, res) {
  const data = await authService.signup(req.validated.body);
  return ok(res, data, 201);
}

export async function login(req, res) {
  const data = await authService.login(req.validated.body);
  return ok(res, data);
}

export async function me(req, res) {
  return ok(res, { user: req.user });
}
