import { getProducts } from "../../js/providers/products.js";
import Swal from 'https://cdn.skypack.dev/sweetalert2';

export const init = () => {

  let product = JSON.parse(localStorage.getItem('productDetails')) || {};

  if (product) {
    console.log("Hola");
    console.log(product);
    showProductDetails(product);
  }
};


function showProductDetails(product) {
    console.log('Showing Product Details...');

    let productDetails = document.getElementById('product-details');
    
    productDetails.querySelector('#product-name').textContent = product.productName;
    productDetails.querySelector('#product-price').textContent = "$"+product.price;

    console.log("https://arcticbreeze.blob.core.windows.net/productocontenedor/"+product.productImage);
    if(product.productImage == null || product.productImage == ""){
      productDetails.querySelector('#product-img').src = "../../api/photos/products/ac_model_x.jpeg";
    }else{
      productDetails.querySelector('#product-img').src = "https://arcticbreeze.blob.core.windows.net/productocontenedor/"+product.productImage;
    }
}
