import projectManager from "../projectManager.js";
import createProject from "../project.js";
import renderTodoList from "./todoList.js";

const renderSidebar = () => {
  const projectTitle = document.querySelector("#project-title");
  const currentActiveProject = projectManager.getCurrentProject();
  projectTitle.textContent = currentActiveProject.name;

  const projectContainer = document.querySelector("#projects-container");
  projectContainer.textContent = "";

  const projects = projectManager.getProjects();
  projects.forEach((project) => {
    const newContainer = document.createElement("div");
    newContainer.textContent = project.name;
    newContainer.addEventListener("click", () => {
      projectManager.setCurrentProject(project);
      renderSidebar();
      renderTodoList();
    });
    projectContainer.appendChild(newContainer);
  });
};

const setupSidebar = () => {
  const addProjectButton = document.querySelector("#add-project-button");

  addProjectButton.addEventListener("click", () => {
    const projectName = prompt("Enter new project name:");

    if (projectName && projectName.trim() !== "") {
      const newProject = createProject(projectName.trim());

      projectManager.addProject(newProject);

      renderSidebar();
    }
  });
};

export { renderSidebar, setupSidebar };
