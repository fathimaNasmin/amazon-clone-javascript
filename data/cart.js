export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:1
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:2
        },
    ];
}


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
    saveToStorage();
}


export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    return cartQuantity
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;
    saveToStorage();
}

console.log(cart);