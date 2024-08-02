import { getProducts, addProduct, deleteProduct, updateProduct  } from '../../js/providers/products.js';

const products = await getProducts();
console.log(products);

export const init = () => {
    const productCrudForm = document.getElementById("productCrudForm");
    productCrudForm.addEventListener("submit", (e) => addFormProduct(e));

    loadProducts();

};

async function loadProducts() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productID}</td>
            <td>${product.productName}</td>
            <td>${product.productType}</td>
            <td>${product.description}</td>
            <td>${product.price.toFixed(2)}</td>
            <td><img src="https://arcticbreeze.blob.core.windows.net/productocontenedor/${product.productImage}" alt="${product.productName}" width="50"></td>
            <td>
                <button id="edit-btn">Edit</button>
                <button id="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

async function addFormProduct(event) {
    event.preventDefault();

    const form = document.getElementById("productCrudForm"); 
    const formData = new FormData(form);

    try {
        addProduct(formData);
        Swal.fire({
            title: "Sign up successful!",
            confirmButtonText: "Continue",
          });
    } catch (error) {
        console.error('Error handling signup:', error);
    }
}

async function deleteFormProduct(productID) {
    Swal.fire({
        title: "Are you sure to process?",
        showDenyButton: true,
        confirmButtonText: "Remove",
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(productID);
        }
      });
    init();
}


