import { loadSpec } from "../utils/specLoader.js";

export async function interviewAgent({ candidate, job }) {
  const promptSpec = await loadSpec("prompts/interview.json");
  const questions = Array.from({ length: promptSpec.question_count }, (_value, index) => ({
    id: index + 1,
    question: `Discuss a ${job.title} problem involving ${job.required_skills[index % job.required_skills.length] || "core skills"}.`
  }));

  return {
    success: true,
    data: {
      candidate: candidate.name,
      questions,
      coding_tasks: Array.from({ length: promptSpec.coding_task_count }, () => ({
        title: `${job.title} practical task`,
        rubric: promptSpec.rubric_areas
      }))
    }
  };
}
