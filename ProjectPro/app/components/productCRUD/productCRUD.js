import { getProducts, addProduct, deleteProduct, updateProduct } from '../../js/providers/products.js';
import Swal from 'https://cdn.skypack.dev/sweetalert2';


export const init = async () => {
    const productCrudForm = document.getElementById("productCrudForm");
    productCrudForm.addEventListener("submit", (e) => addFormProduct(e));

    await loadProducts();
};

async function loadProducts() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    const products = await getProducts(); 
    console.log(products);

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productID}</td>
            <td>${product.productName}</td>
            <td>${product.productType}</td>
            <td>${product.description}</td>
            <td>${product.price.toFixed(2)}</td>
            <td><img src="https://arcticbreeze.blob.core.windows.net/productocontenedor/${product.productImage}" alt="${product.productName}" width="50"></td>
            <td id="buttons">
                <button class="edit-btn" data-id="${product.productID}">Edit</button>
                <button class="delete-btn" data-id="${product.productID}">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);

        const editBtn = row.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', () => handleProductSelection(product.productID));
        }

        const deleteBtn = row.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => deleteFormProduct(product.productID));
        }
    });
}

async function addFormProduct(event) {
    event.preventDefault();

    const form = document.getElementById("productCrudForm"); 
    const formData = new FormData(form);

    try {
        await addProduct(formData); 
        Swal.fire({
            title: "Product added successfully!",
            confirmButtonText: "Continue",
        });
        await loadProducts(); 
    } catch (error) {
        console.error('Error handling product addition:', error);
    }
}

async function deleteFormProduct(productID) {
    Swal.fire({
        title: "Are you sure to delete this product?",
        showDenyButton: true,
        confirmButtonText: "Remove",
        denyButtonText: `Cancel`,
    }).then(async (result) => {
        console.log("Product ID: ", productID);
        if (result.isConfirmed) {
            await deleteProduct(productID);
            await loadProducts(); 
        }
    });
}

function editFormProduct(productId) {
    console.log(`Product selected: ${productId}`);
}
