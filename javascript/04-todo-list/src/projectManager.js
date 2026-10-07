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

 function deleteTodo(todo) {
  currentProject.todos = currentProject.todos.filter(
    (currentTodo) => currentTodo !== todo
  );
}

function updateTodo(todo, updatedData){
  Object.assign(todo, updatedData);
}

  return {
    getProjects,
    getCurrentProject,
    addProject,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo
  };
})();

export default projectManager;
