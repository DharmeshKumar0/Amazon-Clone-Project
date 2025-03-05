import {getOrder} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


// Fetch additional details about the order and product.
async function loadPage() {
  // Load products before fetching the order and product details.
  await loadProductsFetch();

  // Fetch the order and product details.
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  // Get the order and product details.
  const order = getOrder(orderId);
  const product = getProduct(productId);

  // Get additional details about the product like
  // the estimated delivery time.
  let productDetails;
  // Implement logic to fetch product details from the API and populate the delivery options
  order.products.forEach((details) => {
    // Implement logic to fetch product details from the API and populate the delivery options
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  // Generate the tracking page HTML.

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

    // Extra feature: display "delivered" on the tracking page
  // if today's date is past the delivery date.
  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';


  // Generate the tracking page HTML.
  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
       ${deliveredMessage} ${
        dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
      }
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
       <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
       <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ''
      }">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  // Display the tracking page HTML.

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

// Call the loadPage function when the page is fully loaded.

loadPage();