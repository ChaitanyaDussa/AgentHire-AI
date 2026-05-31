import { indexResumeDocument } from "../rag/qdrant.service.js";

export async function embeddingAgent({ candidate, parsedResume }) {
  await indexResumeDocument({
    id: candidate._id.toString(),
    text: JSON.stringify(parsedResume.data),
    metadata: { candidate_id: candidate._id.toString(), job_id: candidate.job_id.toString() }
  });

  return {
    success: true,
    data: {
      stored: true,
      collection: "recruitment_documents"
    }
  };
}
