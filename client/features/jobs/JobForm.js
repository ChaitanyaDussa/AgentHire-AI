"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";

function csv(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export function JobForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      title: form.get("title"),
      description: form.get("description"),
      required_skills: csv(form.get("required_skills")),
      preferred_skills: csv(form.get("preferred_skills")),
      min_experience: Number(form.get("min_experience") || 0),
      hiring_spec_id: "hiring/frontend-developer.json",
      workflow_spec_id: "workflow/default-hiring-workflow.json"
    };

    try {
      await api("/jobs", { method: "POST", body: JSON.stringify(payload) });
      router.push("/dashboard/jobs");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel grid max-w-3xl gap-4 p-5">
      <input className="input" name="title" placeholder="Job title" required />
      <textarea className="input min-h-36" name="description" placeholder="Job description" required />
      <input className="input" name="required_skills" placeholder="Required skills, comma separated" />
      <input className="input" name="preferred_skills" placeholder="Preferred skills, comma separated" />
      <input className="input" name="min_experience" type="number" min="0" placeholder="Minimum experience" />
      {error && <p className="text-sm text-berry">{error}</p>}
      <button className="button w-fit">Create job</button>
    </form>
  );
}
