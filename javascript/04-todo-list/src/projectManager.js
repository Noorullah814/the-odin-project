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

  function toggleTodo(todo){
    todo.completed = !todo.completed;
  }

  function deleteTodo(todo){
    currentProject.todos = currentProject.todos.filter(t => t !== todo);
  }

  return {
    getProjects,
    getCurrentProject,
    addProject,
    addTodo,
    toggleTodo,
    deleteTodo
  };
})();

export default projectManager;
