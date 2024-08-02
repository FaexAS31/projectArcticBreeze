import { settings } from "../settings.js";

export async function getProducts() {
    var url = settings.azureUrl + "api/Products";
    return fetch(url)
        .then((response) => response.text())
        .then((text) => { return JSON.parse(text) })
}

export async function addProduct(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/Products', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

export async function deleteProduct(id) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/Products/' + id, {
            method: 'DELETE',
            headers: {
                mode: 'no-cors'
            }
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

export async function updateProduct(formData) {
    try {
        const response = await fetch('https://arcticbreezeapi20240729165031.azurewebsites.net/api/Products', {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('An error occurred: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}