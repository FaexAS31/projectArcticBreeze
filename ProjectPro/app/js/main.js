/** @format */

import { settings } from "./settings.js";
import { loadComponent } from "./providers/components.js";

var sideMenuVisible = false;

export function getSideMenuVisible() {
  return sideMenuVisible;
}

export function toggleSideMenuVisible() {
  sideMenuVisible = !sideMenuVisible;
}


// Event Handler
window.addEventListener("load", load);

// Load document
function load() {
  //console.log("Loading Main...");
  // Loading components
  // loadComponent({
  //     parent: 'header-left',
  //     url: 'components/header-left'
  // });
  settings.load.components.forEach((c) => {
    loadComponent(c);
  });

  document.getElementById("sidemenu").style.display = sideMenuVisible ? "block" : "none";
  document.getElementById("content").style.width = sideMenuVisible ? "calc(100% - 300px)" : "100%";
  localStorage.setItem('login', 'false');

}
