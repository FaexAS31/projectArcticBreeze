import { settings } from "../settings.js";

export async function getSales() {
    var url = settings.azureUrl + "api/Sales";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}

export async function addSale(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/Sales', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error adding sale:', error);
        throw error;
    }
}

export async function deleteSale(id) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/Sales/' + id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error deleting sale:', error);
        throw error;
    }
}

export async function updateSale(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/Sales', {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error updating sale:', error);
        throw error;
    }
}