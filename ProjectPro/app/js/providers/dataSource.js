import { settings } from "../settings.js";

export async function getDataSource() {
    var url = settings.azureUrl + "api/DataSources";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}

export async function addDataSource(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/DataSource', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error adding data source:', error);
        throw error;
    }
}

export async function deleteDataSource(id) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/DataSource/' + id, {
            method: 'DELETE',
            headers: {
                mode: 'no-cors'
            }
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error deleting data source:', error);
        throw error;
    }
}

export async function updateDataSource(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/DataSource', {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error updating data source:', error);
        throw error;
    }
}



