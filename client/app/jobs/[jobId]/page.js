import { PublicJob } from "../../../features/jobs/PublicJob";

export default async function JobPage({ params }) {
  const { jobId } = await params;
  return <PublicJob jobId={jobId} />;
}
