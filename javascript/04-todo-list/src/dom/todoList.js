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
    const completeButton = document.createElement("button");

    todoTitle.textContent = todo.title;
    todoDueDate.textContent = todo.dueDate;
    todoPriority.textContent = todo.priority;
    description.textContent = todo.description;
    completedStatus.textContent = todo.completed;
    editButton.textContent = "Edit";
    completeButton.textContent = todo.completed
      ? "Mark Incomplete"
      : "Mark Complete";

    detailsContainer.appendChild(description);
    detailsContainer.appendChild(completedStatus);
    detailsContainer.appendChild(editButton);
    detailsContainer.appendChild(completeButton);

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

    completeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      projectManager.toggleTodo(todo);
      renderTodoList();
    });

    editButton.addEventListener("click", (e) => {
      e.stopPropagation();

      console.log("Edit clicked:", todo);

      const editForm = document.createElement("form");

      const titleInput = document.createElement("input");
      const descriptionInput = document.createElement("textarea");
      const dateInput = document.createElement("input");
      const saveButton = document.createElement("button");
      const prioritySelect = document.createElement("select");
      const priorities = ["low", "medium", "high"];

      priorities.forEach((level) => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        prioritySelect.appendChild(option);
      });

      titleInput.type = "text";
      titleInput.value = todo.title;
      descriptionInput.value = todo.description;
      dateInput.type = "date";
      dateInput.value = todo.dueDate;
      prioritySelect.value = todo.priority;

      saveButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (titleInput.value.trim() === "") {
          alert("Title cannot be empty");
          return;
        }

        const updatedData = {
          title: titleInput.value,
          description: descriptionInput.value,
          dueDate: dateInput.value,
          priority: prioritySelect.value,
        };

        projectManager.updateTodo(todo, updatedData);

        renderTodoList();
      });
      saveButton.textContent = "Save Changes";
      saveButton.type = "button";

      editForm.appendChild(titleInput);
      editForm.appendChild(descriptionInput);
      editForm.appendChild(dateInput);
      editForm.appendChild(prioritySelect);
      editForm.appendChild(saveButton);

      detailsContainer.innerHTML = "";
      detailsContainer.appendChild(editForm);
    });
    todoContainer.appendChild(card);
  });
};

export default renderTodoList;
