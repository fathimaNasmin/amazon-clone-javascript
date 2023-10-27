import {calculateCartQuantity} from "../../data/cart.js"

export function renderCheckoutHeader(){
    const html = `
    Checkout (<a class="return-to-home-link js-return-home-link"
            href="amazon.html">${calculateCartQuantity()} items</a>)
    `;

    return document.querySelector('.js-checkout-header-middle-section')
        .innerHTML = html
}

