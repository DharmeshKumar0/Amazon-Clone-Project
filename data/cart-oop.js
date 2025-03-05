// Import necessary modules
// express, body-parser, and dotenv are required for server setup
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    // Constructor and initialize the cart with some sample data
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

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
    },


    // Save the cart items to local storage
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    // Add a product to the cart, updating the quantity if the product already exists
    addToCart(productId) {
      let matchingItem;

      // Implement logic to fetch product details from the API and populate the delivery options
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      // If the product already exists, increment the quantity
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
    },

    // Remove a product from the cart
    removeFromCart(productId) {
      const newCart = [];

      // Remove the product from the cart items array if it exists
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      // Save the updated cart items to local storage
      this.cartItems = newCart;

      this.saveToStorage();
    },

    // Update the delivery option for a specific product in the cart
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      // Implement logic to fetch product details from the API and populate the delivery options
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      // If the product exists, update the delivery option
      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
  };

  return cart;
}

// Create two cart instances with different localStorage keys
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);