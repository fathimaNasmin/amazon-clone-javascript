import {cart,calculateCartQuantity} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import {centsToDollars} from "../utils/money.js"
import {getProduct} from "../../data/products.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
    let totalCartPrice = 0;
    let shippingCharges = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

        totalCartPrice += product.priceCents * cartItem.quantity;
        shippingCharges += deliveryOption.deliveryPriceCents;
    });
    
    let totalBeforeTax = totalCartPrice + shippingCharges;
    let tax = totalBeforeTax * 0.1;
    let orderTotal = totalBeforeTax + tax;

    let html = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${centsToDollars(totalCartPrice)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${centsToDollars(shippingCharges)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${centsToDollars(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${centsToDollars(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${centsToDollars(orderTotal)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = html;

}