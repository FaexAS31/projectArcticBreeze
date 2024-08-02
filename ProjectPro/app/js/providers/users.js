import { settings } from "../settings.js";

export async function getUsers() {
    var url = settings.azureUrl + "api/Users";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}

export async function validateUser(email, password) {
    console.log("Validating user: " + email);
    console.log("Valid password: " + password);
    var users = await getUsers();
    var foundUser = null;

    users.forEach(u => {
        console.log("User: " + u.email);
        console.log("Password " + u.password);
        if (u.email === email && u.password === password) {
            foundUser = u;
        }
    });
    console.log("Found user: " + foundUser);
    console.log("Found user: " + JSON.stringify(foundUser));
    return foundUser ? JSON.stringify(foundUser) : null;
}

export async function addUser(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/Users', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}
