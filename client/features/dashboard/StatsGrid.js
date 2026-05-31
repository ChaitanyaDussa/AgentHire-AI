"use client";

import { BriefcaseBusiness, GitBranch, Users, Activity } from "lucide-react";

const items = [
  ["Open jobs", "12", BriefcaseBusiness],
  ["Candidates", "48", Users],
  ["Workflows", "31", GitBranch],
  ["Completion", "86%", Activity]
];

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map(([label, value, Icon]) => (
        <div key={label} className="panel p-4">
          <Icon className="mb-3 h-5 w-5 text-signal" />
          <div className="text-2xl font-black">{value}</div>
          <div className="text-sm text-slate-600">{label}</div>
        </div>
      ))}
    </div>
  );
}
