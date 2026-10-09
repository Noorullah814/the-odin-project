import createTodo from "./todo.js";
import createProject from "./project.js";
import projectManager from "./projectManager.js";
import "./style.css";
import { renderSidebar, setupSidebar } from "./dom/sidebar.js";
import renderTodoList from "./dom/todoList.js"

const todo = createTodo(
  "Build Todo List",
  "Complete the Odin Project",
  "2026-10-10",
  "high"
);

const currentProject = projectManager.getCurrentProject();

currentProject.todos.push(todo);

setupSidebar();

renderSidebar();
renderTodoList();
