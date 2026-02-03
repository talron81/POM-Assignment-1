class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartContentsContainer = page.getByTestId('cart-contents-container');
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }

  // Converts product name to kebab-case for data-test attribute //

  #toKebabCase(productName) {
    return productName.toLowerCase().replace(/ /g, '-');
  }

  async getItemNames() {
    return this.cartItems.getByTestId('inventory-item-name').allTextContents();
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async removeProduct(productName) {
    const testId = `remove-${this.#toKebabCase(productName)}`;
    await this.page.getByTestId(testId).click();
  }

  async removeProducts(productNames) {
    for (const productName of productNames) {
      await this.removeProduct(productName);
    }
  }

  async removeAllProducts() {
    const itemNames = await this.getItemNames();
    await this.removeProducts(itemNames);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
