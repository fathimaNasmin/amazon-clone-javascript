export const cart = [];

export function addToCart(productId){
    let matchingItem;

    const quantitySelector = document.querySelector(
              `.js-quantity-selector-${productId}`
          );
    let selectedQuantity = Number(quantitySelector.value);
          
    cart.forEach((item) => {
        if (productId === item.productId){
            matchingItem = item;
        }
    });

    if (matchingItem){
        matchingItem.quantity += selectedQuantity;
    }else{
        cart.push({
            productId,
            quantity: selectedQuantity
        });
    }
}