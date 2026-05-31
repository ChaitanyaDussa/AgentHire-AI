"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api("/jobs").then(setJobs).catch(() => setJobs([]));
  }, []);

  return (
    <div className="grid gap-3">
      {jobs.map((job) => (
        <div key={job._id} className="panel flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-black">{job.title}</h2>
            <p className="text-sm text-slate-600">{job.required_skills?.join(", ") || "No required skills"}</p>
          </div>
          <div className="flex gap-2">
            <Link className="button secondary" href={`/jobs/${job._id}`}>Public page</Link>
            <Link className="button secondary" href={`/jobs/${job._id}/apply`}>Apply page</Link>
          </div>
        </div>
      ))}
      {!jobs.length && <div className="panel p-5 text-sm text-slate-600">No jobs yet.</div>}
    </div>
  );
}
