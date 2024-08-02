import { settings } from "../settings.js";

export async function getMonitoring() {
    var url = settings.azureUrl + "api/MonitoringData";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}
export async function addMonitoring(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/MonitoringData', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error adding monitoring data:', error);
        throw error;
    }
}
export async function deleteMonitoring(id) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/MonitoringData/' + id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error deleting monitoring data:', error);
        throw error;
    }
}
export async function updateMonitoring(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/MonitoringData', {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error updating monitoring data:', error);
        throw error;
    }
}