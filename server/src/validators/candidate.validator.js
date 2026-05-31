import { z } from "zod";

export const uploadCandidateSchema = z.object({
  body: z.object({
    job_id: z.string().min(1),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional().default("")
  })
});

export const candidateIdSchema = z.object({
  params: z.object({ id: z.string().min(1) })
});
