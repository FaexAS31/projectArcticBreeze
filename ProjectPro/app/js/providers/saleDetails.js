import { settings } from "../settings.js";

export async function getSaleDetails() {
    var url = settings.azureUrl + "api/SaleDetails";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}