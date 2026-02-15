import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { AllureHelper } from '../utils/AllureHelper';
test('User can remove item from cart and cart updates correctly', async ({ page }) => {
  AllureHelper.feature('Cart');
  AllureHelper.story('Remove Product');
  AllureHelper.severity('normal');

  // Login
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin('standard_user', 'secret_sauce');

  // Add 2 products
  const productsPage = new ProductsPage(page);
  await page.waitForSelector('.inventory_item');

  const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  for (const name of products) {
    await productsPage.addProductToCart(name);
  }

  // Badge should show 2
  const badge = await productsPage.getCartItemCount();
  expect(badge).toBe(2);

  // Go to cart
  await productsPage.openCart();
  const cartPage = new CartPage(page);

  // Remove ONE product
  await cartPage.removeItemByName('Sauce Labs Backpack');

  // Assert: count decreased from 2 → 1
  const newCount = await cartPage.getCartItemsCount();
  expect(newCount).toBe(1);

  // Assert: removed product is NOT in list
  const productNames = await cartPage.getCartItemNames();
  expect(productNames).not.toContain('Sauce Labs Backpack');
  expect(productNames).toContain('Sauce Labs Bike Light');

  // Assert: badge shows 1
  const newBadge = await productsPage.getCartItemCount();
  expect(newBadge).toBe(1);
});
