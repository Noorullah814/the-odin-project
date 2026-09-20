function loadHomePage() {
  const content = document.querySelector("#content");

  const heading = document.createElement("h1");
  heading.textContent = "Welcome to Our Restaurant";

  const description = document.createElement("p");
  description.textContent =
    "Delicious food, warm atmosphere, and unforgettable experiences.";

  content.appendChild(heading);
  content.appendChild(description);
}

export default loadHomePage;