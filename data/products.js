export let productsExport = [];



export function loadProducts() {
  return fetch("../backend/products.json")
    .then(response => response.json())
    .then(data => { productsExport = data
      return productsExport})

}