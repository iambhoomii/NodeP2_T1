const parseJobDescription = (job) => {
  const text = `${job.title} ${job.description} ${job.experience || ""}`;

  const skills = [
    "JavaScript",
    "Node.js",
    "React",
    "Python",
    "Java",
    "PostgreSQL",
    "MongoDB",
    "Express",
    "Docker",
    "AWS",
    "Git",
  ];

  const detectedSkills = skills.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return {
    jobId: job.id,
    title: job.title,
    experience: job.experience,
    location: job.location,
    skills: detectedSkills,
  };
};

module.exports = {
  parseJobDescription,
};