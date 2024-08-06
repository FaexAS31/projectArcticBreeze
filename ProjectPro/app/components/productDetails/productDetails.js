import { getProducts } from "../../js/providers/products.js";
import Swal from 'https://cdn.skypack.dev/sweetalert2';

import { toggleContent } from "../sidemenu/sidemenu.js";

import { menu } from "../sidemenu/settings.js";


export const init = () => {

  let product = JSON.parse(localStorage.getItem('productDetails')) || {};

  if (product) {
    //console.log("Hola");
    //console.log(product);
    showProductDetails(product);
  }
};


function showProductDetails(product) {
    //console.log('Showing Product Details...');

    let productDetails = document.getElementById('product-details');
    
    productDetails.querySelector('#product-name').textContent = product.productName;
    productDetails.querySelector('#product-price').textContent = "$"+product.price;
    productDetails.querySelector('#product-description').textContent = product.description;

    //console.log("https://arcticbreeze.blob.core.windows.net/productocontenedor/"+product.productImage);
    if(product.productImage == null || product.productImage == ""){
      productDetails.querySelector('#product-img').src = "../../api/photos/products/ac_model_x.jpeg";
    }else{
      productDetails.querySelector('#product-img').src = "https://arcticbreeze.blob.core.windows.net/productocontenedor/"+product.productImage;
    }

    let backbutton = productDetails.querySelector('#back-button');
    backbutton.dataset.productId = product.productID;

    backbutton.addEventListener('click', (e) => {
      toggleContent(menu[1]);
    });


    let button = productDetails.querySelector('#cart-icon');
    button.dataset.productId = product.productID;

    button.addEventListener('click', (e) => {
      let productId = e.currentTarget.dataset.productId;
      handleProductSelection(productId);
    });
}

function handleProductSelection(productId) {
  Swal.fire({
    title: "Add to your cart?",
    showDenyButton: true,
    confirmButtonText: "Add to cart",
    denyButtonText: `Cancel`,
  }).then((result) => {
    if (result.isConfirmed) {
      let counts = JSON.parse(localStorage.getItem('productCounts')) || {};

      if (counts[productId]) {
        counts[productId]++;
      } else {
        counts[productId] = 1;
      }
    
      localStorage.setItem('productCounts', JSON.stringify(counts));
    
      //console.log(`Product ${productId} selected ${counts[productId]} times.`);
      Swal.fire("Product Added!", "", "success");
    } 
  });
}

