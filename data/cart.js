export let cart = JSON.parse(localStorage.getItem("cart")) || [];


export function addToCart(productId) {

    let cartItemQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    let matchingCartItem = "";

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingCartItem = cartItem;
        }
    })

    if (matchingCartItem) {
        matchingCartItem.quantity+= cartItemQuantity;
    }
    else {
        cart.push({
            productId,
            quantity: cartItemQuantity,
            deliveryOptionId: "1"
        })
    }

    document.querySelector(".cart-quantity").innerHTML = getCartQuantity();
    localStorage.setItem("cart", JSON.stringify(cart))
}


export const cartState = {};

export function showAdded(productId){

    if (!cartState[productId]) {
        cartState[productId] = {timeoutId: null}
    }

    document.querySelector(`.added-to-cart-${productId}`).style.opacity = "1";


    if (cartState[productId].timeoutId) {
        clearTimeout(cartState[productId].timeoutId)
    }

    cartState[productId].timeoutId = setTimeout(() => {
        document.querySelector(`.added-to-cart-${productId}`).style.opacity = "0";
    }, 1000);

}

export function deleteFromSummary(productId) {
    let newCart = [];
    cart.forEach((cartItem) => {
        if (!(cartItem.productId === productId)) {
            newCart.push(cartItem)
        }
    })
    cart = newCart;
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function getCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            cartItem.quantity = Number(newQuantity)
        }
    })
    localStorage.setItem("cart", JSON.stringify(cart))

}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingCartItem = "";

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingCartItem = cartItem;
        }
    })
    matchingCartItem.deliveryOptionId = deliveryOptionId;
    localStorage.setItem("cart", JSON.stringify(cart))
}