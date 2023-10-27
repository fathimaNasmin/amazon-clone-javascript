import { cart, removeFromCart, calculateCartQuantity, updateQuantity,           updateDeliveryOption } 
    from "../../data/cart.js";
import { products } from "../../data/products.js";
import centsToDollars from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatDeliveryDate } from "../utils/deliveryDate.js"
import { formatDeliveryPrice } from "../utils/deliveryPrice.js"
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary(){

    let cartItemContainerHTML = "";

    cart.forEach((cartItem) => {
        let matchingProduct = '';
        
        products.forEach((product) => {
            if (product.id === cartItem.productId) {
                matchingProduct = product;
            }
        });

        const deliveryOptionId = cartItem.deliveryOptionId;

        let matchingDeliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                matchingDeliveryOption = option;
            }
        });


        const dateString = formatDeliveryDate(matchingDeliveryOption.deliveryDays)

        cartItemContainerHTML += `
            <div class="cart-item-container js-cart-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
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
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                    </div>
                </div>
                </div>
            `;
    });

    document.querySelector('.js-order-summary').innerHTML = cartItemContainerHTML;

    // delete item from cart
    document.querySelectorAll(`.js-delete-item-link`)
        .forEach((link) => {
            link.addEventListener('click', () => {
                const {productId} = link.dataset;
                removeFromCart(productId);
                renderOrderSummary();
                renderPaymentSummary();
                renderCheckoutHeader();
            });
        });

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

                const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
                
                if (newQuantity <= 0 || newQuantity > 10){
                    alert("The items should not be less than 0 and greater than 10.");
                    return;
                }

                updateQuantity(productId, newQuantity);
                document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

                container.classList.remove('is-editing-quantity');
                renderPaymentSummary();
                renderCheckoutHeader();
                
            });

        });

    function deliveryOptionsHTML(matchingProduct,cartItem) {
        let html = '';

        deliveryOptions.forEach((option) => {
            const isChecked = option.id === cartItem.deliveryOptionId;
            html += 
                `
                <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${option.id}">
                    <input type="radio" 
                        ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${formatDeliveryDate(option.deliveryDays)}
                    </div>
                    <div class="delivery-option-price">
                        ${formatDeliveryPrice(option.deliveryPriceCents)} Shipping
                    </div>
                    </div>
                </div>
                `
        });
        return html;
    };


    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId,deliveryOptionId)
                renderOrderSummary();
                renderPaymentSummary();
            });
        });

}

