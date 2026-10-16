import projectManager from "../projectManager.js";
import createTodo from "../todo.js";

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

    card.classList.add("todo-card");
    todoTitle.classList.add("todo-title");
    todoDueDate.classList.add("todo-due-date");
    todoPriority.classList.add("todo-priority");
    detailsContainer.classList.add("todo-details");

    const description = document.createElement("p");
    const completedStatus = document.createElement("p");
    const editButton = document.createElement("button");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    todoTitle.textContent = todo.title;
    todoDueDate.textContent = todo.dueDate;

    todoPriority.textContent = todo.priority;
    todoPriority.classList.add(`priority-${todo.priority.toLowerCase()}`);

    description.textContent = todo.description;
    completedStatus.textContent = todo.completed;
    editButton.textContent = "Edit";
    completeButton.textContent = todo.completed
      ? "Mark Incomplete"
      : "Mark Complete";

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the card from toggling its display
      projectManager.deleteTodo(todo);
      renderTodoList();
    });

    detailsContainer.appendChild(description);
    detailsContainer.appendChild(completedStatus);
    detailsContainer.appendChild(editButton);
    detailsContainer.appendChild(completeButton);
    detailsContainer.appendChild(deleteButton);

    detailsContainer.classList.add("todo-details-hidden");

    card.appendChild(todoTitle);
    card.appendChild(todoDueDate);
    card.appendChild(todoPriority);
    card.appendChild(detailsContainer);

    card.addEventListener("click", () => {
      detailsContainer.classList.toggle("todo-details-hidden");
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
      editForm.classList.add("todo-form");

      const titleInput = document.createElement("input");
      titleInput.classList.add("form-input");

      const descriptionInput = document.createElement("textarea");
      descriptionInput.classList.add("form-input");

      const dateInput = document.createElement("input");
      dateInput.classList.add("form-input");

      const saveButton = document.createElement("button");
      saveButton.classList.add("form-button", "form-button-primary");
      
      const prioritySelect = document.createElement("select");
      const priorities = ["low", "medium", "high"];
      prioritySelect.classList.add("form-input");

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
const setupAddTodo = () => {
  const addTodoButton = document.querySelector("#add-todo-button");
  addTodoButton.addEventListener("click", () => {
    if (document.querySelector("#add-todo-form")) {
      return;
    }

    const form = document.createElement("form");
    form.id = "add-todo-form";
    form.classList.add("todo-form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Task Title ..";
    titleInput.classList.add("form-input");

    const descriptionInput = document.createElement("textarea");
    descriptionInput.placeholder = "Description";
    descriptionInput.classList.add("form-input");

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.classList.add("form-input");

    const prioritySelect = document.createElement("select");
    const priorities = ["low", "medium", "high"];
    priorities.forEach((level) => {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level;
      prioritySelect.appendChild(option);
    });
    prioritySelect.classList.add("form-input");

    const saveButton = document.createElement("button");
    saveButton.textContent = "Add Todo";
    saveButton.type = "button";

    saveButton.addEventListener("click", () => {
      if (titleInput.value.trim() === "") {
        alert("Title cannot be empty");
        return;
      }
    saveButton.classList.add("form-button", "form-button-primary");

    const newTodo = createTodo(
        titleInput.value,
        descriptionInput.value,
        dateInput.value,
        prioritySelect.value,
      );

      projectManager.addTodo(newTodo);

      renderTodoList();

      form.remove();
    });

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(dateInput);
    form.appendChild(prioritySelect);
    form.appendChild(saveButton);

    const todoContainer = document.querySelector("#todo-container");
    todoContainer.parentNode.insertBefore(form, todoContainer);
  });
};

export { renderTodoList, setupAddTodo };
