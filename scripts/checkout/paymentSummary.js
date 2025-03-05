import {cart, resetCart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';
export function renderPaymentSummary() {
  // Initialize variables to store the total price of products and shipping fees.
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {

    // Calculate the total price of products and shipping fees.
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  // Calculate the total cost of the order, including tax.
  // The total cost is calculated by adding the total price of products and shipping fees,
  // then multiplying the total by the tax rate (10%).
  // The total cost is stored in the `totalCents` variable.

  // Render the payment summary HTML to display the order details.
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>
    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>
    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>
    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  // Add event listener to the place order button to create the order and navigate to the orders page.

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

    // Add event listener to the place order button.

  // The `addOrder` function should be implemented in the `orders.js` file.
  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {

        // Create the order and add it to the orders array.
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          // Send the order details to the backend.
          body: JSON.stringify({
            cart: cart
          })
        });

        // Redirect to the orders page.
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      // Extra feature: make the cart empty after creating an order.
      resetCart();
      // Redirect to the orders page.
      window.location.href = 'orders.html';
    });
}
