import { settings } from "../settings.js";

export async function getSales() {
    var url = settings.azureUrl + "api/Sales";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}