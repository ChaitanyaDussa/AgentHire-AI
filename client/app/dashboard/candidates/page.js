import { CandidatesList } from "../../../features/candidates/CandidatesList";

export default function CandidatesPage() {
  return (
    <div className="grid gap-5">
      <h1 className="text-2xl font-black">Candidates</h1>
      <CandidatesList />
    </div>
  );
}
