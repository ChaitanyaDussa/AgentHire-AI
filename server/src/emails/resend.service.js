import { Resend } from "resend";

export async function sendWorkflowEmail({ to, subject, body }) {
  if (!process.env.RESEND_API_KEY) {
    return { skipped: true, to, subject };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: process.env.EMAIL_FROM || "Recruitment <onboarding@resend.dev>",
    to,
    subject,
    text: body
  });
}
