import createTodo from "./todo.js";
import createProject from "./project.js";

const project = createProject("Work");

const todo = createTodo(
  "Build Todo List",
  "Complete the Odin Project",
  "2026-10-10",
  "high"
);

project.todos.push(todo);

console.log(project);