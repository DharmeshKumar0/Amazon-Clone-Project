import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


// Test cases for loadProductsFetch and loadCart functions
async function loadPage() {
  // Test case for loadProductsFetch function
  try {
    // throw 'error1';

    await loadProductsFetch();

    // Test case for loadCart function

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
     
     // Load products and cart data here
      loadCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });

    // Test case for loadProducts function
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  // Render order summary and payment summary after loading data

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/