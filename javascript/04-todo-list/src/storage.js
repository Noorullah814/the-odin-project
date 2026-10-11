
const saveProjects = (projects) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

export { saveProjects };
