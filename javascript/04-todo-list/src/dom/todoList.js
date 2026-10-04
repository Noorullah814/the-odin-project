import projectManager from "../projectManager.js";

const renderTodoList = () => {
  const todoContainer = document.querySelector("#todo-container");
  todoContainer.textContent = "";

  const currentProject = projectManager.getCurrentProject();
  currentProject.todos.forEach((todo) => {
    const card = document.createElement("div");
    const todoTitle = document.createElement("h3");
    const todoDueDate = document.createElement("p");
    const todoPriority = document.createElement("p");

    todoTitle.textContent = todo.title;
    todoDueDate.textContent = todo.dueDate;
    todoPriority.textContent = todo.priority;

    card.appendChild(todoTitle);
    card.appendChild(todoDueDate);
    card.appendChild(todoPriority);

    todoContainer.appendChild(card);
  });
};

export default renderTodoList;
