import { settings } from "../settings.js";

export async function getUsers() {
    var url = settings.azureUrl + "api/Users";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}

export async function validateUser(email, password) {
    var users = await getUsers();
    var foundUser = null;

    users.forEach(u => {
        if (u.email === email && u.password === password) {
            foundUser = u;
        }
    });
    console.log("Found user: " + foundUser);
    console.log("Found user: " + JSON.stringify(foundUser));
    return foundUser ? JSON.stringify(foundUser) : null;
}