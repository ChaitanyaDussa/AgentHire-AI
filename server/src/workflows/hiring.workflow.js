import { Candidate } from "../models/Candidate.js";
import { Job } from "../models/Job.js";
import { Workflow } from "../models/Workflow.js";
import { resumeParserAgent } from "../agents/resumeParser.agent.js";
import { embeddingAgent } from "../agents/embedding.agent.js";
import { matchingAgent } from "../agents/matching.agent.js";
import { shortlistingAgent } from "../agents/shortlisting.agent.js";
import { interviewAgent } from "../agents/interview.agent.js";
import { emailAgent } from "../agents/email.agent.js";
import { searchRecruitmentContext } from "../rag/qdrant.service.js";
import { logWorkflowEvent } from "../services/log.service.js";
import { loadSpec } from "../utils/specLoader.js";

const agents = {
  resume_parser: resumeParserAgent,
  embedding_agent: embeddingAgent,
  matching_agent: matchingAgent,
  shortlisting_agent: shortlistingAgent,
  interview_agent: interviewAgent,
  email_agent: emailAgent
};

export async function startHiringWorkflow({ candidateId, jobId, file = null }) {
  const candidate = await Candidate.findById(candidateId);
  const job = await Job.findById(jobId);
  if (!candidate || !job) {
    const error = new Error("Candidate or job not found");
    error.status = 404;
    throw error;
  }

  const workflowSpec = await loadSpec(job.workflow_spec_id);
  const hiringSpec = await loadSpec(job.hiring_spec_id);
  const retryPolicy = await loadSpec("system/retry-policy.json");
  const workflow = await Workflow.create({ candidate_id: candidateId, job_id: jobId, current_state: "created" });
  const state = { candidate, job, hiringSpec, file, ragContext: [] };

  for (const step of workflowSpec.workflow) {
    workflow.current_state = step;
    await workflow.save();

    if (step === "human_approval") {
      workflow.status = "waiting_approval";
      workflow.state = serializeState(state);
      await workflow.save();
      await logWorkflowEvent({ workflow_id: workflow._id, agent_name: step, input: {}, output: state.shortlistResult, status: "waiting_approval" });
      return workflow;
    }

    await executeStep({ step, workflow, state, retryPolicy });
  }

  workflow.status = "completed";
  workflow.current_state = "workflow_completed";
  workflow.state = serializeState(state);
  await workflow.save();
  return workflow;
}

export async function approveWorkflow(workflowId) {
  const workflow = await Workflow.findById(workflowId);
  if (!workflow) {
    const error = new Error("Workflow not found");
    error.status = 404;
    throw error;
  }

  const workflowSpec = await loadSpec(workflow.state.job.workflow_spec_id || "workflow/default-hiring-workflow.json");
  const state = workflow.state;
  const retryPolicy = await loadSpec("system/retry-policy.json");
  const afterApproval = workflowSpec.workflow.slice(workflowSpec.workflow.indexOf("human_approval") + 1);

  for (const step of afterApproval) {
    workflow.current_state = step;
    workflow.status = "running";
    await workflow.save();
    await executeStep({ step, workflow, state, retryPolicy });
  }

  workflow.status = "completed";
  workflow.current_state = "workflow_completed";
  workflow.state = serializeState(state);
  await workflow.save();
  return workflow;
}

async function executeStep({ step, workflow, state, retryPolicy }) {
  const agent = agents[step];
  if (!agent) return;

  let attempts = 0;
  while (attempts <= retryPolicy.max_retries) {
    try {
      if (step === "matching_agent") {
        await enrichRagContext(state);
      }
      const input = buildAgentInput(step, state);
      const output = await agent(input);
      await applyAgentOutput(step, state, output);
      await logWorkflowEvent({ workflow_id: workflow._id, agent_name: step, input, output, status: "success" });
      return output;
    } catch (error) {
      attempts += 1;
      await logWorkflowEvent({ workflow_id: workflow._id, agent_name: step, input: {}, output: {}, status: "failed", error: error.stack || error.message });
      if (attempts > retryPolicy.max_retries) {
        workflow.status = "failed";
        workflow.state = serializeState(state);
        await workflow.save();
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, retryPolicy.retry_delay_ms));
    }
  }
}

function buildAgentInput(step, state) {
  if (step === "resume_parser") return { candidate: state.candidate, file: state.file };
  if (step === "embedding_agent") return { candidate: state.candidate, parsedResume: state.parsedResume };
  if (step === "matching_agent") return { parsedResume: state.parsedResume, hiringSpec: state.hiringSpec, ragContext: state.ragContext };
  if (step === "shortlisting_agent") return { matchingResult: state.matchingResult };
  if (step === "interview_agent") return { candidate: state.candidate, job: state.job, shortlistResult: state.shortlistResult };
  if (step === "email_agent") return { candidate: state.candidate, job: state.job, shortlistResult: state.shortlistResult };
  return state;
}

async function enrichRagContext(state) {
  state.ragContext = await searchRecruitmentContext(JSON.stringify(state.parsedResume.data));
}

async function applyAgentOutput(step, state, output) {
  if (step === "resume_parser") {
    state.parsedResume = output;
  }
  if (step === "embedding_agent") {
    state.embeddingResult = output;
  }
  if (step === "matching_agent") {
    state.matchingResult = output;
  }
  if (step === "shortlisting_agent") {
    state.shortlistResult = output;
    state.candidate.match_score = output.data.score;
    state.candidate.status = output.data.status;
    state.candidate.parsed_resume_json = state.parsedResume.data;
    await state.candidate.save();
  }
}

export async function prepareRagThenMatch(state) {
  await enrichRagContext(state);
}

function serializeState(state) {
  return {
    candidate: state.candidate?.toObject ? state.candidate.toObject() : state.candidate,
    job: state.job?.toObject ? state.job.toObject() : state.job,
    hiringSpec: state.hiringSpec,
    ragContext: state.ragContext,
    parsedResume: state.parsedResume,
    embeddingResult: state.embeddingResult,
    matchingResult: state.matchingResult,
    shortlistResult: state.shortlistResult
  };
}
