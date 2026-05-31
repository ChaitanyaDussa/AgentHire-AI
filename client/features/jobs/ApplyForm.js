"use client";

import { useState } from "react";
import { api } from "../../lib/api";

export function ApplyForm({ jobId }) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    const body = new FormData(event.currentTarget);
    body.set("job_id", jobId);

    try {
      const data = await api("/candidates/upload", { method: "POST", body });
      setResult(data);
      event.currentTarget.reset();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel grid gap-4 p-5">
      <input className="input" name="name" placeholder="Full name" required />
      <input className="input" name="email" type="email" placeholder="Email" required />
      <input className="input" name="phone" placeholder="Phone" />
      <input className="input" name="resume" type="file" accept="application/pdf" required />
      {error && <p className="text-sm text-berry">{error}</p>}
      {result && <p className="text-sm font-bold text-signal">Application submitted. Workflow status: {result.workflow.status}</p>}
      <button className="button w-fit">Submit application</button>
    </form>
  );
}
