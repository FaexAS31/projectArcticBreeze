import { settings } from "../settings.js";

export async function getSaleDetails() {
    var url = settings.azureUrl + "api/SaleDetails";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}

export async function addSaleDetail(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/SaleDetails', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error adding sale detail:', error);
        throw error;
    }
}

export async function deleteSaleDetail(id) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/SaleDetails/' + id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error deleting sale detail:', error);
        throw error;
    }
}

export async function updateSaleDetail(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/SaleDetails', {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error updating sale detail:', error);
        throw error;
    }
}