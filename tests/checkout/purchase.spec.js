const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { validUser, checkoutInfo, products } = require('../../utils/testData');

test.describe('Checkout flow', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each test //

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('Full purchase flow - happy path', async ({ page }) => {

    // Step 1: Add two products to the cart //

    await productsPage.addProduct(products[0]);
    await productsPage.addProduct(products[2]);

    // Step 2: Go to cart and assert cart contains exactly the selected products //
    
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(cartPage.cartContentsContainer).toBeVisible();

    const cartItemNames = await cartPage.getItemNames();
    expect(cartItemNames).toHaveLength(2);
    expect(cartItemNames).toContain(products[0]);
    expect(cartItemNames).toContain(products[2]);

    // Step 3: Proceed to checkout and fill customer information //

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    await checkoutPage.fillCustomerInfo({
      firstName: checkoutInfo.firstName,
      lastName: checkoutInfo.lastName,
      postalCode: checkoutInfo.postalCode,
    });

    // Step 4: On overview/summary page - assert item total and total section exist //

    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(checkoutPage.itemTotal).toBeVisible();
    await expect(checkoutPage.total).toBeVisible();

    // Step 5: Finish checkout //

    await checkoutPage.finishOrder();

    // Step 6: Assert success confirmation is displayed //

    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(checkoutPage.checkoutCompleteContainer).toBeVisible();
  });

  test('Remove product from cart on products page', async ({ page }) => {
    
    // Step1: Add three products to cart //
    await productsPage.addProducts(products);

    // Step2: Verify cart badge shows 3 items //
    await expect(productsPage.cartBadge).toHaveText('3');

    // Step3: Remove one product from products page //
    await productsPage.removeProduct(products[1]);

    // Step4: Verify cart badge now shows 2 items //
    await expect(productsPage.cartBadge).toHaveText('2');

    // Step5: Go to cart and verify the removed product is not there //
    await productsPage.goToCart();
    const cartItemNames = await cartPage.getItemNames();
    expect(cartItemNames).toHaveLength(2);
    expect(cartItemNames).not.toContain(products[1]);
    expect(cartItemNames).toContain(products[0]);
    expect(cartItemNames).toContain(products[2]);
  });

  test('Remove product from cart page', async ({ page }) => {
    // Step1: Add two products to cart //
    await productsPage.addProduct(products[0]);
    await productsPage.addProduct(products[1]);

    // Step2: Go to cart //
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    // Step3: Verify both products are in cart //
    let cartItemNames = await cartPage.getItemNames();
    expect(cartItemNames).toHaveLength(2);

    // Step4: Remove one product from cart page //
    await cartPage.removeProduct(products[0]);

    // Step5: Verify only one product remains //
    cartItemNames = await cartPage.getItemNames();
    expect(cartItemNames).toHaveLength(1);
    expect(cartItemNames).toContain(products[1]);
    expect(cartItemNames).not.toContain(products[0]);
  });

  test('Remove all products from cart', async ({ page }) => {
    // Step1: Add all products to cart //
    await productsPage.addProducts(products);

    // Step2: Go to cart //
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    // Step3: Verify all products are in cart //
    let itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(3);

    // Step4: Remove all products //
    await cartPage.removeAllProducts();

    // Step5: Verify cart is empty //
    itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(0);
  });
});