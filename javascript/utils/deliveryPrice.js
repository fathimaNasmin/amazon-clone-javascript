import {centsToDollars} from "./money.js"

export function formatDeliveryPrice(price){
    const priceString = price === 0 ? 'FREE' : `$${centsToDollars(price)} -`;
    return priceString;

}