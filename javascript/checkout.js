import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { centsToDollars } from "./utils/money.js";

let cartItemContainerHTML = "";

cart.forEach((cartItem) => {
    let matchingProduct = '';
    
    products.forEach((product) => {
        if (product.id === cartItem.productId) {
            matchingProduct = product;
        }
    });

    cartItemContainerHTML += `
        <div class="cart-item-container js-cart-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${centsToDollars(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>

                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" 
                        data-product-id="${matchingProduct.id}">Save</span>

                    <span class="delete-quantity-link link-primary js-delete-item-link" 
                        data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        `;
});

document.querySelector('.js-order-summary').innerHTML = cartItemContainerHTML;
let cartQuantityReturnHomeLinkElement = document.querySelector('.js-return-home-link');

// delete item from cart
document.querySelectorAll(`.js-delete-item-link`)
    .forEach((link) => {
        link.addEventListener('click', () => {
        const {productId} = link.dataset;
        removeFromCart(productId);
        cartQuantityReturnHomeLinkElement.innerHTML = `${calculateCartQuantity()} items`;
        const container = document.querySelector(`.js-cart-container-${productId}`);
        container.remove();
    });
});


cartQuantityReturnHomeLinkElement.innerHTML = `${calculateCartQuantity()} items`;

document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            const container = document.querySelector(`.js-cart-container-${productId}`);
            container.classList.add('is-editing-quantity');

        });
    });

document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            const container = document.querySelector(`.js-cart-container-${productId}`);
            container.classList.remove('is-editing-quantity');

            const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
            console.log(newQuantity);
            updateQuantity(productId, newQuantity);

            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
            cartQuantityReturnHomeLinkElement.innerHTML = `${calculateCartQuantity()} items`;

        });
    });