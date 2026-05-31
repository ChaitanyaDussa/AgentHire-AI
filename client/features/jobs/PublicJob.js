"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export function PublicJob({ jobId }) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    api(`/jobs/${jobId}`).then(setJob).catch(() => setJob(null));
  }, [jobId]);

  if (!job) return <div className="mx-auto max-w-3xl p-8">Loading...</div>;

  return (
    <main className="mx-auto grid max-w-3xl gap-5 px-5 py-10">
      <div>
        <p className="text-sm font-bold text-signal">Public job page</p>
        <h1 className="text-4xl font-black">{job.title}</h1>
      </div>
      <p className="text-slate-700">{job.description}</p>
      <div className="panel p-4">
        <h2 className="font-black">Required skills</h2>
        <p className="text-sm text-slate-600">{job.required_skills?.join(", ")}</p>
      </div>
      <Link className="button w-fit" href={`/jobs/${jobId}/apply`}>Apply now</Link>
    </main>
  );
}
