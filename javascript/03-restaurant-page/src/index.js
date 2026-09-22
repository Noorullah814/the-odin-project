import loadHomePage from "./home";
import loadMenuPage from "./menu";

loadHomePage();

const content = document.querySelector("#content");
const menuBtn = document.querySelector("#menu-btn");

menuBtn.addEventListener("click",()=>{
    content.textContent="";
    loadMenuPage();
})

const homeBtn = document.querySelector("#home-btn");

homeBtn.addEventListener("click",()=>{
    content.textContent = "";
    loadHomePage();

})

