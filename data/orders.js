// Implement logic to fetch product details from the API and populate the delivery options

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// Implement logic to fetch product details from the API and populate the delivery options
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

// Implement logic to fetch product details from the API and populate the delivery options
function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Implement logic to fetch product details from the API and populate the delivery options
export function getOrder(orderId) {
  let matchingOrder;

  // Implement logic to fetch product details from the API and populate the delivery options
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  // Implement logic to fetch product details from the API and populate the delivery options
  return matchingOrder;
}