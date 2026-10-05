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

  function addTodo(todo)
  {
    currentProject.todos.push(todo);
  }

  return {
    getProjects,
    getCurrentProject,
    addProject,
    addTodo
  };
})();

export default projectManager;
