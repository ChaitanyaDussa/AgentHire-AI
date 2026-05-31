import { JobForm } from "../../../../features/jobs/JobForm";

export default function CreateJobPage() {
  return (
    <div className="grid gap-5">
      <h1 className="text-2xl font-black">Create Job</h1>
      <JobForm />
    </div>
  );
}
