class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Locators - using stable selectors
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  // Navigate to the login page using baseURL from config //
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Perform login action with provided credentials
   * @param {string} username - Username to login with
   * @param {string} password - Password to login with
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };