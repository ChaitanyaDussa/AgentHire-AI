export async function resumeParserAgent({ candidate, file }) {
  const source = `${candidate.name} ${file?.originalname || candidate.resume_url}`;
  const skills = ["React", "JavaScript", "CSS", "Node.js", "Next.js"].filter((skill) =>
    source.toLowerCase().includes(skill.toLowerCase())
  );

  return {
    success: true,
    data: {
      name: candidate.name,
      email: candidate.email,
      skills: skills.length ? skills : ["React", "JavaScript"],
      experience: 2,
      education: "Not specified",
      projects: []
    }
  };
}
