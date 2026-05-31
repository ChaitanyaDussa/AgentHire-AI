import { Workflow } from "../models/Workflow.js";
import { WorkflowLog } from "../models/WorkflowLog.js";
import { approveWorkflow, startHiringWorkflow } from "../workflows/hiring.workflow.js";
import { ok } from "../utils/api.js";

export async function start(req, res) {
  const workflow = await startHiringWorkflow({
    candidateId: req.validated.body.candidate_id,
    jobId: req.validated.body.job_id
  });
  return ok(res, workflow, 201);
}

export async function approve(req, res) {
  const workflow = await approveWorkflow(req.validated.body.workflow_id);
  return ok(res, workflow);
}

export async function retry(req, res) {
  const workflow = await Workflow.findById(req.validated.body.workflow_id);
  if (!workflow) {
    const error = new Error("Workflow not found");
    error.status = 404;
    throw error;
  }
  const restarted = await startHiringWorkflow({ candidateId: workflow.candidate_id, jobId: workflow.job_id });
  return ok(res, restarted, 201);
}

export async function get(req, res) {
  const workflow = await Workflow.findById(req.validated.params.id);
  if (!workflow) {
    const error = new Error("Workflow not found");
    error.status = 404;
    throw error;
  }
  const logs = await WorkflowLog.find({ workflow_id: workflow._id }).sort({ created_at: 1 });
  return ok(res, { workflow, logs });
}
