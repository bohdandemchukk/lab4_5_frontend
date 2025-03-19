import {cart, updateDeliveryOption, deleteFromSummary, getCartQuantity, updateQuantity} from "../../data/cart.js";
import {products} from "../../data/products.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../../data/deliveryOptions.js"


export function renderPaymentSummary() {

    let shippingPriceCents = 0;
    let productPriceCents = 0;
    cart.forEach((cartItem) => {
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === cartItem.productId) {
                matchingProduct = product
            }
        })

        productPriceCents += matchingProduct.priceCents * cartItem.quantity


        let matchingOption;
        deliveryOptions.forEach((deliveryOption) => {

            if(deliveryOption.id === cartItem.deliveryOptionId){
                matchingOption = deliveryOption
            }

        })

        shippingPriceCents += matchingOption.priceCents
    })
    console.log(productPriceCents)
    console.log(shippingPriceCents)

    let totalBeforeTax = productPriceCents + shippingPriceCents
    let estimatedTax = totalBeforeTax / 10;

    let total = totalBeforeTax + estimatedTax;

    let cartCount = 0
    cart.forEach((item) => {
        cartCount++;
    })


    let paymentSummaryHTML = `
        <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cartCount}):</div>
        <div class="payment-summary-money">$${Math.round((productPriceCents/100)).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${Math.round((shippingPriceCents/100)).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${Math.round((totalBeforeTax/100)).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${Math.round((estimatedTax/100)).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${Math.round((total/100)).toFixed(2)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    
    `
    document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;




}



