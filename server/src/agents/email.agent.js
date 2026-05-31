import { sendWorkflowEmail } from "../emails/resend.service.js";
import { loadSpec } from "../utils/specLoader.js";

export async function emailAgent({ candidate, job, shortlistResult }) {
  const templates = await loadSpec("email/templates.json");
  const template = shortlistResult.data.status === "rejected" ? templates.rejection : templates.interview;
  const subject = template.subject.replace("{{jobTitle}}", job.title);
  const body = template.body
    .replace("{{candidateName}}", candidate.name)
    .replace("{{jobTitle}}", job.title);

  await sendWorkflowEmail({ to: candidate.email, subject, body });

  return { success: true, data: { to: candidate.email, subject, sent: true } };
}
