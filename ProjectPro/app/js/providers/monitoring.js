import { settings } from "../settings.js";

export async function getMonitoring() {
    var url = settings.azureUrl + "api/MonitoringData";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}