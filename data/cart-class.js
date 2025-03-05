// Add product to cart

class Cart { 
  cartItems;
  #localStorageKey;

  // Constructor
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  // Load cart items from local storage if available
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    // If no cart items are found, initialize with some sample data
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  // Save cart items to local storage
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  // Add a product to the cart, updating the quantity if the product already exists
  addToCart(productId) {
    let matchingItem;

      // Implement logic to fetch product details from the API and populate the delivery options
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    // Implement logic to fetch available delivery options from the API and populate the dropdown menu
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    // Save the updated cart items to local storage
    this.saveToStorage();
  }

  // Remove a product from the cart
  removeFromCart(productId) {
    const newCart = [];

    // Implement logic to fetch product details from the API and populate the delivery options
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  // Update the delivery option for a product in the cart
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    // Implement logic to fetch product details from the API and populate the delivery options
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

// Usage example
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);