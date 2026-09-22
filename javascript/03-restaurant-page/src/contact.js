function loadContactPage(){
    const content = document.querySelector("#content");
    const section = document.createElement("section");

    section.classList.add("contact");

    const heading = document.createElement("h1");
    heading.textContent = "Contact Us";

    const emailInfo = document.createElement("p");
    emailInfo.textContent = "hello@ourrestaurant.com";

    const phoneInfo = document.createElement("p");
    phoneInfo.textContent = "+92 300 1234567";

    section.appendChild(heading);
    section.appendChild(emailInfo);
    section.appendChild(phoneInfo);

    content.appendChild(section);
}

export default loadContactPage;