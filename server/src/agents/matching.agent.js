export async function matchingAgent({ parsedResume, hiringSpec, ragContext }) {
  const candidateSkills = new Set(parsedResume.data.skills.map((skill) => skill.toLowerCase()));
  const requiredMatches = hiringSpec.required_skills.filter((skill) => candidateSkills.has(skill.toLowerCase()));
  const preferredMatches = hiringSpec.preferred_skills.filter((skill) => candidateSkills.has(skill.toLowerCase()));
  const requiredWeight = hiringSpec.required_skills.length ? requiredMatches.length / hiringSpec.required_skills.length : 1;
  const preferredWeight = hiringSpec.preferred_skills.length ? preferredMatches.length / hiringSpec.preferred_skills.length : 0;
  const contextBoost = ragContext.length > 0 ? 5 : 0;
  const matchScore = Math.min(100, Math.round(requiredWeight * 75 + preferredWeight * 20 + contextBoost));

  return {
    success: true,
    data: {
      match_score: matchScore,
      missing_skills: hiringSpec.required_skills.filter((skill) => !candidateSkills.has(skill.toLowerCase())),
      recommendation: matchScore >= hiringSpec.minimum_score ? "Shortlist" : "Review"
    }
  };
}
