import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('User can remove item from cart and see updated cart', async ({ page }) => {

  // Arrange: login
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);

  // Arrange: go to products & add two items
  const productsPage = new ProductsPage(page);
  await page.waitForSelector('.inventory_item', { state: 'visible' });

  const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  for (const name of products) {
    await productsPage.addProductToCart(name);
  }

  // Assert: cart badge shows 2
  const badgeCount = await productsPage.getCartItemCount();
  expect(badgeCount).toBe(products.length);

  // Act: open cart
  await productsPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  const cartPage = new CartPage(page);

  // Assert: cart has 2 items
  const initialCartCount = await cartPage.getCartItemsCount();
  expect(initialCartCount).toBe(products.length);

  // Act: remove one specific product
  await cartPage.removeItemByName('Sauce Labs Backpack');

  // Assert 1: cart item count decreased
  const cartCountAfterRemove = await cartPage.getCartItemsCount();
  expect(cartCountAfterRemove).toBe(initialCartCount - 1);

  // Assert 2: removed item is no longer in the list
  const remainingNames = await cartPage.getCartItemNames();
  expect(remainingNames).not.toContain('Sauce Labs Backpack');
  expect(remainingNames).toContain('Sauce Labs Bike Light');

  // Assert 3 (optional): cart badge updated to 1
  const badgeCountAfterRemove = await productsPage.getCartItemCount();
  expect(badgeCountAfterRemove).toBe(1);
});