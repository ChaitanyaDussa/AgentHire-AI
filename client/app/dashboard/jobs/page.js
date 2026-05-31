import Link from "next/link";
import { JobsList } from "../../../features/jobs/JobsList";

export default function JobsPage() {
  return (
    <div className="grid gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Jobs</h1>
        <Link href="/dashboard/jobs/create" className="button">Create job</Link>
      </div>
      <JobsList />
    </div>
  );
}
