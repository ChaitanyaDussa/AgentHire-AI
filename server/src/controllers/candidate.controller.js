import { Candidate } from "../models/Candidate.js";
import { startHiringWorkflow } from "../workflows/hiring.workflow.js";
import { ok } from "../utils/api.js";

export async function upload(req, res) {
  if (!req.file) {
    const error = new Error("Resume PDF is required");
    error.status = 400;
    throw error;
  }

  const candidate = await Candidate.create({
    ...req.validated.body,
    resume_url: `/uploads/${req.file.filename}`
  });
  const workflow = await startHiringWorkflow({
    candidateId: candidate._id,
    jobId: candidate.job_id,
    file: req.file
  });

  return ok(res, { candidate, workflow }, 201);
}

export async function list(_req, res) {
  const candidates = await Candidate.find().sort({ created_at: -1 });
  return ok(res, candidates);
}

export async function get(req, res) {
  const candidate = await Candidate.findById(req.validated.params.id);
  if (!candidate) {
    const error = new Error("Candidate not found");
    error.status = 404;
    throw error;
  }
  return ok(res, candidate);
}
