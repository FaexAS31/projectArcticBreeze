import { settings } from "../settings.js";

export async function getProducts() {
    var url = settings.azureUrl + "api/Products";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}