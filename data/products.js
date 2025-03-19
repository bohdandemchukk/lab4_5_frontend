export let productsExport = [];

export function loadProducts() {
  return fetch(
    '../backend/products.json'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {
    productsExport = productsData;
    return productsExport
  });

}