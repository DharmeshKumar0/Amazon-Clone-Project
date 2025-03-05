import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';

// Integration tests for the orderSummary component

describe('test suite: renderOrderSummary', () => {

  // Replace with your own product IDs when testing with real data.
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';


  // Mock localStorage to return sample data for testing purposes.
  // Replace with actual localStorage.getItem calls when testing with real data.

  // Set up the test environment by loading products and initializing the cart.
  // This ensures that the component is tested with the expected data.

  // This is a mock test environment, replace it with actual test setup code.

  // Call the renderOrderSummary function after loading products and initializing the cart.
  // This ensures that the component is tested with the expected data.

  // Verify that the component displays the cart items and their quantities correctly.

  // This is a mock test, replace it with actual test assertions.

  // Run the tests using a test runner like Jest or Mocha.

  // Example Jest test:
  // it('displays the cart', () => {
  //   expect(
beforeAll((done) => {

  // Mock localStorage to return sample data for testing purposes.
  loadProductsFetch().then(() => {
    done();
  });
});

// Set up the test environment by loading products and initializing the cart.

  beforeEach(() => {

    // Mock localStorage to return sample data for testing purposes.Spyon is used here to spy on localStorage.setItem and localStorage.getItem.
    spyOn(localStorage,'setItem');

    // Mock localStorage to return sample data for testing purposes.
    //doocument.querySelector is used here to set the innerHTML of the test container.

    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    `;

    // Mock localStorage to return sample data for testing purposes.And SPYon is used here to spy on localStorage.getItem.

    spyOn(localStorage,'getItem').and.callFake(() => {
          return JSON.stringify( [{

            // Replace with your own product IDs when testing with real data.
            productId: productId1,
            quantity: 2,
            deliveryOptionId: '1'
          }, {
            productId: productId2,
            quantity: 1,
            deliveryOptionId: '2'
          }]);
        });

        // Initialize the cart with sample data.
        loadFromStorage();


        // Render the order summary component.
        renderOrderSummary();
  });


  // Verify that the component displays the cart items and their quantities correctly.
  it('display the cart', () => {
        expect(

          // Replace with your own product IDs when testing with real data.
          document.querySelectorAll('.js-cart-item-container').length ).toEqual(2);
          expect(

            // Replace with your own product IDs when testing with real data.and expect is used to check the content of the innerText.
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
          ).toContain('Quantity: 2');
          expect(

            // Replace with your own product IDs when testing with real data.
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
          ).toContain('Quantity: 1');


          // Reset the innerHTML of the test container to restore it to its original state.
          document.querySelector('.js-test-container').innerHTML = '';
  });

  // Verify that the component removes a product correctly.

  it('removes a product', () => {
    

    // Replace with your own product IDs when testing with real data.

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(

          // Replace with your own product IDs when testing with real data.
          document.querySelectorAll('.js-cart-item-container').length ).toEqual(1);

          // Replace with your own product IDs when testing with real data.
          expect(document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        // Replace with your own product IDs when testing with real data.
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        // Reset the innerHTML of the test container to restore it to its original state.

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        // Reset the innerHTML of the test container to restore it to its original state.

        document.querySelector('.js-test-container').innerHTML = '';
  });
});