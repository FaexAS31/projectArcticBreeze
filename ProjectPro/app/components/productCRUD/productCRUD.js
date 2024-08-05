import { getProducts, addProduct, deleteProduct, updateProduct, getNewID, getProductById } from '../../js/providers/products.js';
import Swal from 'https://cdn.skypack.dev/sweetalert2';


export const init = async () => {
    const productCrudForm = document.getElementById("productCrudForm");
    productCrudForm.addEventListener("submit", (e) => addFormProduct(e));

    const productEditForm = document.getElementById("productEditForm");
    productEditForm.addEventListener("submit", (e) => updateFormProduct(e));

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

async function handleProductSelection(productID) {
    const product = await getProductById(productID);
    if (product) {
        showEditProductForm(product);
    }
}

function showEditProductForm(product) {
    document.getElementById('editProductID').value = product.productID;
    document.getElementById('editProductName').value = product.productName;
    document.getElementById('editProductType').value = product.productType;
    document.getElementById('editDescription').value = product.description;
    document.getElementById('editPrice').value = product.price;

    document.getElementById('editProductForm').classList.remove('hidden');
    document.querySelector('.overlay').style.display = 'flex';
}

async function updateFormProduct(event) {
    event.preventDefault();

    const form = document.getElementById("productEditForm");
    const formData = new FormData(form);
    const productID = document.getElementById("editProductID").value; 

    try {
        await updateProduct(productID, formData); // Pasar el ID y los datos del formulario
        Swal.fire({
            title: "Product updated successfully!",
            confirmButtonText: "Continue",
        });
        await loadProducts();
        hideEditProductForm();
    } catch (error) {
        console.error('Error handling product update:', error);
    }
}

function hideEditProductForm() {
    document.getElementById('editProductForm').classList.add('hidden');
    document.querySelector('.overlay').style.display = 'none';
}

document.getElementById('hide-edit-form').addEventListener('click', hideEditProductForm);