import createProject from "./project.js";
import { loadProjects, saveProjects } from "./storage.js";

const projectManager = (() => {
  const savedProjects = loadProjects();
  const projects = savedProjects || [];
  let currentProject = null;

  function addProject(project) {
    projects.push(project);
  }

  function saveCurrentProjects() {
    saveProjects(projects);
  }

  if (projects.length === 0) {
    const defaultProject = createProject("Default");
    addProject(defaultProject);
  }

  currentProject = projects[0];

  function getProjects() {
    return projects;
  }

  function getCurrentProject() {
    return currentProject;
  }

  function setCurrentProject(project) {
    currentProject = project;
  }

  function addTodo(todo) {
    currentProject.todos.push(todo);
  }

  function toggleTodo(todo) {
    todo.completed = !todo.completed;
  }

  function deleteTodo(todo) {
    currentProject.todos = currentProject.todos.filter(
      (currentTodo) => currentTodo !== todo,
    );
  }

  function updateTodo(todo, updatedData) {
    Object.assign(todo, updatedData);
  }

  return {
    getProjects,
    getCurrentProject,
    addProject,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setCurrentProject,
  };
})();

export default projectManager;
