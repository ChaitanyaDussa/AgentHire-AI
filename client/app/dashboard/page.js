import Link from "next/link";
import { StatsGrid } from "../../features/dashboard/StatsGrid";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Recruiter Dashboard</h1>
          <p className="text-slate-600">Create jobs, monitor workflows, and approve AI decisions.</p>
        </div>
        <Link href="/dashboard/jobs/create" className="button">Create job</Link>
      </div>
      <StatsGrid />
    </div>
  );
}
