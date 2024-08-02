import { toggleContent } from "../../components/sidemenu/sidemenu.js";
import { updateHeader } from "../../components/header/header.js";
import { updateSideMenu } from "../../components/sidemenu/sidemenu.js";
import { menu } from '../sidemenu/settings.js';
import { validateUser } from "../../js/providers/users.js";
import { clearCart } from "../cart/cart.js";

export const init = () => {
	console.log("Initializing Login");
	showLogin();
};


function showLogin() {
    const signInBtn = document.getElementById("signInBtn");
    const signUpBtn = document.getElementById("signUpBtn");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const container = document.querySelector(".container");

    if (container) {
        var closeImg = document.createElement("img");

        closeImg.id = "close";
        closeImg.src = "./api/photos/close.png";
        closeImg.alt = "Close"; 

        container.appendChild(closeImg);

        signInBtn.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });

        signUpBtn.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });

        loginForm.addEventListener("submit", (e) => handleLogin(e));
        signupForm.addEventListener("submit", (e) => handleSignup(e));

        closeImg.addEventListener("click", () => {
            closeLogin();
        });
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMessage = document.getElementById("loginError");
    
    try {
        let user = await validateUser(email, password);

        if (user != null) {
            console.log("Login successful");
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("login", true);
            
			closeLogin();
            updateHeader(user);
            updateSideMenu(); 
        } else {
            errorMessage.innerText = "Invalid email or password.";
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

export function handleLogout() {
	localStorage.setItem("login", false);
	localStorage.removeItem("user");
	updateHeader();
    clearCart();
    location.reload();
	console.log("User logged out");
}

function handleSignup(event) {
    event.preventDefault();
    console.log("Signup form submitted");
}

function closeLogin() {
	document.getElementById("login").remove();
	console.log("Closing login...");
	toggleContent(menu[0]);
}

