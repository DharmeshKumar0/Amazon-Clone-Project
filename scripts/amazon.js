import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
loadProducts(renderProductsGrid);

// Event listener for adding items to the cart
function renderProductsGrid() {
  let productsHTML = '';

  // Filter products based on search query if provided in the URL parameters.

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  // Reset the cart and filtered products.
  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      // Implement logic to fetch product details from the API and populate the delivery options

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      // Return true if the product matches the search query or any keyword.
      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  // Add event listener for adding items to the cart

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
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
        <div class="product-price">
          ${product.getPrice()}
        </div>
        <div class="product-quantity-container">
          <select>
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
        ${product.extraInfoHTML()}
        <div class="product-spacer"></div>
        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  // Update the cart quantity in the header.

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // Update the cart quantity in the header.
  function updateCartQuantity() {
    let cartQuantity = 0;

    // Implement logic to fetch product details from the API and populate the delivery options
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    // Update the cart quantity in the header.
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  // Event listener for adding items to the cart.
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
      });
    });

    // it is not implemented to handle search functionality in this example.

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });

    // Extra feature: searching by pressing "Enter" on the keyboard.
    document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {

      // Implement logic to fetch product details from the API and populate the delivery options
      if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value;

        // Update the URL parameters with the search term.
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });
}