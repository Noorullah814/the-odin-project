import "./style.css";
import { renderSidebar, setupSidebar } from "./dom/sidebar.js";
import { renderTodoList, setupAddTodo } from "./dom/todoList.js";

setupSidebar();
setupAddTodo();

renderSidebar();
renderTodoList();
