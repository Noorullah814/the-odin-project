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
    const detailsContainer = document.createElement("div");
    const description = document.createElement("p");
    const completedStatus = document.createElement("p");
    const editButton = document.createElement("button");

    todoTitle.textContent = todo.title;
    todoDueDate.textContent = todo.dueDate;
    todoPriority.textContent = todo.priority;
    description.textContent = todo.description;
    completedStatus.textContent = todo.completed;
    editButton.textContent = "Edit";

    detailsContainer.appendChild(description);
    detailsContainer.appendChild(completedStatus);
    detailsContainer.appendChild(editButton);

    detailsContainer.style.display = "none";

    card.appendChild(todoTitle);
    card.appendChild(todoDueDate);
    card.appendChild(todoPriority);
    card.appendChild(detailsContainer);

    card.addEventListener("click", () => {
      if (detailsContainer.style.display === "none") {
        detailsContainer.style.display = "block";
      } else {
        detailsContainer.style.display = "none";
      }
    });

    editButton.addEventListener("click", () => {
  console.log("Edit clicked:", todo);
   });

    todoContainer.appendChild(card);
  });
};

export default renderTodoList;
