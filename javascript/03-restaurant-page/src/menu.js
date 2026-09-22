function loadMenuPage() {
  const content = document.querySelector("#content");
  const section =  document.createElement("section");

  section.classList.add("menu");

  const heading = document.createElement("h1");
  heading.textContent = "Our Menu";

  const item = document.createElement("article");

   const itemName = document.createElement("h2");
   itemName.textContent = "Classic Burger";
   const itemDescription = document.createElement("p");
   itemDescription.textContent = "Juicy beef patty with fresh lettuce, tomato, cheese, and our special sauce.";

   item.appendChild(itemName);
   item.appendChild(itemDescription);

   const item2 = document.createElement("article");

   const item2Name = document.createElement("h2");
   item2Name.textContent = "Grilled Chicken";
   const item2Description = document.createElement("p");
   item2Description.textContent = "Grilled chicken breast served with roasted vegetables and herbs.";

   item2.appendChild(item2Name);
   item2.appendChild(item2Description);

   const item3 = document.createElement("article");

   const item3Name = document.createElement("h2");
   item3Name.textContent = "Creamy Pasta";
   const item3Description = document.createElement("p");
   item3Description.textContent = "Creamy pasta tossed with garlic, parmesan, and fresh herbs.";

   item3.appendChild(item3Name);
   item3.appendChild(item3Description);

  section.appendChild(heading);
  section.appendChild(item);
  section.appendChild(item2);
  section.appendChild(item3);
  content.appendChild(section);
}

export default loadMenuPage;