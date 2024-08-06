import { settings } from '../../js/settings.js';
import { toggleContent, updateSideMenu } from '../../components/sidemenu/sidemenu.js';
import { handleLogout } from '../../components/login/login.js';
import { getSideMenuVisible, toggleSideMenuVisible } from "../../js/main.js";

var lang = "EN";

const eventRegistry = new WeakMap();

export const init = () => {
  //console.log("Initializing header");
  const headerMenu = document.getElementById("header-menu");

  // Check if the event is already registered
  if (!eventRegistry.has(headerMenu)) {
    headerMenu.addEventListener("click", () => {
      toggleSideMenu();
    });
    eventRegistry.set(headerMenu, true);
  }
  
  updateHeaderContent();
};

async function updateHeaderContent() {
  const loginStatus = localStorage.getItem('login') === 'true';
  const container = document.getElementById('header-right');

  //console.log("Updating header content...", loginStatus);
  //console.log("User: ", localStorage.getItem("user"));
  //console.log("Login: ", localStorage.getItem('login'));
  
  if (loginStatus) {
    let user = JSON.parse(localStorage.getItem('user'));
      // Ensure elements are created only if they don't already exist
      if (!document.getElementById('img-user-photo')) {
          const userPhoto = document.createElement('img');
          userPhoto.id = 'img-user-photo';
          container.appendChild(userPhoto);

          const userDataDiv = document.createElement('div');
          userDataDiv.id = 'user-data';
          container.appendChild(userDataDiv);

          const userNameDiv = document.createElement('div');
          userNameDiv.id = 'label-user-name';
          userDataDiv.appendChild(userNameDiv);

          const userRoleDiv = document.createElement('div');
          userRoleDiv.id = 'label-user-role';
          userDataDiv.appendChild(userRoleDiv);

        const settingsDiv = document.createElement('div');
        settingsDiv.id = 'settings';

        const iconLogoutDiv = document.createElement('div');
        iconLogoutDiv.id = 'icon-logout';

        const icon = document.createElement('i');
        icon.className = 'fas fa-sign-out-alt fa-lg';

        iconLogoutDiv.appendChild(icon);
        settingsDiv.appendChild(iconLogoutDiv);
        container.appendChild(settingsDiv);

        // Add event listener for logout
        iconLogoutDiv.addEventListener('click', () => {
            handleLogout();
            updateSideMenu(); 
        });
      }

      if (user) {
          try {
              //console.log(user);
              user = JSON.parse(user);
              //console.log(user);
              document.getElementById("img-user-photo").src = "https://arcticbreeze.blob.core.windows.net/usuariocontenedor/" + user.imagePath;
              document.getElementById("label-user-name").textContent = user.name + " " + user.lastName;
              document.getElementById("label-user-role").textContent = user.role;
              //console.log("User data updated.");
          } catch (error) {
              console.error("Error parsing user data:", error);
          }
      } else {
          //console.log("No user data found.");
      }
  } else {
      const existingUserPhoto = document.getElementById('img-user-photo');
      if (existingUserPhoto) {
          existingUserPhoto.remove();
          document.getElementById('user-data').remove();
      }

      let loginDiv = document.getElementById('header-login');
      if (!loginDiv) {
          loginDiv = document.createElement('div');
          loginDiv.id = 'header-login';
          container.appendChild(loginDiv);

          const button = document.createElement('button');
          button.textContent = 'Log In';
          button.id = 'login-button';
          button.onclick = () => {
              toggleContent(settings.load.components[6]);
          };

          loginDiv.appendChild(button);
      }
  }
}


function getLanguage() {
  return lang;
}

// Toggle language
function toggleLanguage() {
  lang = getLanguage() === "EN" ? "ES" : "EN";
  document.getElementById("label-lang").textContent = lang;
  //console.log("Toggle language...");
  
  const event = new CustomEvent("languageToggled", { detail: { lang } });
  window.dispatchEvent(event);
}

// Toggle side menu
function toggleSideMenu() {
  toggleSideMenuVisible();
  if (getSideMenuVisible()) {
    document.getElementById("sidemenu").style.display = "block";
    document.getElementById("content").style.width = 'calc(100% - 300px)';
    if(document.getElementById("first-sight")){
      document.getElementById("content").style.height = '1050px';
      document.getElementById("flex").style.bottom = '-30rem';
    }
  } else {
    document.getElementById("sidemenu").style.display = "none";
    document.getElementById("content").style.width = '100%';
  }
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

export async function updateHeader() {
  let header = document.getElementById("header-right");
  header.innerHTML = ''; 
  init(); 
}