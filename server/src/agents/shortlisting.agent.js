import { loadSpec } from "../utils/specLoader.js";

export async function shortlistingAgent({ matchingResult }) {
  const evaluationSpec = await loadSpec("evaluation/default-shortlisting.json");
  const score = matchingResult.data.match_score;
  const decision = evaluationSpec.decisions.find((item) => score >= item.minimum_score);

  return {
    success: true,
    data: {
      status: decision.status,
      score,
      requires_human_approval: decision.status === "shortlisted"
    }
  };
}
