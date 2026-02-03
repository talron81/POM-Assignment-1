const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { validUser, invalidUser } = require('../../utils/testData');

test.describe('Login flow', () => {

  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const productsPage = new ProductsPage(page);

    await loginPage.goto(); 
    await loginPage.login(validUser.username, validUser.password); 

    // Assert user lands on products page (URL + unique element via data-test) //
    
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(productsPage.inventoryContainer).toBeVisible();
  });

  test('Unsuccessful login shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(invalidUser.username, invalidUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );
  });

});
