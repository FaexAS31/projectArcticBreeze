import { getProducts } from "../../js/providers/products.js";
import { toggleContent } from '../../components/sidemenu/sidemenu.js';
import { menu } from '../sidemenu/settings.js';


var total = 0;

export const init = () => {
  console.log("Initializing Cart...");
  getProducts().then((response) => {
    console.log(response);
    if (response)showCart(response);
  });
};

function showCart(data) {
    console.log('Showing Products...');
    if(document.getElementById('cart-screen') !== null) {
      let storedProductCounts = JSON.parse(localStorage.getItem('productCounts')) || {};
      let selectedProductIds = Object.keys(storedProductCounts);

      console.log('Selected Product Ids:', selectedProductIds);
      if (selectedProductIds.length === 0) {
        
        document.getElementById('content-cart').style.height = '75%';
        let button = document.createElement('button');
        button.textContent = 'Go Shopping';
        button.id = 'btn-go-shopping';
        button.onclick = () => {
          toggleContent(menu[1]);
        };

        document.getElementById('cart-screen').style.display = 'none';
        document.getElementById('announcement').innerHTML = 'No products in cart.';
        document.getElementById('announcement').appendChild(button);

        return;
      }

      let cartContent = document.getElementById('cart-content');
      let template = document.getElementById('template-product');

      if (!template) {
          console.log('Template element template-product not found');
          return;
      }

      cartContent.innerHTML = '';
      total = 0; 

      let fragment = document.createDocumentFragment();

      data.forEach(d => {
          if (selectedProductIds.includes(d.productID.toString())) {
          console.log(d);

          let templateContent = template.content.cloneNode(true);
          templateContent.querySelector('#product-name').textContent = d.productName;
          templateContent.querySelector('#product-price').textContent = d.price;
          templateContent.querySelector('#product-img').src = "https://arcticbreeze.blob.core.windows.net/productocontenedor/"+d.productImage;

          let productId = d.productID;
          let count = storedProductCounts[productId] || 0;

          templateContent.querySelector('#product-count').textContent = count;

          let deleteButton = templateContent.querySelector('#delete');
          let reduceButton = templateContent.querySelector('#reduce');
          let increaseButton = templateContent.querySelector('#increase');

          deleteButton.addEventListener('click', () => handleDelete(productId));
          reduceButton.addEventListener('click', () => handleChangeQuantity(productId, -1));
          increaseButton.addEventListener('click', () => handleChangeQuantity(productId, 1));

          templateContent.querySelector('#product-price').textContent = (d.price * count).toFixed(2);
          
          total += d.price * count;

          fragment.appendChild(templateContent);
          }
      });

      cartContent.appendChild(fragment);
      document.getElementById('total-price-value').textContent = total.toFixed(2);

    }
}

function handleDelete(productId) {
  let storedProductCounts = JSON.parse(localStorage.getItem('productCounts')) || {};
  delete storedProductCounts[productId];

  localStorage.setItem('productCounts', JSON.stringify(storedProductCounts));

  init();
}

function handleChangeQuantity(productId, change) {
  let storedProductCounts = JSON.parse(localStorage.getItem('productCounts')) || {};

  if (storedProductCounts[productId]) {
    storedProductCounts[productId] += change;
    if (storedProductCounts[productId] <= 0) {
      delete storedProductCounts[productId]; 
    }
  } else if (change > 0) {
    storedProductCounts[productId] = 1;
  }

  localStorage.setItem('productCounts', JSON.stringify(storedProductCounts));

  init();
}

export function clearCart() {
  localStorage.removeItem('productCounts');
  init();
}
