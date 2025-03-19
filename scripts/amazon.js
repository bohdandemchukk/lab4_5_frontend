import {cart, addToCart, showAdded, getCartQuantity} from "../data/cart.js"
import {products} from "../data/products.js"





let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container ">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary
          js-add-to-cart"
          data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
`;
})





document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelector(".cart-quantity").innerHTML = getCartQuantity();

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener("click", ()=>{

        const productId = button.dataset.productId

        addToCart(productId);
        showAdded(productId);
})
})



document.querySelector('.apply-filters').addEventListener('click', () => {
  const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(input => input.value);
  const minPrice = Number(document.querySelector('.min-price').value) || 0;
  const maxPrice = Number(document.querySelector('.max-price').value) || Infinity;

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.priceCents / 100 >= minPrice && product.priceCents / 100 <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  renderFilteredProducts(filteredProducts);
});


function renderFilteredProducts(filteredProducts) {
  let productsHTML = '';

  if (filteredProducts.length === 0) {
    productsHTML = `<div class="no-products-found">Товари не знайдено</div>`;
  } else {
    filteredProducts.forEach((product) => {
      productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container ">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary
          js-add-to-cart"
          data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
`;
    });

  }

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      showAdded(productId);
    });
  });
}






