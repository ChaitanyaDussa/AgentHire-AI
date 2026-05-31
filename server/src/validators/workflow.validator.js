import { z } from "zod";

export const startWorkflowSchema = z.object({
  body: z.object({
    candidate_id: z.string().min(1),
    job_id: z.string().min(1)
  })
});

export const workflowIdSchema = z.object({
  params: z.object({ id: z.string().min(1) })
});

export const workflowActionSchema = z.object({
  body: z.object({
    workflow_id: z.string().min(1)
  })
});
