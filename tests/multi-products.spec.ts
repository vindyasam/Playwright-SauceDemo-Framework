// tests/multi-products.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { AllureHelper } from '../utils/AllureHelper';

test('User can add multiple products to cart (data-driven)', async ({ page }) => {

  // ---------------------------
  // Allure Metadata
  // ---------------------------
  AllureHelper.feature('Products');
  AllureHelper.story('Add Multiple Products');
  AllureHelper.severity('critical');

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // ---------------------------
  // LOGIN
  // ---------------------------
  await AllureHelper.step('Login to application', async () => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
  });

  // ---------------------------
  // VALIDATE PRODUCTS PAGE
  // ---------------------------
  await AllureHelper.step('Validate products page', async () => {
    await expect(page.locator('.inventory_item').first()).toBeVisible();
    await productsPage.validateProductNames();
    await productsPage.validateProductPrices();
    await productsPage.validatePriceLowToHighSorting();
  });

  // ---------------------------
  // ADD MULTIPLE PRODUCTS
  // ---------------------------
  await AllureHelper.step('Add multiple products to cart', async () => {

    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light'
    ];

    for (const productName of products) {
      await productsPage.addProductToCart(productName);
    }

    const count = await productsPage.getCartItemCount();
    expect(count).toBe(products.length);
  });

  // ---------------------------
  // OPEN CART
  // ---------------------------
  await AllureHelper.step('Open cart and verify navigation', async () => {
    await productsPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
  });

});
