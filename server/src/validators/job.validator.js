import { z } from "zod";

export const createJobSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    required_skills: z.array(z.string()).default([]),
    preferred_skills: z.array(z.string()).default([]),
    min_experience: z.coerce.number().min(0).default(0),
    workflow_spec_id: z.string().default("workflow/default-hiring-workflow.json"),
    hiring_spec_id: z.string().default("hiring/frontend-developer.json")
  })
});

export const jobIdSchema = z.object({
  params: z.object({ id: z.string().min(1) })
});
