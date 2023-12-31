import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import centsToDollars from "./utils/money.js";

let productHTML = '';

products.forEach((product) => {
    productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${centsToDollars(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart-button"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
});

document.querySelector('.js-product-grid').innerHTML = productHTML;
let cartQuantityElement = document.querySelector('.js-cart-quantity');

const cartQuantity = calculateCartQuantity();
cartQuantityElement.innerHTML = cartQuantity;


function showAddedMessage(productId){
    // "added" message
    const addedMessageTimeout = {};
    

    const addedToCartMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCartMessage.classList.add('showMessage');

    

    const previousTimeoutId = addedMessageTimeout[productId];
    if (previousTimeoutId){
        clearTimeout(previousTimeoutId);
    }
    
    const timeoutId = setTimeout(() => {
        addedToCartMessage.classList.remove('showMessage');
    },2000);

    addedMessageTimeout[productId] = timeoutId;

}


document.querySelectorAll('.js-add-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        const { productId } = button.dataset;

        addToCart(productId);
        showAddedMessage(productId);
        cartQuantityElement.innerHTML = calculateCartQuantity();
        

    });
});




