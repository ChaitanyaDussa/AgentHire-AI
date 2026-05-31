import { ApplyForm } from "../../../../features/jobs/ApplyForm";

export default async function ApplyPage({ params }) {
  const { jobId } = await params;
  return (
    <main className="mx-auto grid max-w-2xl gap-5 px-5 py-10">
      <div>
        <p className="text-sm font-bold text-signal">Candidate application</p>
        <h1 className="text-3xl font-black">Apply for this role</h1>
      </div>
      <ApplyForm jobId={jobId} />
    </main>
  );
}
