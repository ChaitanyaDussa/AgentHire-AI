import * as jobService from "../services/job.service.js";
import { ok } from "../utils/api.js";

export async function create(req, res) {
  const job = await jobService.createJob(req.validated.body, req.user.id);
  return ok(res, job, 201);
}

export async function list(_req, res) {
  const jobs = await jobService.listJobs();
  return ok(res, jobs);
}

export async function get(req, res) {
  const job = await jobService.getJob(req.validated.params.id);
  return ok(res, job);
}

export async function update(req, res) {
  const job = await jobService.updateJob(req.validated.params.id, req.body);
  return ok(res, job);
}
