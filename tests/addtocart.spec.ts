// tests/add-to-cart.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { AllureHelper } from '../utils/AllureHelper';
test('Add product to cart and open cart', async ({ page }) => {
  AllureHelper.feature('Cart');
  AllureHelper.story('Add Product');
  AllureHelper.severity('normal');

  const loginPage = new LoginPage(page);

  
  await loginPage.goToLoginPage();
  await loginPage.doLogin('standard_user', 'secret_sauce');

  const productsPage = new ProductsPage(page);

  // Add one product
  await productsPage.addProductToCart('Sauce Labs Backpack');

  //assert cart count
  const count = await productsPage.getCartItemCount();
  await expect(count).toBe(1);

  // Open cart
  await productsPage.openCart();

  // Assert cart page opened
  await expect(page).toHaveURL(/cart\.html/);
});
