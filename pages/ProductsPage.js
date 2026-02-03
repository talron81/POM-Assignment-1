class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async isVisible() {
    return this.inventoryContainer.isVisible();
  }

  // Converts product name to kebab-case for data-test attribute // 

  #toKebabCase(productName) {
    return productName.toLowerCase().replace(/ /g, '-');
  }

  async addProduct(productName) {
    const testId = `add-to-cart-${this.#toKebabCase(productName)}`;
    await this.page.getByTestId(testId).click();
  }

  async removeProduct(productName) {
    const testId = `remove-${this.#toKebabCase(productName)}`;
    await this.page.getByTestId(testId).click();
  }

  async addProducts(productNames) {
    for (const productName of productNames) {
      await this.addProduct(productName);
    }
  }

  async removeProducts(productNames) {
    for (const productName of productNames) {
      await this.removeProduct(productName);
    }
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { ProductsPage };
