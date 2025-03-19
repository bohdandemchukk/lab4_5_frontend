import {cart, updateDeliveryOption, deleteFromSummary, getCartQuantity, updateQuantity} from "../../data/cart.js";
import {products} from "../../data/products.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../../data/deliveryOptions.js"
import {renderPaymentSummary} from "./paymentSummary.js";

export function renderOrderSummary() {

    let cartItemsHTML = "";

    renderCart()

    function renderCart() {

        cart.forEach((cartItem) => {
            const productId = cartItem.productId;


            let matchingProduct;
            products.forEach((product) => {
                if (product.id === productId) {
                    matchingProduct = product;
                }
            })

            let deliveryOption;

            deliveryOptions.forEach((option) => {
                if (option.id === cartItem.deliveryOptionId) {
                    deliveryOption = option
                }
            })

            const today = dayjs();
            let deliveryDate = today.add(deliveryOption.deliveryDays, "days");
            if (deliveryDate.format("dddd") ==="Saturday"){
                deliveryDate = deliveryDate.add(2, "days")
                console.log(deliveryDate)
            } else if (deliveryDate.format("dddd") ==="Sunday"){
                deliveryDate = deliveryDate.add(1, "days")
                console.log(deliveryDate)
            }
            const dateString = deliveryDate.format("dddd, MMMM D");

            cartItemsHTML += `
                        <div class="cart-item-container-${productId}">
                        <div class="delivery-date-${productId}">
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
                              $${(Math.round((matchingProduct.priceCents)) / 100).toFixed(2)}
                            </div>
                            <div class="product-quantity">
                                  <span>
                                    Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                                  </span>
                              <span class="update-quantity-link link-primary" data-matching-product-id = ${matchingProduct.id}>
                                    Update
                                  </span>
                              <input type = "number" class = "quantity-input-${matchingProduct.id}" data-matching-product-id = ${matchingProduct.id}>
                              <span class = "save-quantity-link link-primary" data-matching-product-id = ${matchingProduct.id}>
                                    Save
                              </span>
                              <span class="delete-quantity-link link-primary" data-matching-product-id = ${matchingProduct.id}>
                                    Delete
                                  </span>
                            </div>
                          </div>
                
                          <div class="delivery-options">
                            <div class="delivery-options-title">
                              Choose a delivery option:
                            </div>
                            ${deliveryOptionsHTML(matchingProduct, cartItem)}
                          </div>
                        </div>
                      </div>
                    `

        })

        document.querySelector(".order-summary").innerHTML = cartItemsHTML;


    }

    document.querySelectorAll(".delete-quantity-link").forEach((deleteButton) => {
        deleteButton.addEventListener("click", () => {
            deleteFromSummary(deleteButton.dataset.matchingProductId)
            document.querySelector(`.cart-item-container-${deleteButton.dataset.matchingProductId}`).remove()
            renderCheckoutCount()
            renderPaymentSummary()
        })
    })

    renderCheckoutCount()

    function renderCheckoutCount() {
        document.querySelector(".return-to-home-link").innerHTML = getCartQuantity()
    }


    document.querySelectorAll(".update-quantity-link").forEach((updateButton) => {
        updateButton.addEventListener("click", () => {
            document.querySelector(`.cart-item-container-${updateButton.dataset.matchingProductId}`).classList.add("is-editing-quantity")
        })
    })

    document.querySelectorAll(".save-quantity-link").forEach((saveButton) => {
        saveButton.addEventListener("click", () => {
            document.querySelector(`.cart-item-container-${saveButton.dataset.matchingProductId}`).classList.remove("is-editing-quantity")
            document.querySelector(`.quantity-label-${saveButton.dataset.matchingProductId}`).innerHTML = document.querySelector(`.quantity-input-${saveButton.dataset.matchingProductId}`).value
            updateQuantity(saveButton.dataset.matchingProductId, document.querySelector(`.quantity-label-${saveButton.dataset.matchingProductId}`).innerHTML)
            renderCheckoutCount()
            renderPaymentSummary()

        })
    })

    document.querySelectorAll(`[class ^= "quantity-input"]`).forEach((input) => {
        input.addEventListener("input", () => {
            if (input.value > 100) {
                input.value = 100
            } else if (input.value < 0) {
                input.value = 1;
            }
        })
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                document.querySelector(`.cart-item-container-${input.dataset.matchingProductId}`).classList.remove("is-editing-quantity")
                document.querySelector(`.quantity-label-${input.dataset.matchingProductId}`).innerHTML = document.querySelector(`.quantity-input-${input.dataset.matchingProductId}`).value
                updateQuantity(input.dataset.matchingProductId, document.querySelector(`.quantity-label-${input.dataset.matchingProductId}`).innerHTML)
                renderCheckoutCount()
                renderPaymentSummary()

            }
        })
    })


    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let deliveryHTML = "";


        deliveryOptions.forEach((deliveryOption) => {
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId
            const today = dayjs();
            let deliveryDate = today.add(deliveryOption.deliveryDays, "days");
            if (deliveryDate.format("dddd") ==="Saturday"){
                deliveryDate = deliveryDate.add(2, "days")
                console.log(deliveryDate)
            } else if (deliveryDate.format("dddd") ==="Sunday"){
                deliveryDate = deliveryDate.add(1, "days")
                console.log(deliveryDate)
            }
            const dateString = deliveryDate.format("dddd, MMMM D");
            const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${deliveryOption.priceCents / 100} -`
            deliveryHTML += `
                <div class="delivery-option" data-product-id = ${matchingProduct.id} data-delivery-option-id = ${deliveryOption.id}>
                  <input type="radio" ${isChecked ? 'checked' : ""}
                         class="delivery-option-input"
                         name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
            `
        })

        return deliveryHTML;
    }


    document.querySelectorAll(".delivery-option").forEach((option) => {
        option.addEventListener("click", () => {
            updateDeliveryOption(option.dataset.productId, option.dataset.deliveryOptionId)
            renderOrderSummary()
            renderPaymentSummary()
        })
    })
}



