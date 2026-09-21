function loadMenuPage() {
  const content = document.querySelector("#content");

  const heading = document.createElement("h1");
  heading.textContent = "Our Menu";

  content.appendChild(heading);
}

export default loadMenuPage;