<p align="center">
  <img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright Logo" width="80" height="80">
</p>

<h1 align="center">SauceDemo E2E Test Automation</h1>

<p align="center">
  <strong>Professional-grade end-to-end test suite built with Playwright</strong>
</p>

<p align="center">
  <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-1.57.0-45ba4b?style=flat-square&logo=playwright" alt="Playwright"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js" alt="Node.js"></a>
  <a href="#test-coverage"><img src="https://img.shields.io/badge/Tests-6%20Specs-blue?style=flat-square" alt="Tests"></a>
  <a href="#"><img src="https://img.shields.io/badge/License-ISC-yellow?style=flat-square" alt="License"></a>
</p>

<p align="center">
  Comprehensive E2E test suite for validating user journeys on <a href="https://www.saucedemo.com/">SauceDemo</a> — a stable demo e-commerce platform commonly used for automation practice.
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Running Tests](#-running-tests)
- [Test Coverage](#-test-coverage)
- [Project Architecture](#-project-architecture)
- [Page Object Model](#-page-object-model)
- [Test Data Management](#-test-data-management)
- [Configuration](#-configuration)
- [Test Reports & Artifacts](#-test-reports--artifacts)
- [Selector Strategy](#-selector-strategy)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ✨ Features

| Feature                    | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| 🎭 **Page Object Model**   | Clean separation of page interactions from test logic         |
| 🔍 **Data-Test Selectors** | Stable selectors using `data-test` attributes for reliability |
| 🔄 **Auto-Retry**          | Built-in test retry mechanism for handling flaky scenarios    |
| 📸 **Visual Artifacts**    | Screenshots, videos, and traces captured on failure           |
| 📊 **HTML Reports**        | Beautiful, interactive test reports                           |
| 🚀 **Parallel Execution**  | Tests run in parallel for faster feedback                     |
| 🧹 **Clean Architecture**  | Modular, maintainable, and scalable test structure            |

---

## 📦 Prerequisites

Ensure you have the following installed before setting up the project:

| Requirement | Version | Verification Command |
| ----------- | ------- | -------------------- |
| **Node.js** | 18.0+   | `node --version`     |
| **npm**     | 9.0+    | `npm --version`      |

---

## 🚀 Quick Start

Get up and running in 3 simple steps:

```bash
# 1. Install project dependencies
npm install

# 2. Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install

# 3. Run all tests
npm test
```

---

## 🧪 Running Tests

### Available Commands

| Command               | Description                    | Use Case                                 |
| --------------------- | ------------------------------ | ---------------------------------------- |
| `npm test`            | Run all tests in headless mode | CI/CD pipelines, quick validation        |
| `npm run test:headed` | Run tests with visible browser | Debugging, visual verification           |
| `npm run test:ui`     | Interactive UI mode            | Test development, step-by-step debugging |
| `npm run report`      | Open HTML test report          | Analyzing test results                   |

### Run Specific Tests

```bash
# Run tests by file
npm test -- tests/auth/login.spec.js
npm test -- tests/checkout/purchase.spec.js

# Run tests by name pattern
npm test -- -g "successful login"
npm test -- -g "Remove product"

# Run tests in debug mode
npx playwright test --debug
```

### Environment Options

```bash
# Run with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run with verbose output
DEBUG=pw:api npm test
```

---

## 📊 Test Coverage

### Test Summary

| Suite              | Tests | Status      |
| ------------------ | ----- | ----------- |
| **Authentication** | 2     | ✅ Complete |
| **Checkout Flow**  | 4     | ✅ Complete |
| **Total**          | **6** | ✅          |

---

### Authentication Tests

📁 `tests/auth/login.spec.js`

#### ✅ Test 1: Successful Login

Validates that users can authenticate with valid credentials.

| Step | Action                          | Expected Result                |
| ---- | ------------------------------- | ------------------------------ |
| 1    | Navigate to login page          | Login form displayed           |
| 2    | Enter username: `standard_user` | Field populated                |
| 3    | Enter password: `secret_sauce`  | Field populated (masked)       |
| 4    | Click login button              | Form submitted                 |
| 5    | Verify redirection              | URL contains `/inventory.html` |

#### ✅ Test 2: Unsuccessful Login Shows Error

Validates that invalid credentials display an appropriate error message.

| Step | Action                           | Expected Result                              |
| ---- | -------------------------------- | -------------------------------------------- |
| 1    | Navigate to login page           | Login form displayed                         |
| 2    | Enter username: `standard_user`  | Field populated                              |
| 3    | Enter password: `wrong_password` | Field populated (masked)                     |
| 4    | Click login button               | Form submitted                               |
| 5    | Verify error message             | "Username and password do not match" visible |

---

### Checkout Flow Tests

📁 `tests/checkout/purchase.spec.js`

> **Note**: All checkout tests use a `beforeEach` hook that handles authentication, ensuring each test starts from the products page.

#### ✅ Test 1: Full Purchase Flow (Happy Path)

End-to-end validation of the complete purchase journey.

```
Login → Add Products → Cart → Checkout Info → Summary → Complete
```

| Step | Action                 | Assertion                            |
| ---- | ---------------------- | ------------------------------------ |
| 1    | Add 2 products to cart | Products added                       |
| 2    | Navigate to cart       | URL: `/cart.html`, 2 items displayed |
| 3    | Proceed to checkout    | URL: `/checkout-step-one.html`       |
| 4    | Fill customer info     | Form accepts input                   |
| 5    | Review summary         | Item total & total visible           |
| 6    | Complete order         | "Thank you for your order!" message  |

#### ✅ Test 2: Remove Product from Products Page

Validates removing items from cart while on the products page.

| Step | Action           | Assertion                   |
| ---- | ---------------- | --------------------------- |
| 1    | Add 3 products   | Cart badge shows "3"        |
| 2    | Remove 1 product | Cart badge shows "2"        |
| 3    | Go to cart       | Only 2 products displayed   |
| 4    | Verify contents  | Removed product not in cart |

#### ✅ Test 3: Remove Product from Cart Page

Validates removing items directly from the cart page.

| Step | Action           | Assertion                   |
| ---- | ---------------- | --------------------------- |
| 1    | Add 2 products   | Products in cart            |
| 2    | Go to cart       | 2 items displayed           |
| 3    | Remove 1 product | 1 item remaining            |
| 4    | Verify contents  | Removed product not in cart |

#### ✅ Test 4: Remove All Products from Cart

Validates bulk removal of all cart items.

| Step | Action               | Assertion         |
| ---- | -------------------- | ----------------- |
| 1    | Add all products (3) | Cart has 3 items  |
| 2    | Go to cart           | 3 items displayed |
| 3    | Remove all products  | Cart empty        |
| 4    | Verify               | Item count is 0   |

---

## 🏗 Project Architecture

```
saucedemo-playwright/
│
├── 📁 tests/                      # Test specifications
│   ├── 📁 auth/                   # Authentication test suite
│   │   └── 📄 login.spec.js       # Login scenarios (2 tests)
│   └── 📁 checkout/               # Checkout test suite
│       └── 📄 purchase.spec.js    # Purchase & cart scenarios (4 tests)
│
├── 📁 pages/                      # Page Object Model classes
│   ├── 📄 LoginPage.js            # Login page interactions
│   ├── 📄 ProductsPage.js         # Products/inventory page
│   ├── 📄 CartPage.js             # Shopping cart page
│   └── 📄 CheckoutPage.js         # Checkout flow pages
│
├── 📁 utils/                      # Shared utilities
│   └── 📄 testData.js             # Centralized test data
│
├── 📄 playwright.config.js        # Playwright configuration
├── 📄 package.json                # Dependencies & scripts
├── 📄 README.md                   # Documentation (this file)
│
├── 📁 playwright-report/          # Generated HTML reports
└── 📁 test-results/               # Screenshots, videos, traces
```

### Design Principles

| Principle                       | Implementation                                               |
| ------------------------------- | ------------------------------------------------------------ |
| **Separation of Concerns**      | Page Objects handle UI interactions; tests handle assertions |
| **DRY (Don't Repeat Yourself)** | Shared `beforeEach` hooks, reusable Page Object methods      |
| **Single Responsibility**       | Each Page Object represents one page/component               |
| **Centralized Test Data**       | All test data in `utils/testData.js`                         |

---

## 📄 Page Object Model

### LoginPage

📁 `pages/LoginPage.js`

| Property/Method             | Type    | Description                                      |
| --------------------------- | ------- | ------------------------------------------------ |
| `usernameInput`             | Locator | Username input field (`data-test="username"`)    |
| `passwordInput`             | Locator | Password input field (`data-test="password"`)    |
| `loginButton`               | Locator | Login submit button (`data-test="login-button"`) |
| `errorMessage`              | Locator | Error message container (`data-test="error"`)    |
| `goto()`                    | Method  | Navigate to login page                           |
| `login(username, password)` | Method  | Perform login action                             |

**Usage Example:**

```javascript
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login("standard_user", "secret_sauce");
```

---

### ProductsPage

📁 `pages/ProductsPage.js`

| Property/Method           | Type    | Description                                               |
| ------------------------- | ------- | --------------------------------------------------------- |
| `inventoryContainer`      | Locator | Products container (`data-test="inventory-container"`)    |
| `cartBadge`               | Locator | Cart item count badge (`data-test="shopping-cart-badge"`) |
| `cartLink`                | Locator | Link to cart page (`data-test="shopping-cart-link"`)      |
| `isVisible()`             | Method  | Check if page is visible                                  |
| `addProduct(name)`        | Method  | Add single product to cart                                |
| `addProducts(names[])`    | Method  | Add multiple products to cart                             |
| `removeProduct(name)`     | Method  | Remove single product from cart                           |
| `removeProducts(names[])` | Method  | Remove multiple products from cart                        |
| `goToCart()`              | Method  | Navigate to cart page                                     |

**Usage Example:**

```javascript
const productsPage = new ProductsPage(page);

// Add products
await productsPage.addProduct("Sauce Labs Backpack");
await productsPage.addProducts([
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
]);

// Remove products
await productsPage.removeProduct("Sauce Labs Backpack");

// Navigate to cart
await productsPage.goToCart();
```

---

### CartPage

📁 `pages/CartPage.js`

| Property/Method           | Type    | Description                                            |
| ------------------------- | ------- | ------------------------------------------------------ |
| `cartContentsContainer`   | Locator | Cart container (`data-test="cart-contents-container"`) |
| `cartItems`               | Locator | All cart items (`data-test="inventory-item"`)          |
| `checkoutButton`          | Locator | Checkout button (`data-test="checkout"`)               |
| `getItemNames()`          | Method  | Get array of product names in cart                     |
| `getItemCount()`          | Method  | Get number of items in cart                            |
| `removeProduct(name)`     | Method  | Remove single product                                  |
| `removeProducts(names[])` | Method  | Remove multiple products                               |
| `removeAllProducts()`     | Method  | Remove all products from cart                          |
| `proceedToCheckout()`     | Method  | Navigate to checkout                                   |

**Usage Example:**

```javascript
const cartPage = new CartPage(page);

// Get cart info
const names = await cartPage.getItemNames();
const count = await cartPage.getItemCount();

// Remove products
await cartPage.removeProduct("Sauce Labs Backpack");
await cartPage.removeAllProducts();

// Checkout
await cartPage.proceedToCheckout();
```

---

### CheckoutPage

📁 `pages/CheckoutPage.js`

| Property/Method             | Type    | Description                                                   |
| --------------------------- | ------- | ------------------------------------------------------------- |
| `firstNameField`            | Locator | First name input (`data-test="firstName"`)                    |
| `lastNameField`             | Locator | Last name input (`data-test="lastName"`)                      |
| `postalCodeField`           | Locator | Postal code input (`data-test="postalCode"`)                  |
| `continueButton`            | Locator | Continue button (`data-test="continue"`)                      |
| `finishButton`              | Locator | Finish order button (`data-test="finish"`)                    |
| `itemTotal`                 | Locator | Item subtotal display (`data-test="subtotal-label"`)          |
| `total`                     | Locator | Order total display (`data-test="total-label"`)               |
| `checkoutCompleteContainer` | Locator | Success container (`data-test="checkout-complete-container"`) |
| `fillCustomerInfo({...})`   | Method  | Fill and submit customer form                                 |
| `finishOrder()`             | Method  | Complete the order                                            |

**Usage Example:**

```javascript
const checkoutPage = new CheckoutPage(page);

await checkoutPage.fillCustomerInfo({
  firstName: "John",
  lastName: "Doe",
  postalCode: "12345",
});

await checkoutPage.finishOrder();
```

---

## 📝 Test Data Management

📁 `utils/testData.js`

All test data is centralized for easy maintenance and consistency.

### Available Data

```javascript
// Valid User Credentials
validUser: {
  username: 'standard_user',
  password: 'secret_sauce'
}

// Invalid User Credentials (for negative testing)
invalidUser: {
  username: 'standard_user',
  password: 'wrong_password'
}

// Checkout Form Data
checkoutInfo: {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345'
}

// Test Products
products: [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Onesie'
]
```

### Usage in Tests

```javascript
const { validUser, checkoutInfo, products } = require("../../utils/testData");

await loginPage.login(validUser.username, validUser.password);
await productsPage.addProducts(products);
await checkoutPage.fillCustomerInfo(checkoutInfo);
```

---

## ⚙️ Configuration

📁 `playwright.config.js`

### Current Settings

| Setting           | Value                       | Description                    |
| ----------------- | --------------------------- | ------------------------------ |
| `testDir`         | `./tests`                   | Test files location            |
| `timeout`         | `30000` (30s)               | Maximum test duration          |
| `retries`         | `1`                         | Retry failed tests once        |
| `baseURL`         | `https://www.saucedemo.com` | Target application URL         |
| `testIdAttribute` | `data-test`                 | Custom test ID attribute       |
| `headless`        | `true`                      | Run without browser UI         |
| `screenshot`      | `only-on-failure`           | Capture screenshots on failure |
| `video`           | `retain-on-failure`         | Record video on failure        |
| `trace`           | `on-first-retry`            | Capture trace on retry         |

### Reporters

| Reporter | Output               | Purpose                 |
| -------- | -------------------- | ----------------------- |
| `list`   | Console              | Real-time test progress |
| `html`   | `playwright-report/` | Interactive HTML report |

---

## 📊 Test Reports & Artifacts

### HTML Reports

View detailed test results with the interactive HTML report:

```bash
npm run report
```

**Report Features:**

- ✅ Pass/fail status for each test
- ⏱️ Execution time breakdown
- 📸 Screenshots on failure
- 🎥 Video recordings on failure
- 🔍 Trace viewer integration

### Artifacts Location

| Artifact    | Location                    | Generated When |
| ----------- | --------------------------- | -------------- |
| Screenshots | `test-results/[test-name]/` | Test failure   |
| Videos      | `test-results/[test-name]/` | Test failure   |
| Traces      | `test-results/[test-name]/` | First retry    |
| HTML Report | `playwright-report/`        | Every run      |

### Viewing Traces

```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

---

## 🎯 Selector Strategy

### 100% Data-Test Selectors

This project uses **exclusively `data-test` attributes** for all element selection, providing maximum stability and maintainability.

| Strategy     | Example                       | Stability  |
| ------------ | ----------------------------- | ---------- |
| **Test IDs** | `getByTestId('login-button')` | ⭐⭐⭐⭐⭐ |

> **Why Test IDs?** They are explicitly designed for testing, never change with UI redesigns, and are the most reliable selectors available.

### Configuration

The project uses SauceDemo's `data-test` attributes via Playwright config:

```javascript
// Playwright config enables custom test ID attribute
testIdAttribute: "data-test";

// Usage in Page Objects
page.getByTestId("add-to-cart-sauce-labs-backpack");
page.getByTestId("remove-sauce-labs-backpack");
page.getByTestId("checkout");
```

### Dynamic Test ID Generation

Product buttons use a kebab-case naming convention:

```javascript
// Product name: "Sauce Labs Backpack"
// Add button:    data-test="add-to-cart-sauce-labs-backpack"
// Remove button: data-test="remove-sauce-labs-backpack"

#toKebabCase(productName) {
  return productName.toLowerCase().replace(/ /g, '-');
}
```

---

## ✅ Best Practices

### ❌ Avoided Anti-Patterns

| Anti-Pattern          | Why It's Bad        | Our Approach          |
| --------------------- | ------------------- | --------------------- |
| Hard-coded waits      | Flaky, slow         | Playwright auto-wait  |
| Brittle CSS selectors | Break easily        | Test IDs first        |
| Test interdependence  | Debugging nightmare | Isolated tests        |
| Duplicate code        | Maintenance burden  | Page Objects + hooks  |
| Magic strings         | Hard to maintain    | Centralized test data |

### ✅ Implemented Patterns

| Pattern               | Benefit                | Implementation              |
| --------------------- | ---------------------- | --------------------------- |
| **Page Object Model** | Maintainability        | `pages/*.js`                |
| **Test Isolation**    | Reliability            | Fresh login per test        |
| **Centralized Data**  | Single source of truth | `utils/testData.js`         |
| **Auto-Wait**         | No flakiness           | Playwright built-in         |
| **Retry Mechanism**   | Resilience             | `retries: 1` in config      |
| **Failure Artifacts** | Debugging              | Screenshots, videos, traces |

---

## 🔧 Troubleshooting

### Common Issues

<details>
<summary><strong>❌ "Browser not found" error</strong></summary>

**Solution:** Install Playwright browsers:

```bash
npx playwright install
```

</details>

<details>
<summary><strong>❌ Tests timeout</strong></summary>

**Possible Causes:**

- Network connectivity issues
- SauceDemo site is slow or down
- Incorrect selectors

**Solutions:**

1. Verify SauceDemo is accessible: https://www.saucedemo.com
2. Check network connection
3. Increase timeout in `playwright.config.js`:
   ```javascript
   timeout: 60000; // 60 seconds
   ```
   </details>

<details>
<summary><strong>❌ Tests are flaky (intermittent failures)</strong></summary>

**Solutions:**

1. Check test artifacts (screenshots/videos) for clues
2. Ensure using Playwright's auto-wait (no manual waits)
3. Increase retry count if needed
4. Use `waitForLoadState()` for specific page loads
</details>

<details>
<summary><strong>❌ HTML report doesn't open</strong></summary>

**Solution:** Open manually:

```bash
# macOS
open playwright-report/index.html

# Windows
start playwright-report/index.html

# Linux
xdg-open playwright-report/index.html
```

</details>

### Debug Commands

```bash
# Run tests with visible browser
npm run test:headed

# Interactive UI mode
npm run test:ui

# Playwright Inspector (step through tests)
npx playwright test --debug

# Verbose logging
DEBUG=pw:api npm test
```

---

## 🤝 Contributing

### Adding New Tests

1. Create test file in appropriate directory (`tests/[feature]/`)
2. Use existing Page Objects or create new ones
3. Follow naming convention: `[feature].spec.js`
4. Add test data to `utils/testData.js` if needed

### Adding New Page Objects

1. Create file in `pages/` directory
2. Follow existing patterns:
   - Constructor with locators
   - Async methods for actions
   - Use `data-test` selectors when available
3. Export class using CommonJS: `module.exports = { ClassName }`

### Code Style

- Use descriptive test names
- Add comments for complex logic
- Keep Page Object methods focused
- Use JSDoc for method documentation

---

## 📚 Additional Resources

| Resource                  | Link                                                               |
| ------------------------- | ------------------------------------------------------------------ |
| Playwright Documentation  | [playwright.dev](https://playwright.dev/)                          |
| Playwright Best Practices | [Best Practices Guide](https://playwright.dev/docs/best-practices) |
| SauceDemo Website         | [saucedemo.com](https://www.saucedemo.com/)                        |
| Page Object Model         | [POM Pattern](https://playwright.dev/docs/pom)                     |

---

<p align="center">
  <strong>Built with ❤️ using Playwright</strong>
</p>

<p align="center">
  <sub>Last Updated: January 2026</sub>
</p>
