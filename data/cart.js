
// Create instances of the Cart class and load the cart items from local storage
export let cart;
loadFromStorage();
export function loadFromStorage() {
  // Replace this with actual logic to fetch cart items from the API and populate the delivery options
  cart = JSON.parse(localStorage.getItem('cart'));

  // If cart items are not found in local storage, initialize an empty cart array
  if (!cart) {
    cart = [{
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
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add a product to the cart, updating the quantity if the product already exists
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // Implement logic to fetch product details from the API and populate the delivery options
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  // Save the updated cart items to local storage
  saveToStorage();
}
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  // Save the updated cart items to local storage
  cart = newCart;
  saveToStorage();
}

// Update the delivery option for a specific product in the cart
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // Implement logic to fetch product details from the API and populate the delivery options
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

// Load the cart items from the API and update the cart items in the local storage
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  // Replace this with actual logic to fetch cart items from the API and populate the delivery options
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

// Load the cart items from the API and return them as a Promise
export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}


// Extra feature: make the cart empty after creating an order.
export function resetCart() {
  cart = [];
  saveToStorage();
}