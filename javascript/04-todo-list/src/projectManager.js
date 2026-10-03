import createProject from "./project.js";

const projectManager = (() => {
  const projects = [];
  let currentProject = null;

  function addProject(project) {
    projects.push(project);
  }

  const defaultProject = createProject("Default");

  addProject(defaultProject);
  currentProject = defaultProject;
  function getProjects() {
    return projects;
  }

  function getCurrentProject() {
    return currentProject;
  }

  return {
    getProjects,
    getCurrentProject,
    addProject,
  };
})();

export default projectManager;
