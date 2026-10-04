import projectManager from "../projectManager.js";

const renderSidebar = () => {
  const projectContainer = document.querySelector("#projects-container");
  projectContainer.textContent = "";

  const projects = projectManager.getProjects();
  projects.forEach((project) => {
    const newContainer = document.createElement("div");
    newContainer.textContent = project.name;
    projectContainer.appendChild(newContainer);
  });
};

export default renderSidebar;
