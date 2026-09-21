function loadHomePage() {
  const content = document.querySelector("#content");

  const hero = document.createElement("section");
  const button = document.createElement("button");

  hero.classList.add("hero");
  button.textContent = "Explore Our Menu";

  const heading = document.createElement("h1");
  heading.textContent = "Welcome to Our Restaurant";

  const description = document.createElement("p");
  description.textContent =
    "Delicious food, warm atmosphere, and unforgettable experiences.";

  hero.appendChild(heading);
  hero.appendChild(description);
  hero.appendChild(button);

  const about = document.createElement("section");
  about.classList.add("about");

  const aboutHeading = document.createElement("h2");
  aboutHeading.textContent = "Our Story";

  const aboutPara = document.createElement("p");
  aboutPara.textContent =
  "We believe great food brings people together. Our restaurant combines fresh ingredients, comforting flavors, and a warm atmosphere to create memorable dining experiences for every guest.";

  about.appendChild(aboutHeading);
  about.appendChild(aboutPara);

  content.appendChild(hero);
  content.appendChild(about);
}

export default loadHomePage;