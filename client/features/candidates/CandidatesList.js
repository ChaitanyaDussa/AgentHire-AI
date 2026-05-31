"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export function CandidatesList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    api("/candidates").then(setCandidates).catch(() => setCandidates([]));
  }, []);

  return (
    <div className="panel overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-mist">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Score</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id} className="border-t border-slate-200">
              <td className="p-3 font-bold">{candidate.name}</td>
              <td className="p-3">{candidate.email}</td>
              <td className="p-3">{candidate.match_score ?? "-"}</td>
              <td className="p-3">{candidate.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!candidates.length && <div className="p-5 text-sm text-slate-600">No candidates yet.</div>}
    </div>
  );
}
