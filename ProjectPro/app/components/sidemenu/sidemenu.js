import { menu } from "./settings.js";
import { loadComponent } from "../../js/providers/components.js";

var language = 1;
window.addEventListener("languageToggled", (event) => {
  language = event.detail.lang === 'ES' ? 0 : 1;
  updateMenuLanguage();
});


export const init = () => {
  console.log("Initializing sidemenu");
  console.log("Language: " + language);
  if(localStorage.getItem('login') === 'true'){
    console.log("ACCESING SIDEBAR: "+localStorage.getItem('user'));
    let user = JSON.parse(localStorage.getItem('user'));
    user = JSON.parse(user);
    drawMenu(user);
  }else{
    drawMenu({role: {id: 'general'}});
  }
};

  
function drawMenu(user) {
  menu.forEach((option) => {
    drawMenuOption(option,user);
  });
}

function drawMenuOption(option,user) {
  if(option.module === 'adminPanel' && user.role != "Admin") return;


  const parent = document.getElementById("sidemenu");
  var divOption = document.createElement("div");
  divOption.className = "sidemenu-option"; 
  parent.appendChild(divOption); 
  var divIcon = document.createElement("div");  
  divIcon.className = "sidemenu-icon";
  divOption.appendChild(divIcon);

  var icon = document.createElement("i");
  icon.className = "fas fa-" + option.icon;
  divIcon.appendChild(icon);

  var divText = document.createElement("div");
  divText.className = "sidemenu-text";
  divText.id = "sidemenu-option-" + option.module;
  divOption.appendChild(divText);

  if (option.hasOwnProperty('submenu')) {
    var divSubMenuIcon = document.createElement("div");
    divSubMenuIcon.className = "subMenuIcon";
    divSubMenuIcon.addEventListener("click", toogleSubMenuVisible);
    divOption.appendChild(divSubMenuIcon);

    var subMenuIcon = document.createElement("i");
    subMenuIcon.className = "fa fa-angle-down";
    divSubMenuIcon.appendChild(subMenuIcon);

    option.submenu.forEach((submenu) => {
      console.log(submenu);
      drawSubMenuOption(submenu, parent);
    });
  }

  var label = document.createElement("label");
  label.textContent = option.title[language];
  divText.appendChild(label);

  //events
  if (typeof option.url !== "undefined") {
    console.log("After event listener");
    divText.addEventListener("click", () => toggleContent(option));
  }

  function toogleSubMenuVisible() {
    if (subMenuIcon.className === "fa fa-angle-right") subMenuIcon.className = "fa fa-angle-down";
    else subMenuIcon.className = "fa fa-angle-right";
    console.log("toogleSubMenuVisible");
    var divSubOptions = document.getElementsByClassName("divSubOption");
    console.log(divSubOptions);
    for (let i = 0; i < divSubOptions.length; i++) {
      if (divSubOptions[i].style.display === "none") {
        divSubOptions[i].style.display = "flex";
      } else {
        divSubOptions[i].style.display = "none";
      }
    }
  }
}

function drawSubMenuOption(subOption, parentDiv) {
  var divSubOption = document.createElement("div");
  divSubOption.className = "divSubOption";
  divSubOption.id = "divSub" + subOption.title[language];
  divSubOption.addEventListener("click", () => toggleContent(subOption));
  parentDiv.appendChild(divSubOption);

  var divSubSelector = document.createElement("div");
  divSubSelector.className = "subMenu-selector";
  divSubOption.appendChild(divSubSelector);

  var subMenuOptionIcon = document.createElement("i");
  subMenuOptionIcon.className = "fa fa-window-minimize";
  divSubSelector.appendChild(subMenuOptionIcon);

  var divSubText = document.createElement("div");
  divSubText.className = "subMenu-text";
  divSubText.id = "subMenu-option" + subOption.title[language];
  divSubSelector.appendChild(divSubText);

  var label = document.createElement("label");
  label.textContent = subOption.title[language];
  divSubText.appendChild(label);
}

function updateMenuLanguage() {
  menu.forEach((option) => {
    const divText = document.getElementById("sidemenu-option-" + option.module);
    if (divText) {
      const label = divText.querySelector('label');
      label.textContent = option.title[language];
    }

    if (option.hasOwnProperty('submenu')) {
      option.submenu.forEach((submenu) => {
        var divSubText = document.getElementById("subMenu-option" + submenu.title[1]);
        if (divSubText) {
          const subLabel = divSubText.querySelector('label');
          subLabel.textContent = submenu.title[language];
        }
      });
    }
  });
}

export function toggleContent(option) {
  console.log(option);
  const content = document.getElementById("content");
  content.innerHTML = "";

  var divContent = document.createElement("div");
  divContent.id = "content-" + option.module;
  content.appendChild(divContent);

  loadComponent({ ...option, parent: divContent.id });
}

export function updateSideMenu() {
  const sideMenu = document.getElementById("sidemenu");
  sideMenu.innerHTML = "";
  init();
}