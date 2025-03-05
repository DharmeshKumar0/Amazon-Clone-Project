import { addToCart, cart, loadFromStorage} from "../../data/cart.js";


// Add tests here... and describe is used to describe what the test is testing.and test suite is a set of tests that group together related tests.
describe('test suite: addToCart', () => {

  // Add tests here... and describe is used to describe what the test is testing. and test suite is a set of tests that group together related tests.
  it('adds an existing product to the cart', () => {

    // Spies on localStorage methods. localStorage.setItem and localStorage.getItem are used to mock these methods.
    spyOn(localStorage, 'setItem');

    // Mock localStorage.getItem to return the existing cart items.

    spyOn(localStorage,'getItem').and.callFake(() => {

      // Return the existing cart items. In this case, there's one item with productId 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' and quantity 1.
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    // Call the addToCart function with the productId 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'.
    loadFromStorage();


    // Expect the cart length to be 1 after adding the product.
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Expect localStorage.setItem to be called once.
    expect(cart.length).toEqual(1);

    // Expect localStorage.setItem to be called once.
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // Expect the product's productId to be 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' and quantity to be 2.
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // Expect the product's quantity to be 2.
    expect(cart[0].quantity).toEqual(2);
  });

  // Add tests here... and describe is used to describe what the test is testing. and test suite is a set of tests that group together related tests.

  it('adds a new product to the cart', () => {

    // Spies on localStorage methods. localStorage.setItem and localStorage.getItem are used to mock these methods.
    spyOn(localStorage, 'setItem');
    

    // Mock localStorage.getItem to return an empty array.
    spyOn(localStorage,'getItem').and.callFake(() => {

      // Return an empty array. In this case, there's no existing cart items.
      return JSON.stringify([]);
    });
    // Call the addToCart function with the productId 'e43638ce-6aa0-4b85-b27f-e1d07eb67
    loadFromStorage();


    // Expect localStorage.setItem to be called once.
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    // Expect localStorage.setItem to be called once.
    expect(cart.length).toEqual(1);
    // Expect localStorage.setItem to be called once.
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // Expect the product's productId to be 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' and quantity to be 1.
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    // Expect the product's quantity to be 1.
    expect(cart[0].quantity).toEqual(1);
  });
});