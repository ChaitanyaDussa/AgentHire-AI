import { QdrantClient } from "@qdrant/js-client-rest";
import { loadSpec } from "../utils/specLoader.js";

const collection = "recruitment_documents";

function makeEmbedding(text) {
  const vector = Array.from({ length: 384 }, () => 0);
  for (let index = 0; index < text.length; index += 1) {
    vector[index % vector.length] += text.charCodeAt(index) / 1000;
  }
  return vector;
}

function pointIdFromString(value) {
  return value.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function getClient() {
  return new QdrantClient({ url: process.env.QDRANT_URL || "http://localhost:6333" });
}

export async function indexResumeDocument({ id, text, metadata }) {
  if (!process.env.QDRANT_URL) {
    return { skipped: true };
  }

  try {
    const client = getClient();
    await client.createCollection(collection, { vectors: { size: 384, distance: "Cosine" } }).catch(() => null);
    return client.upsert(collection, {
      points: [{ id: pointIdFromString(id), vector: makeEmbedding(text), payload: { text, ...metadata } }]
    });
  } catch (error) {
    return { skipped: true, reason: error.message };
  }
}

export async function searchRecruitmentContext(query) {
  const ragSpec = await loadSpec("system/rag-policy.json");
  if (!process.env.QDRANT_URL) {
    return [];
  }

  const client = getClient();
  const results = await client.search(collection, {
    vector: makeEmbedding(query),
    limit: ragSpec.top_k,
    score_threshold: ragSpec.minimum_similarity
  }).catch(() => []);

  return results.map((result) => result.payload);
}
