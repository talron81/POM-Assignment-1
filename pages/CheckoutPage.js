class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByTestId('firstName');
    this.lastNameField = page.getByTestId('lastName');
    this.postalCodeField = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.total = page.getByTestId('total-label');
    this.checkoutCompleteContainer = page.getByTestId('checkout-complete-container');
  }

  async fillCustomerInfo({ firstName, lastName, postalCode }) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };
