const sanitizeStoredData = (data: unknown, fallback: StoredData): StoredData => {
  if (!data || typeof data !== "object") {
    throw new Error("Format de données JSON invalide");
  }

  const partial = data as Partial<StoredData>;
  const hasProjects = Object.prototype.hasOwnProperty.call(partial, "projects");
  const hasSkills = Object.prototype.hasOwnProperty.call(partial, "skills");

  if (!hasProjects && !hasSkills) {
    throw new Error("Le fichier JSON ne contient ni projets ni compétences");
  }

  const projects = hasProjects
    ? Array.isArray(partial.projects)
      ? partial.projects.map((project) => sanitizeProject(project))
      : fallback.projects
    : fallback.projects;

  const skills = hasSkills
    ? Array.isArray(partial.skills)
      ? partial.skills.map((skill) => sanitizeSkill(skill))
      : fallback.skills
    : fallback.skills;

  return {
    projects,
    skills
  };
};

